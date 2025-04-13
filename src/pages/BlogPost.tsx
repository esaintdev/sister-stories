
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ChevronLeft, CalendarIcon, User } from "lucide-react";

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  
  const { data: post, isLoading } = useQuery({
    queryKey: ["blog-post", id],
    queryFn: async () => {
      if (!id) return null;
      
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("id", id)
        .single();
      
      if (error) {
        console.error("Error fetching blog post:", error);
        return null;
      }
      
      return data;
    }
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="flex justify-center items-center h-64">
            <p className="text-lg text-muted-foreground">Loading article...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col justify-center items-center h-64">
            <h2 className="text-2xl font-bold mb-4">Article Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The article you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/blog">Back to Blog</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="mb-6">
          <Button 
            variant="outline" 
            className="mb-8 flex items-center gap-2"
            asChild
          >
            <Link to="/blog">
              <ChevronLeft className="h-4 w-4" />
              Back to Articles
            </Link>
          </Button>
        </div>
        
        {/* Header */}
        <div className="mb-10">
          <span className="inline-block bg-brand-purple text-white text-sm px-3 py-1 rounded-full mb-4">
            {post.category}
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{post.title}</h1>
          <div className="flex items-center gap-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              <span>{new Date(post.date).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        
        {/* Featured Image */}
        {post.image_url && (
          <div className="mb-10">
            <img
              src={post.image_url}
              alt={post.title}
              className="w-full h-auto max-h-[500px] object-cover rounded-lg"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1159&q=80";
              }}
            />
          </div>
        )}
        
        {/* Article Content */}
        <div className="prose max-w-none lg:prose-lg">
          {/* Render content with proper line breaks */}
          {post.content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default BlogPost;
