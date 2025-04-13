
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

const Newsletter = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Subscribed!",
      description: "Thank you for subscribing to our newsletter.",
    });
    // In a real app, you would send this to your backend
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section className="py-16 bg-gradient-to-br from-brand-purple/20 to-brand-magenta/20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stay Updated with Our Newsletter
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Get the latest stories, podcasts, and documentaries delivered straight to your inbox.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email address"
              className="md:flex-grow"
              required
            />
            <Button type="submit" className="bg-brand-purple hover:bg-brand-deep-purple text-white md:px-8">
              Subscribe
            </Button>
          </form>
          <p className="text-sm text-muted-foreground mt-4">
            By subscribing, you agree to our Privacy Policy and Terms of Service.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
