
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for blog posts
const blogPosts = [
  {
    id: 1,
    title: "The Rise of Women in Tech Leadership",
    excerpt: "Exploring the growing presence and impact of women in technology leadership roles across Silicon Valley and beyond.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec aliquam tincidunt, nisl nisl aliquam nisl, nec aliquam nisl nisl nec aliquam.",
    image: "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
    date: "Apr 10, 2025",
    author: "Jessica Chen",
    category: "Technology"
  },
  {
    id: 2,
    title: "Women's Health: Breaking the Taboos",
    excerpt: "An honest conversation about women's health issues often left undiscussed in mainstream media and healthcare settings.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec aliquam tincidunt, nisl nisl aliquam nisl, nec aliquam nisl nisl nec aliquam.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    date: "Apr 8, 2025",
    author: "Dr. Melissa Taylor",
    category: "Health"
  },
  {
    id: 3,
    title: "The Future of Female Entrepreneurship",
    excerpt: "How women entrepreneurs are reshaping business landscapes across industries and creating new opportunities.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec aliquam tincidunt, nisl nisl aliquam nisl, nec aliquam nisl nisl nec aliquam.",
    image: "https://images.unsplash.com/photo-1571727153934-b7db0101ec57?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    date: "Apr 5, 2025",
    author: "Sophia Williams",
    category: "Business"
  },
  {
    id: 4,
    title: "Women in Film: Behind the Camera",
    excerpt: "A look at the increasing number of women directors, producers, and cinematographers changing the film industry.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec aliquam tincidunt, nisl nisl aliquam nisl, nec aliquam nisl nisl nec aliquam.",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1159&q=80",
    date: "Apr 2, 2025",
    author: "Amanda Rodriguez",
    category: "Arts & Culture"
  },
  {
    id: 5,
    title: "Financial Independence: A Woman's Guide",
    excerpt: "Practical advice for women at all stages of life to build financial security and independence.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec aliquam tincidunt, nisl nisl aliquam nisl, nec aliquam nisl nisl nec aliquam.",
    image: "https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    date: "Mar 27, 2025",
    author: "Lauren Johnson",
    category: "Finance"
  },
  {
    id: 6,
    title: "Navigating Motherhood and Career",
    excerpt: "Stories from women who successfully balance demanding careers with motherhood, and the lessons they've learned.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec aliquam tincidunt, nisl nisl aliquam nisl, nec aliquam nisl nisl nec aliquam.",
    image: "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
    date: "Mar 22, 2025",
    author: "Patricia Gomez",
    category: "Lifestyle"
  }
];

// Get all unique categories
const categories = Array.from(
  new Set(blogPosts.map((post) => post.category))
).sort();

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryFilter = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  // Filter posts based on search term and selected category
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = 
      searchTerm === "" || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === null || 
      post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-purple/10 to-brand-magenta/10 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Blog</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Insights, stories, and perspectives on women's empowerment and gender equality.
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar with search and categories */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">Search</h3>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search articles..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        size="sm"
                        className={`w-full justify-start ${
                          selectedCategory === category
                            ? "bg-brand-purple hover:bg-brand-deep-purple"
                            : "border-brand-purple text-brand-purple hover:bg-brand-purple/10"
                        }`}
                        onClick={() => handleCategoryFilter(category)}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Blog posts grid */}
            <div className="lg:col-span-3">
              <SectionHeading 
                title="Latest Articles" 
                subtitle="Explore our collection of articles on women's empowerment, leadership, and more."
              />

              {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {filteredPosts.map((post) => (
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
              ) : (
                <div className="text-center py-12">
                  <p className="text-lg text-muted-foreground">No articles found matching your criteria.</p>
                  <Button 
                    variant="outline"
                    className="mt-4 border-brand-purple text-brand-purple hover:bg-brand-purple/10"
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory(null);
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}

              {filteredPosts.length > 0 && (
                <div className="flex justify-center mt-12">
                  <Button className="bg-brand-purple hover:bg-brand-deep-purple text-white">
                    Load More Articles
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
