
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
      <FeaturedPodcasts />
      <UpcomingDocumentary />
      <RecentBlogPosts />
      <Newsletter />
    </Layout>
  );
};

export default Index;
