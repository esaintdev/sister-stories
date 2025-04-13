
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlayCircle, PauseCircle, Clock, Volume2 } from "lucide-react";

// Mock data for podcasts
const podcastEpisodes = [
  {
    id: 1,
    title: "Breaking Glass Ceilings",
    host: "Dr. Sarah Johnson",
    guest: "Maria Chen, CEO of TechForward",
    duration: "45 min",
    date: "Apr 10, 2025",
    image: "https://images.unsplash.com/photo-1589903308904-1010c2294adc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    description: "A conversation with Maria Chen, who became the youngest female CEO in Silicon Valley, about breaking barriers in the tech industry."
  },
  {
    id: 2,
    title: "The Wellness Journey",
    host: "Maria Rodriguez",
    guest: "Dr. Amara Patel, Wellness Expert",
    duration: "32 min",
    date: "Apr 5, 2025",
    image: "https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
    description: "Dr. Amara Patel shares insights on holistic health approaches specifically designed for women's unique health needs."
  },
  {
    id: 3,
    title: "Future Leaders",
    host: "Michelle Washington",
    guest: "Several young women entrepreneurs",
    duration: "38 min",
    date: "Mar 28, 2025",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    description: "Meet the teenage entrepreneurs who are already making waves in their communities with innovative social enterprises."
  },
  {
    id: 4,
    title: "Women in Politics",
    host: "Dr. Sarah Johnson",
    guest: "Senator Alicia Lewis",
    duration: "51 min",
    date: "Mar 22, 2025",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80",
    description: "Senator Alicia Lewis discusses her journey in politics and the importance of women's representation in government."
  },
  {
    id: 5,
    title: "Motherhood and Career",
    host: "Maria Rodriguez",
    guest: "Panel of working mothers",
    duration: "47 min",
    date: "Mar 15, 2025",
    image: "https://images.unsplash.com/photo-1589156191108-c762ff4b96ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80",
    description: "A candid discussion with successful professionals who balance motherhood with demanding careers."
  },
  {
    id: 6,
    title: "Women in Sports",
    host: "Michelle Washington",
    guest: "Olympic gold medalist Tanya Williams",
    duration: "40 min",
    date: "Mar 8, 2025",
    image: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    description: "Tanya Williams shares her journey to Olympic gold and her advocacy for equality in sports."
  }
];

const Podcasts = () => {
  const [playingId, setPlayingId] = useState<number | null>(null);

  const togglePlay = (id: number) => {
    if (playingId === id) {
      setPlayingId(null);
    } else {
      setPlayingId(id);
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-purple/10 to-brand-magenta/10 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Podcasts</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Listen to inspiring conversations with remarkable women from around the world.
          </p>
        </div>
      </section>

      {/* Podcast Episodes List */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Latest Episodes" 
            subtitle="Tune in to our most recent podcast episodes featuring inspiring women from diverse backgrounds."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {podcastEpisodes.map((episode) => (
              <Card key={episode.id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3">
                    <img
                      src={episode.image}
                      alt={episode.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6 md:w-2/3">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-muted-foreground">
                        {episode.date}
                      </span>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        {episode.duration}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{episode.title}</h3>
                    <p className="text-sm mb-3">
                      <span className="font-medium">Host:</span> {episode.host} | 
                      <span className="font-medium"> Guest:</span> {episode.guest}
                    </p>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {episode.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2 border-brand-purple text-brand-purple hover:bg-brand-purple/10"
                        onClick={() => togglePlay(episode.id)}
                      >
                        {playingId === episode.id ? (
                          <>
                            <PauseCircle className="h-4 w-4" />
                            Pause
                          </>
                        ) : (
                          <>
                            <PlayCircle className="h-4 w-4" />
                            Play
                          </>
                        )}
                      </Button>
                      <div className="flex items-center">
                        <Volume2 className="h-4 w-4 text-muted-foreground mr-1" />
                        <span className="text-xs text-muted-foreground">Available on:</span>
                        <span className="ml-1 text-xs font-medium">Spotify, Apple, Google</span>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <Button className="bg-brand-purple hover:bg-brand-deep-purple text-white">
              Load More Episodes
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Podcasts;
