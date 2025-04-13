
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlayCircle, PauseCircle, Clock, Volume2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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

const Podcasts = () => {
  const [playingId, setPlayingId] = useState<string | null>(null);

  const { data: podcastEpisodes = [], isLoading } = useQuery({
    queryKey: ["podcasts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("podcasts")
        .select("*")
        .order("date", { ascending: false });
      
      if (error) throw error;
      return data as Podcast[];
    }
  });

  const togglePlay = (id: string) => {
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

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">Loading podcasts...</p>
            </div>
          ) : podcastEpisodes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No podcast episodes found.</p>
              <p className="text-muted-foreground">Check back soon for new episodes!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {podcastEpisodes.map((episode) => (
                <Card key={episode.id} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3">
                      <img
                        src={episode.image_url || "https://images.unsplash.com/photo-1589903308904-1010c2294adc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"}
                        alt={episode.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-6 md:w-2/3">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-muted-foreground">
                          {new Date(episode.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric"
                          })}
                        </span>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          {episode.duration}
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{episode.title}</h3>
                      <p className="text-sm mb-3">
                        <span className="font-medium">Host:</span> {episode.host} 
                        {episode.guest && (
                          <> | <span className="font-medium">Guest:</span> {episode.guest}</>
                        )}
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
                          disabled={!episode.audio_url}
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
          )}

          {podcastEpisodes.length > 0 && (
            <div className="flex justify-center mt-12">
              <Button className="bg-brand-purple hover:bg-brand-deep-purple text-white">
                Load More Episodes
              </Button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Podcasts;
