
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PlayCircle } from "lucide-react";

const UpcomingDocumentary = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="inline-block mb-4 px-3 py-1 bg-brand-light-purple text-brand-deep-purple rounded-full text-sm font-medium">
              Upcoming Documentary
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              "Breaking Boundaries: Women in Science"
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Our new documentary explores the untold stories of women who have made groundbreaking contributions to science throughout history, despite facing tremendous obstacles.
            </p>
            <ul className="mb-8 space-y-3">
              <li className="flex items-center">
                <span className="h-2 w-2 rounded-full bg-brand-purple mr-2"></span>
                <span>Featuring interviews with Nobel Prize winners</span>
              </li>
              <li className="flex items-center">
                <span className="h-2 w-2 rounded-full bg-brand-purple mr-2"></span>
                <span>Exclusive behind-the-scenes footage from leading labs</span>
              </li>
              <li className="flex items-center">
                <span className="h-2 w-2 rounded-full bg-brand-purple mr-2"></span>
                <span>Coming May 2025 to major streaming platforms</span>
              </li>
            </ul>
            <div className="flex flex-wrap gap-4">
              <Button asChild className="bg-brand-purple hover:bg-brand-deep-purple text-white">
                <Link to="/documentaries">Watch Trailer</Link>
              </Button>
              <Button asChild variant="outline" className="border-brand-purple text-brand-purple hover:bg-brand-purple/10">
                <Link to="/documentaries">Learn More</Link>
              </Button>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="aspect-video rounded-lg overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1581093588401-fbb62a02f120?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  alt="Women scientists in laboratory"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button
                    size="icon"
                    className="h-16 w-16 rounded-full bg-brand-purple/90 hover:bg-brand-purple shadow-lg"
                  >
                    <PlayCircle className="h-10 w-10 text-white" />
                  </Button>
                </div>
              </div>
              <div className="absolute -z-10 -bottom-6 -left-6 w-64 h-64 bg-brand-light-purple opacity-50 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingDocumentary;
