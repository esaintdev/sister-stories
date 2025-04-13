
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileAudio, Film, FileText } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const AdminDashboard = () => {
  const { data: podcastsCount = 0 } = useQuery({
    queryKey: ["podcasts-count"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("podcasts")
        .select("*", { count: "exact", head: true });
      
      if (error) throw error;
      return count || 0;
    }
  });

  const { data: documentariesCount = 0 } = useQuery({
    queryKey: ["documentaries-count"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("documentaries")
        .select("*", { count: "exact", head: true });
      
      if (error) throw error;
      return count || 0;
    }
  });

  const { data: blogPostsCount = 0 } = useQuery({
    queryKey: ["blog-posts-count"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("blog_posts")
        .select("*", { count: "exact", head: true });
      
      if (error) throw error;
      return count || 0;
    }
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Podcasts</CardTitle>
            <FileAudio className="h-5 w-5 text-brand-purple" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{podcastsCount}</p>
            <p className="text-sm text-muted-foreground">Total podcasts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Documentaries</CardTitle>
            <Film className="h-5 w-5 text-brand-purple" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{documentariesCount}</p>
            <p className="text-sm text-muted-foreground">Total documentaries</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Blog Posts</CardTitle>
            <FileText className="h-5 w-5 text-brand-purple" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{blogPostsCount}</p>
            <p className="text-sm text-muted-foreground">Total blog posts</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
