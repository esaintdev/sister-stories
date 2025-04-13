
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { toast } from "@/components/ui/use-toast";
import { PlusCircle, Pencil, Trash2, Calendar, UploadCloud, X } from "lucide-react";

type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image_url: string | null;
  category: string;
  author: string;
  date: string;
}

const AdminBlog = () => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    image_url: "",
    category: "",
    author: "",
    date: new Date().toISOString(),
  });
  
  // New state for file upload
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Fetch blog posts
  const { data: blogPosts = [], isLoading } = useQuery({
    queryKey: ["admin-blog-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("date", { ascending: false });
      
      if (error) {
        toast({
          title: "Error fetching blog posts",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      return data || [];
    }
  });

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.includes('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive",
      });
      return;
    }

    setSelectedFile(file);
    
    // Create preview URL
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    
    // Clear old image_url
    setFormData({
      ...formData,
      image_url: "",
    });
  };

  // Handle file upload
  const uploadImage = async (file: File): Promise<string> => {
    setIsUploading(true);
    try {
      // Create a unique file name using timestamp
      const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
      
      // Upload the file to Supabase Storage
      const { data, error } = await supabase.storage
        .from('blog-images')
        .upload(fileName, file);
        
      if (error) throw error;
      
      // Get the public URL
      const { data: publicUrlData } = supabase.storage
        .from('blog-images')
        .getPublicUrl(fileName);
      
      return publicUrlData.publicUrl;
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  // Create or update blog post
  const mutation = useMutation({
    mutationFn: async (blogPost: typeof formData & { id?: string }) => {
      let imageUrl = blogPost.image_url;
      
      // If there's a selected file, upload it first
      if (selectedFile) {
        imageUrl = await uploadImage(selectedFile);
      }
      
      let response;
      
      if (selectedBlogPost) {
        // Update
        response = await supabase
          .from("blog_posts")
          .update({
            title: blogPost.title,
            excerpt: blogPost.excerpt,
            content: blogPost.content,
            image_url: imageUrl || null,
            category: blogPost.category,
            author: blogPost.author,
            date: blogPost.date,
            updated_at: new Date().toISOString(),
          })
          .eq("id", selectedBlogPost.id);
      } else {
        // Insert
        response = await supabase
          .from("blog_posts")
          .insert({
            title: blogPost.title,
            excerpt: blogPost.excerpt,
            content: blogPost.content,
            image_url: imageUrl || null,
            category: blogPost.category,
            author: blogPost.author,
            date: blogPost.date,
          });
      }
      
      const { error } = response;
      if (error) throw error;
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-blog-posts"] });
      queryClient.invalidateQueries({ queryKey: ["blog-posts-count"] });
      queryClient.invalidateQueries({ queryKey: ["recent-blog-posts"] });
      setIsOpen(false);
      
      // Reset upload states
      setSelectedFile(null);
      setPreviewUrl(null);
      
      toast({
        title: selectedBlogPost ? "Blog post updated" : "Blog post created",
        description: selectedBlogPost
          ? "The blog post has been updated successfully."
          : "The blog post has been created successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Delete blog post
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("blog_posts")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-blog-posts"] });
      queryClient.invalidateQueries({ queryKey: ["blog-posts-count"] });
      queryClient.invalidateQueries({ queryKey: ["recent-blog-posts"] });
      setIsDeleteConfirmOpen(false);
      toast({
        title: "Blog post deleted",
        description: "The blog post has been deleted successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const openCreateForm = () => {
    setSelectedBlogPost(null);
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      image_url: "",
      category: "",
      author: "",
      date: new Date().toISOString(),
    });
    setSelectedFile(null);
    setPreviewUrl(null);
    setIsOpen(true);
  };

  const openEditForm = (blogPost: BlogPost) => {
    setSelectedBlogPost(blogPost);
    setFormData({
      title: blogPost.title,
      excerpt: blogPost.excerpt,
      content: blogPost.content,
      image_url: blogPost.image_url || "",
      category: blogPost.category,
      author: blogPost.author,
      date: blogPost.date,
    });
    // Reset the file input
    setSelectedFile(null);
    setPreviewUrl(blogPost.image_url);
    setIsOpen(true);
  };

  const openDeleteConfirm = (blogPost: BlogPost) => {
    setSelectedBlogPost(blogPost);
    setIsDeleteConfirmOpen(true);
  };

  // Clear selected file
  const clearSelectedFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <Button onClick={openCreateForm} className="bg-brand-purple hover:bg-brand-deep-purple">
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Blog Post
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Loading blog posts...</div>
      ) : blogPosts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No blog posts found. Create your first blog post to get started.</p>
        </div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogPosts.map((blogPost) => (
                <TableRow key={blogPost.id}>
                  <TableCell className="font-medium">{blogPost.title}</TableCell>
                  <TableCell>{blogPost.category}</TableCell>
                  <TableCell>{blogPost.author}</TableCell>
                  <TableCell>{new Date(blogPost.date).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => openEditForm(blogPost)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => openDeleteConfirm(blogPost)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Create/Edit Form */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle>{selectedBlogPost ? "Edit Blog Post" : "Create Blog Post"}</SheetTitle>
            <SheetDescription>
              {selectedBlogPost
                ? "Update the blog post details"
                : "Fill in the details to create a new blog post"}
            </SheetDescription>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="title" className="text-sm font-medium">
                Title
              </label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="excerpt" className="text-sm font-medium">
                Excerpt
              </label>
              <Textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                rows={2}
                required
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="content" className="text-sm font-medium">
                Content
              </label>
              <Textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                rows={8}
                required
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="image" className="text-sm font-medium">
                Image
              </label>
              <div className="space-y-3">
                {/* Image Upload */}
                <div className="flex gap-2">
                  <label
                    htmlFor="image-upload"
                    className="flex h-10 w-full cursor-pointer items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-foreground file:text-sm hover:bg-accent hover:text-accent-foreground"
                  >
                    <UploadCloud className="mr-2 h-4 w-4" />
                    <span>{selectedFile ? selectedFile.name : "Upload Image"}</span>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                  {(selectedFile || previewUrl) && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={clearSelectedFile}
                      className="flex-shrink-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                {/* Image Preview */}
                {previewUrl && (
                  <div className="relative h-40 w-full overflow-hidden rounded-md border">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1159&q=80";
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="grid gap-2">
              <label htmlFor="category" className="text-sm font-medium">
                Category
              </label>
              <Input
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="author" className="text-sm font-medium">
                Author
              </label>
              <Input
                id="author"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="date" className="text-sm font-medium">
                Date
              </label>
              <div className="relative">
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date.split('T')[0]}
                  onChange={(e) => {
                    const date = new Date(e.target.value);
                    setFormData({
                      ...formData,
                      date: date.toISOString(),
                    });
                  }}
                  required
                  className="pl-8"
                />
                <Calendar className="absolute left-2 top-2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-brand-purple hover:bg-brand-deep-purple"
                disabled={mutation.isPending || isUploading}
              >
                {(mutation.isPending || isUploading)
                  ? "Saving..."
                  : selectedBlogPost
                  ? "Update Blog Post"
                  : "Create Blog Post"}
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation */}
      <Sheet open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <SheetContent className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Delete Blog Post</SheetTitle>
            <SheetDescription>
              Are you sure you want to delete "{selectedBlogPost?.title}"? This action cannot be undone.
            </SheetDescription>
          </SheetHeader>

          <div className="flex justify-end gap-2 py-4">
            <Button
              variant="outline"
              onClick={() => setIsDeleteConfirmOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => selectedBlogPost && deleteMutation.mutate(selectedBlogPost.id)}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete Blog Post"}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AdminBlog;
