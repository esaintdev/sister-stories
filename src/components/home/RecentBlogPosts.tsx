
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SectionHeading from "../ui/SectionHeading";
import { Link } from "react-router-dom";

// Mock data for recent blog posts
const recentPosts = [
  {
    id: 1,
    title: "The Rise of Women in Tech Leadership",
    excerpt: "Exploring the growing presence and impact of women in technology leadership roles.",
    image: "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
    date: "Apr 10, 2025",
    author: "Jessica Chen",
    category: "Technology"
  },
  {
    id: 2,
    title: "Women's Health: Breaking the Taboos",
    excerpt: "An honest conversation about women's health issues often left undiscussed.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    date: "Apr 8, 2025",
    author: "Dr. Melissa Taylor",
    category: "Health"
  },
  {
    id: 3,
    title: "The Future of Female Entrepreneurship",
    excerpt: "How women entrepreneurs are reshaping business landscapes across industries.",
    image: "https://images.unsplash.com/photo-1571727153934-b7db0101ec57?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    date: "Apr 5, 2025",
    author: "Sophia Williams",
    category: "Business"
  }
];

const RecentBlogPosts = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Recent Articles"
          subtitle="Read our latest articles on women's empowerment, leadership, health, and more."
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recentPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover-scale">
              <div className="relative h-48">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-brand-purple text-white text-xs px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>
              <CardContent className="pt-6">
                <div className="text-sm text-muted-foreground mb-2">
                  {post.date} • By {post.author}
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

        <div className="flex justify-center mt-12">
          <Button asChild className="bg-brand-purple hover:bg-brand-deep-purple text-white">
            <Link to="/blog">View All Articles</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RecentBlogPosts;
