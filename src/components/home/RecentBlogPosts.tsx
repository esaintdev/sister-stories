
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SectionHeading from "../ui/SectionHeading";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const RecentBlogPosts = () => {
  // Fetch recent blog posts from Supabase
  const { data: recentPosts = [], isLoading } = useQuery({
    queryKey: ["recent-blog-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("date", { ascending: false })
        .limit(3);
      
      if (error) {
        console.error("Error fetching recent blog posts:", error);
        return [];
      }
      
      return data || [];
    }
  });

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Recent Articles"
          subtitle="Read our latest articles on women's empowerment, leadership, health, and more."
          centered
        />

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading recent articles...</p>
          </div>
        ) : recentPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover-scale">
                <div className="relative h-48">
                  <img
                    src={post.image_url || "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1159&q=80"}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1159&q=80";
                    }}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-brand-purple text-white text-xs px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                <CardContent className="pt-6">
                  <div className="text-sm text-muted-foreground mb-2">
                    {new Date(post.date).toLocaleDateString()} • By {post.author}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-muted-foreground">{post.excerpt}</p>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button
                    variant="ghost"
                    className="text-brand-purple hover:text-brand-purple hover:bg-brand-purple/10 p-0"
                    asChild
                  >
                    <Link to={`/blog/${post.id}`}>Read More</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No articles available yet.</p>
            <Button
              variant="outline"
              className="mt-4 border-brand-purple text-brand-purple hover:bg-brand-purple/10"
              asChild
            >
              <Link to="/admin/blog">Add Your First Article</Link>
            </Button>
          </div>
        )}

        {recentPosts.length > 0 && (
          <div className="flex justify-center mt-12">
            <Button asChild className="bg-brand-purple hover:bg-brand-deep-purple text-white">
              <Link to="/blog">View All Articles</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentBlogPosts;
