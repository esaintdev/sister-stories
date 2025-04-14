
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import FeaturedPodcasts from "@/components/home/FeaturedPodcasts";
import RecentBlogPosts from "@/components/home/RecentBlogPosts";
import UpcomingDocumentary from "@/components/home/UpcomingDocumentary";
import Newsletter from "@/components/home/Newsletter";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <FeaturedPodcasts />
        <UpcomingDocumentary />
        <RecentBlogPosts />
        <Newsletter />
      </div>
    </Layout>
  );
};

export default Index;
