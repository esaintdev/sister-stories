
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

type HomepageContent = Database['public']['Tables']['homepage_content']['Row'];

const Hero = () => {
  const [heroContent, setHeroContent] = useState<HomepageContent | null>(null);

  useEffect(() => {
    const fetchHeroContent = async () => {
      const { data, error } = await supabase
        .from('homepage_content')
        .select('*')
        .eq('section_type', 'hero')
        .single();

      if (error) {
        console.error('Error fetching hero content:', error);
        return;
      }

      setHeroContent(data);
    };

    fetchHeroContent();
  }, []);

  if (!heroContent) return null;

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-brand-purple/10 to-brand-magenta/10 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="animate-enter">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-brand-purple to-brand-magenta bg-clip-text text-transparent">
              {heroContent.title}
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-700 max-w-lg">
              {heroContent.subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild className="bg-brand-purple hover:bg-brand-deep-purple text-white px-8 py-6 text-lg">
                <Link to={heroContent.learn_more_url || "/about"}>Learn More</Link>
              </Button>
              <Button asChild variant="outline" className="border-brand-purple text-brand-purple hover:bg-brand-purple/10 px-8 py-6 text-lg">
                <Link to={heroContent.listen_now_url || "/podcasts"}>Listen Now</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-xl animate-enter">
              <img
                src={heroContent.image_url}
                alt="Women in a discussion circle"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-brand-light-purple rounded-full -z-10"></div>
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-brand-soft-pink rounded-full -z-10"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
