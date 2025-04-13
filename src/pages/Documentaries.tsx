
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlayCircle, Clock, Calendar } from "lucide-react";

// Mock data for documentaries
const documentaries = [
  {
    id: 1,
    title: "Rising Voices",
    director: "Amanda Chen",
    duration: "68 min",
    releaseDate: "March 2025",
    image: "https://images.unsplash.com/photo-1560523159-4a9692d222f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    description: "Follows five women activists from different countries as they lead grassroots movements for change in their communities.",
    tags: ["Activism", "Global", "Social Justice"]
  },
  {
    id: 2,
    title: "Code Like a Girl",
    director: "Sarah Johnson",
    duration: "52 min",
    releaseDate: "January 2025",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80",
    description: "Explores the gender gap in technology and the women working to change the face of coding.",
    tags: ["Technology", "Education", "Career"]
  },
  {
    id: 3,
    title: "The Art of Healing",
    director: "Elena Martinez",
    duration: "75 min",
    releaseDate: "November 2024",
    image: "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    description: "Profiles women healers around the world who combine traditional practices with modern medicine.",
    tags: ["Health", "Culture", "Tradition"]
  },
  {
    id: 4,
    title: "Breaking Boundaries: Women in Science",
    director: "Dr. Michelle Lee",
    duration: "64 min",
    releaseDate: "Coming May 2025",
    image: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    description: "Our new documentary explores the untold stories of women who have made groundbreaking contributions to science throughout history.",
    tags: ["Science", "History", "Innovation"],
    comingSoon: true
  }
];

const Documentaries = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const handleTagFilter = (tag: string) => {
    if (selectedTag === tag) {
      setSelectedTag(null);
    } else {
      setSelectedTag(tag);
    }
  };

  // Get all unique tags
  const allTags = Array.from(
    new Set(documentaries.flatMap((doc) => doc.tags))
  ).sort();

  // Filter documentaries based on selected tag
  const filteredDocumentaries = selectedTag
    ? documentaries.filter((doc) => doc.tags.includes(selectedTag))
    : documentaries;

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-purple/10 to-brand-magenta/10 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Documentaries</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Powerful visual stories that highlight women's experiences, challenges, and triumphs.
          </p>
        </div>
      </section>

      {/* Documentaries List */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Watch Our Documentaries" 
            subtitle="From women in technology to global activists, our documentaries shed light on important issues."
          />

          {/* Filter by tags */}
          <div className="mb-10">
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <Button
                  key={tag}
                  variant={selectedTag === tag ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleTagFilter(tag)}
                  className={selectedTag === tag 
                    ? "bg-brand-purple hover:bg-brand-deep-purple" 
                    : "border-brand-purple text-brand-purple hover:bg-brand-purple/10"
                  }
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredDocumentaries.map((documentary) => (
              <Card key={documentary.id} className={`overflow-hidden hover-scale ${documentary.comingSoon ? 'border-brand-purple/30' : ''}`}>
                <div className="relative h-64">
                  <img
                    src={documentary.image}
                    alt={documentary.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">{documentary.title}</h3>
                      <p className="text-white/80">Directed by {documentary.director}</p>
                    </div>
                  </div>
                  {documentary.comingSoon && (
                    <div className="absolute top-4 right-4 bg-brand-purple text-white px-4 py-1 rounded-full text-sm font-medium">
                      Coming Soon
                    </div>
                  )}
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      {documentary.duration}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      {documentary.releaseDate}
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">{documentary.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {documentary.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="bg-brand-purple/10 text-brand-purple text-xs px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Button 
                    className={documentary.comingSoon 
                      ? "bg-brand-purple/70 hover:bg-brand-deep-purple/70 text-white" 
                      : "bg-brand-purple hover:bg-brand-deep-purple text-white"
                    }
                  >
                    <PlayCircle className="h-4 w-4 mr-2" />
                    {documentary.comingSoon ? 'Watch Trailer' : 'Watch Now'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Documentaries;
