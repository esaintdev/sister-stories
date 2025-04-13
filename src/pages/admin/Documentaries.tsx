
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
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
import { PlusCircle, Pencil, Trash2, X, Film, Clock } from "lucide-react";

type Documentary = {
  id: string;
  title: string;
  director: string;
  duration: string;
  release_date: string;
  image_url: string | null;
  description: string;
  video_url: string | null;
  tags: string[];
  coming_soon: boolean;
}

const AdminDocumentaries = () => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedDocumentary, setSelectedDocumentary] = useState<Documentary | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    director: "",
    duration: "",
    release_date: "",
    image_url: "",
    description: "",
    video_url: "",
    tags: "",
    coming_soon: false,
  });

  // Fetch documentaries
  const { data: documentaries = [], isLoading } = useQuery({
    queryKey: ["admin-documentaries"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("documentaries")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) {
        toast({
          title: "Error fetching documentaries",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      return data || [];
    }
  });

  // Create or update documentary
  const mutation = useMutation({
    mutationFn: async (documentary: typeof formData & { id?: string }) => {
      const tagsArray = documentary.tags
        .split(",")
        .map(tag => tag.trim())
        .filter(tag => tag !== "");
      
      let response;
      
      if (selectedDocumentary) {
        // Update
        response = await supabase
          .from("documentaries")
          .update({
            title: documentary.title,
            director: documentary.director,
            duration: documentary.duration,
            release_date: documentary.release_date,
            image_url: documentary.image_url || null,
            description: documentary.description,
            video_url: documentary.video_url || null,
            tags: tagsArray,
            coming_soon: documentary.coming_soon,
            updated_at: new Date().toISOString(),
          })
          .eq("id", selectedDocumentary.id);
      } else {
        // Insert
        response = await supabase
          .from("documentaries")
          .insert({
            title: documentary.title,
            director: documentary.director,
            duration: documentary.duration,
            release_date: documentary.release_date,
            image_url: documentary.image_url || null,
            description: documentary.description,
            video_url: documentary.video_url || null,
            tags: tagsArray,
            coming_soon: documentary.coming_soon,
          });
      }
      
      const { error } = response;
      if (error) throw error;
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-documentaries"] });
      queryClient.invalidateQueries({ queryKey: ["documentaries-count"] });
      setIsOpen(false);
      toast({
        title: selectedDocumentary ? "Documentary updated" : "Documentary created",
        description: selectedDocumentary
          ? "The documentary has been updated successfully."
          : "The documentary has been created successfully.",
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

  // Delete documentary
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("documentaries")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-documentaries"] });
      queryClient.invalidateQueries({ queryKey: ["documentaries-count"] });
      setIsDeleteConfirmOpen(false);
      toast({
        title: "Documentary deleted",
        description: "The documentary has been deleted successfully.",
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

  const handleSwitchChange = (checked: boolean) => {
    setFormData({
      ...formData,
      coming_soon: checked,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const openCreateForm = () => {
    setSelectedDocumentary(null);
    setFormData({
      title: "",
      director: "",
      duration: "",
      release_date: "",
      image_url: "",
      description: "",
      video_url: "",
      tags: "",
      coming_soon: false,
    });
    setIsOpen(true);
  };

  const openEditForm = (documentary: Documentary) => {
    setSelectedDocumentary(documentary);
    setFormData({
      title: documentary.title,
      director: documentary.director,
      duration: documentary.duration,
      release_date: documentary.release_date,
      image_url: documentary.image_url || "",
      description: documentary.description,
      video_url: documentary.video_url || "",
      tags: documentary.tags.join(", "),
      coming_soon: documentary.coming_soon,
    });
    setIsOpen(true);
  };

  const openDeleteConfirm = (documentary: Documentary) => {
    setSelectedDocumentary(documentary);
    setIsDeleteConfirmOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Documentaries</h1>
        <Button onClick={openCreateForm} className="bg-brand-purple hover:bg-brand-deep-purple">
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Documentary
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Loading documentaries...</div>
      ) : documentaries.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No documentaries found. Create your first documentary to get started.</p>
        </div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Director</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Release Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documentaries.map((documentary) => (
                <TableRow key={documentary.id}>
                  <TableCell className="font-medium">{documentary.title}</TableCell>
                  <TableCell>{documentary.director}</TableCell>
                  <TableCell>{documentary.duration}</TableCell>
                  <TableCell>{documentary.release_date}</TableCell>
                  <TableCell>
                    {documentary.coming_soon ? (
                      <span className="bg-brand-purple/20 text-brand-purple px-2 py-1 rounded-full text-xs">
                        Coming Soon
                      </span>
                    ) : (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                        Released
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => openEditForm(documentary)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => openDeleteConfirm(documentary)}
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
            <SheetTitle>{selectedDocumentary ? "Edit Documentary" : "Create Documentary"}</SheetTitle>
            <SheetDescription>
              {selectedDocumentary
                ? "Update the documentary details"
                : "Fill in the details to create a new documentary"}
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
              <label htmlFor="director" className="text-sm font-medium">
                Director
              </label>
              <Input
                id="director"
                name="director"
                value={formData.director}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="duration" className="text-sm font-medium">
                Duration (e.g., "65 min")
              </label>
              <div className="relative">
                <Input
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  required
                  className="pl-8"
                />
                <Clock className="absolute left-2 top-2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <div className="grid gap-2">
              <label htmlFor="release_date" className="text-sm font-medium">
                Release Date (e.g., "March 2025")
              </label>
              <Input
                id="release_date"
                name="release_date"
                value={formData.release_date}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="image_url" className="text-sm font-medium">
                Image URL (optional)
              </label>
              <Input
                id="image_url"
                name="image_url"
                value={formData.image_url}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                required
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="video_url" className="text-sm font-medium">
                Video URL (optional)
              </label>
              <Input
                id="video_url"
                name="video_url"
                value={formData.video_url}
                onChange={handleInputChange}
                placeholder="https://example.com/video.mp4"
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="tags" className="text-sm font-medium">
                Tags (comma separated)
              </label>
              <Input
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="Activism, Global, Social Justice"
              />
            </div>

            <div className="flex items-center gap-2">
              <Switch
                id="coming_soon"
                checked={formData.coming_soon}
                onCheckedChange={handleSwitchChange}
              />
              <label htmlFor="coming_soon" className="text-sm font-medium">
                Mark as Coming Soon
              </label>
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
                disabled={mutation.isPending}
              >
                {mutation.isPending
                  ? "Saving..."
                  : selectedDocumentary
                  ? "Update Documentary"
                  : "Create Documentary"}
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation */}
      <Sheet open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <SheetContent className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Delete Documentary</SheetTitle>
            <SheetDescription>
              Are you sure you want to delete "{selectedDocumentary?.title}"? This action cannot be undone.
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
              onClick={() => selectedDocumentary && deleteMutation.mutate(selectedDocumentary.id)}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete Documentary"}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AdminDocumentaries;
