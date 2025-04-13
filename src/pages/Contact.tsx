
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/SectionHeading";
import { MapPin, Mail, Phone } from "lucide-react";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "Thank you for reaching out. We'll get back to you soon.",
    });
    // In a real app, you would send this to your backend
    (e.target as HTMLFormElement).reset();
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-purple/10 to-brand-magenta/10 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Have questions or want to collaborate? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <SectionHeading title="Get in Touch" className="mb-8" />
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-brand-purple/10 flex items-center justify-center mr-4">
                    <MapPin className="h-5 w-5 text-brand-purple" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">Our Location</h3>
                    <p className="text-muted-foreground">
                      123 Empowerment Street<br />
                      San Francisco, CA 94103<br />
                      United States
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-brand-purple/10 flex items-center justify-center mr-4">
                    <Mail className="h-5 w-5 text-brand-purple" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">Email Us</h3>
                    <p className="text-muted-foreground">
                      General Inquiries: info@sisterstories.org<br />
                      Content Submissions: content@sisterstories.org<br />
                      Partnerships: partners@sisterstories.org
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-brand-purple/10 flex items-center justify-center mr-4">
                    <Phone className="h-5 w-5 text-brand-purple" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">Call Us</h3>
                    <p className="text-muted-foreground">
                      Main Office: (555) 123-4567<br />
                      Media Inquiries: (555) 765-4321
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <h3 className="font-medium text-lg mb-4">Office Hours</h3>
                <p className="text-muted-foreground mb-2">
                  Monday - Friday: 9:00 AM - 5:00 PM (PST)<br />
                  Saturday - Sunday: Closed
                </p>
              </div>
            </div>
            
            {/* Contact Form */}
            <div>
              <SectionHeading title="Send a Message" className="mb-8" />
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      placeholder="Jane Doe"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="jane@example.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    placeholder="How can we help you?"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Please write your message here..."
                    rows={6}
                    required
                  />
                </div>
                
                <div>
                  <Button type="submit" className="bg-brand-purple hover:bg-brand-deep-purple text-white px-8 py-2">
                    Send Message
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
