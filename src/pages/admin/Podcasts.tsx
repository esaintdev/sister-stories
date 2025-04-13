
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
import { PlusCircle, Pencil, Trash2, X, CalendarIcon, Clock } from "lucide-react";

type Podcast = {
  id: string;
  title: string;
  host: string;
  guest: string | null;
  duration: string;
  image_url: string | null;
  description: string;
  audio_url: string | null;
  date: string;
}

const AdminPodcasts = () => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedPodcast, setSelectedPodcast] = useState<Podcast | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    host: "",
    guest: "",
    duration: "",
    image_url: "",
    description: "",
    audio_url: "",
    date: new Date().toISOString(),
  });

  // Fetch podcasts
  const { data: podcasts = [], isLoading } = useQuery({
    queryKey: ["admin-podcasts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("podcasts")
        .select("*")
        .order("date", { ascending: false });
      
      if (error) {
        toast({
          title: "Error fetching podcasts",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      return data || [];
    }
  });

  // Create or update podcast
  const mutation = useMutation({
    mutationFn: async (podcast: typeof formData & { id?: string }) => {
      let response;
      
      if (selectedPodcast) {
        // Update
        response = await supabase
          .from("podcasts")
          .update({
            title: podcast.title,
            host: podcast.host,
            guest: podcast.guest || null,
            duration: podcast.duration,
            image_url: podcast.image_url || null,
            description: podcast.description,
            audio_url: podcast.audio_url || null,
            date: podcast.date,
            updated_at: new Date().toISOString(),
          })
          .eq("id", selectedPodcast.id);
      } else {
        // Insert
        response = await supabase
          .from("podcasts")
          .insert({
            title: podcast.title,
            host: podcast.host,
            guest: podcast.guest || null,
            duration: podcast.duration,
            image_url: podcast.image_url || null,
            description: podcast.description,
            audio_url: podcast.audio_url || null,
            date: podcast.date,
          });
      }
      
      const { error } = response;
      if (error) throw error;
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-podcasts"] });
      queryClient.invalidateQueries({ queryKey: ["podcasts-count"] });
      setIsOpen(false);
      toast({
        title: selectedPodcast ? "Podcast updated" : "Podcast created",
        description: selectedPodcast
          ? "The podcast has been updated successfully."
          : "The podcast has been created successfully.",
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

  // Delete podcast
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("podcasts")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-podcasts"] });
      queryClient.invalidateQueries({ queryKey: ["podcasts-count"] });
      setIsDeleteConfirmOpen(false);
      toast({
        title: "Podcast deleted",
        description: "The podcast has been deleted successfully.",
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
    setSelectedPodcast(null);
    setFormData({
      title: "",
      host: "",
      guest: "",
      duration: "",
      image_url: "",
      description: "",
      audio_url: "",
      date: new Date().toISOString(),
    });
    setIsOpen(true);
  };

  const openEditForm = (podcast: Podcast) => {
    setSelectedPodcast(podcast);
    setFormData({
      title: podcast.title,
      host: podcast.host,
      guest: podcast.guest || "",
      duration: podcast.duration,
      image_url: podcast.image_url || "",
      description: podcast.description,
      audio_url: podcast.audio_url || "",
      date: podcast.date,
    });
    setIsOpen(true);
  };

  const openDeleteConfirm = (podcast: Podcast) => {
    setSelectedPodcast(podcast);
    setIsDeleteConfirmOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Podcasts</h1>
        <Button onClick={openCreateForm} className="bg-brand-purple hover:bg-brand-deep-purple">
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Podcast
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Loading podcasts...</div>
      ) : podcasts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No podcasts found. Create your first podcast to get started.</p>
        </div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Host</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {podcasts.map((podcast) => (
                <TableRow key={podcast.id}>
                  <TableCell className="font-medium">{podcast.title}</TableCell>
                  <TableCell>{podcast.host}</TableCell>
                  <TableCell>{podcast.duration}</TableCell>
                  <TableCell>{new Date(podcast.date).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => openEditForm(podcast)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => openDeleteConfirm(podcast)}
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
            <SheetTitle>{selectedPodcast ? "Edit Podcast" : "Create Podcast"}</SheetTitle>
            <SheetDescription>
              {selectedPodcast
                ? "Update the podcast details"
                : "Fill in the details to create a new podcast"}
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
              <label htmlFor="host" className="text-sm font-medium">
                Host
              </label>
              <Input
                id="host"
                name="host"
                value={formData.host}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="guest" className="text-sm font-medium">
                Guest (optional)
              </label>
              <Input
                id="guest"
                name="guest"
                value={formData.guest}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="duration" className="text-sm font-medium">
                Duration (e.g., "45 min")
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
              <label htmlFor="audio_url" className="text-sm font-medium">
                Audio URL (optional)
              </label>
              <Input
                id="audio_url"
                name="audio_url"
                value={formData.audio_url}
                onChange={handleInputChange}
                placeholder="https://example.com/podcast.mp3"
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
                <CalendarIcon className="absolute left-2 top-2 h-4 w-4 text-muted-foreground" />
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
                disabled={mutation.isPending}
              >
                {mutation.isPending
                  ? "Saving..."
                  : selectedPodcast
                  ? "Update Podcast"
                  : "Create Podcast"}
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation */}
      <Sheet open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <SheetContent className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Delete Podcast</SheetTitle>
            <SheetDescription>
              Are you sure you want to delete "{selectedPodcast?.title}"? This action cannot be undone.
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
              onClick={() => selectedPodcast && deleteMutation.mutate(selectedPodcast.id)}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete Podcast"}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AdminPodcasts;
