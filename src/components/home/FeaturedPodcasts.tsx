
import { PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SectionHeading from "../ui/SectionHeading";
import { Link } from "react-router-dom";

// Mock data for featured podcasts
const featuredPodcasts = [
  {
    id: 1,
    title: "Breaking Glass Ceilings",
    host: "Dr. Sarah Johnson",
    duration: "45 min",
    image: "https://images.unsplash.com/photo-1589903308904-1010c2294adc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    description: "Conversations with women who have shattered barriers in their fields."
  },
  {
    id: 2,
    title: "The Wellness Journey",
    host: "Maria Rodriguez",
    duration: "32 min",
    image: "https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
    description: "Exploring mental and physical health topics from a female perspective."
  },
  {
    id: 3,
    title: "Future Leaders",
    host: "Michelle Washington",
    duration: "38 min",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    description: "Inspiring stories from young women making a difference in their communities."
  }
];

const FeaturedPodcasts = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Featured Podcasts"
          subtitle="Listen to our most popular podcast episodes featuring inspiring women from around the world."
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPodcasts.map((podcast) => (
            <Card key={podcast.id} className="overflow-hidden hover-scale border-none shadow-md">
              <div className="relative h-48">
                <img
                  src={podcast.image}
                  alt={podcast.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <Button
                    size="icon"
                    variant="outline"
                    className="rounded-full bg-white/20 border-white/50 backdrop-blur-sm hover:bg-white/30"
                  >
                    <PlayCircle className="h-8 w-8 text-white" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-5">
                <p className="text-sm text-muted-foreground mb-1">
                  {podcast.host} • {podcast.duration}
                </p>
                <h3 className="text-xl font-semibold mb-2">{podcast.title}</h3>
                <p className="text-muted-foreground mb-4">{podcast.description}</p>
                <Button
                  variant="ghost"
                  className="text-brand-purple hover:text-brand-purple hover:bg-brand-purple/10 p-0"
                  asChild
                >
                  <Link to={`/podcasts/${podcast.id}`}>Listen Now</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Button asChild className="bg-brand-purple hover:bg-brand-deep-purple text-white">
            <Link to="/podcasts">View All Podcasts</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPodcasts;
