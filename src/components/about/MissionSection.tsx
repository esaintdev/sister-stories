
import SectionHeading from "../ui/SectionHeading";

const MissionSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1558403194-611308249627?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt="Women in a community meeting"
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -z-10 -bottom-6 -right-6 w-64 h-64 bg-brand-soft-pink opacity-50 rounded-full blur-2xl"></div>
            </div>
          </div>
          <div>
            <SectionHeading
              title="Our Mission"
              className="mb-8"
            />
            <p className="text-lg mb-6">
              Sister Stories is dedicated to amplifying women's voices through compelling storytelling across various media. We believe in the power of shared experiences to inspire, educate, and drive positive change.
            </p>
            <p className="text-lg mb-6">
              Our mission is to create a platform where women from all backgrounds can share their unique perspectives, challenges, and triumphs. Through podcasts, documentaries, articles, and community events, we strive to:
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <span className="h-5 w-5 rounded-full bg-brand-purple flex items-center justify-center text-white text-xs mt-0.5 mr-3">✓</span>
                <span>Celebrate the diverse experiences of women worldwide</span>
              </li>
              <li className="flex items-start">
                <span className="h-5 w-5 rounded-full bg-brand-purple flex items-center justify-center text-white text-xs mt-0.5 mr-3">✓</span>
                <span>Highlight untold stories that challenge stereotypes</span>
              </li>
              <li className="flex items-start">
                <span className="h-5 w-5 rounded-full bg-brand-purple flex items-center justify-center text-white text-xs mt-0.5 mr-3">✓</span>
                <span>Foster meaningful connections and community</span>
              </li>
              <li className="flex items-start">
                <span className="h-5 w-5 rounded-full bg-brand-purple flex items-center justify-center text-white text-xs mt-0.5 mr-3">✓</span>
                <span>Advocate for gender equality and women's empowerment</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
