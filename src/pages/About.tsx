
import Layout from "@/components/layout/Layout";
import MissionSection from "@/components/about/MissionSection";
import SectionHeading from "@/components/ui/SectionHeading";
import { Card, CardContent } from "@/components/ui/card";

// Mock data for team members
const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    bio: "Sarah founded Sister Stories with a vision to amplify women's voices across media platforms."
  },
  {
    name: "Michelle Lee",
    role: "Content Director",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    bio: "Michelle oversees all content production, from podcasts to documentaries and written articles."
  },
  {
    name: "Priya Patel",
    role: "Head of Podcasts",
    image: "https://images.unsplash.com/photo-1573497019236-18f3694223ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    bio: "Priya brings over a decade of audio production experience to our podcast series."
  },
  {
    name: "Carmen Rodriguez",
    role: "Documentary Producer",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=761&q=80",
    bio: "Carmen's award-winning documentaries have been featured in film festivals worldwide."
  }
];

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-purple/10 to-brand-magenta/10 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Sister Stories</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Dedicated to amplifying women's voices through compelling storytelling and community building.
          </p>
        </div>
      </section>

      <MissionSection />

      {/* Our Story Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Our Story" 
            subtitle="The journey of Sister Stories from idea to reality."
            centered
          />
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <p>
                Sister Stories began in 2019 when a group of women from diverse backgrounds came together with a shared vision: to create a platform where women's stories could be told authentically and reach audiences worldwide.
              </p>
              <p>
                What started as a small podcast series in a makeshift home studio has grown into a multimedia platform featuring documentaries, written content, and community events. Our growth has been fueled by the belief that when women share their experiences, they not only empower themselves but also inspire others.
              </p>
              <p>
                Today, Sister Stories reaches millions of women across the globe. We partner with organizations that share our commitment to gender equality and women's empowerment. Our team has grown, but our mission remains the same: to amplify women's voices and create meaningful connections through storytelling.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Meet Our Team" 
            subtitle="The passionate individuals behind Sister Stories."
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="overflow-hidden hover-scale">
                <div className="aspect-square">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-5">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-brand-purple font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
