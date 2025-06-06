
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

type HomepageContent = Database['public']['Tables']['homepage_content']['Row'];

const HeroEditor = () => {
  const { toast } = useToast();
  const [content, setContent] = useState<HomepageContent>({
    id: 'hero',
    title: 'Empowering Women Through Stories',
    subtitle: 'Join our community where women\'s voices are amplified through podcasts, documentaries, and inspiring content.',
    learn_more_url: '/about',
    listen_now_url: '/podcasts',
    image_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80',
    section_type: 'hero',
    created_at: null,
    updated_at: null
  });

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from('homepage_content')
        .upsert({ ...content });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Hero content updated successfully",
      });
    } catch (error) {
      console.error('Error saving hero content:', error);
      toast({
        title: "Error",
        description: "Failed to update hero content",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Hero Section</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium">Title</label>
          <Input
            value={content.title}
            onChange={(e) => setContent({ ...content, title: e.target.value })}
            placeholder="Enter hero title"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Subtitle</label>
          <Textarea
            value={content.subtitle || ''}
            onChange={(e) => setContent({ ...content, subtitle: e.target.value })}
            placeholder="Enter hero subtitle"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Learn More URL</label>
          <Input
            value={content.learn_more_url || ''}
            onChange={(e) => setContent({ ...content, learn_more_url: e.target.value })}
            placeholder="Enter learn more URL"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Listen Now URL</label>
          <Input
            value={content.listen_now_url || ''}
            onChange={(e) => setContent({ ...content, listen_now_url: e.target.value })}
            placeholder="Enter listen now URL"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Image URL</label>
          <Input
            value={content.image_url || ''}
            onChange={(e) => setContent({ ...content, image_url: e.target.value })}
            placeholder="Enter image URL"
          />
        </div>
        <Button onClick={handleSave}>Save Changes</Button>
      </CardContent>
    </Card>
  );
};

export default HeroEditor;
