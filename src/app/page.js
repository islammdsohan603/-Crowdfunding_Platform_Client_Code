import Banner from "@/components/homepage/Banner";
import CallToAction from "@/components/homepage/CallToAction";
import CategoryFilter from "@/components/homepage/CategoryFilter";
import HowItWorks from "@/components/homepage/HowWorks";
import StatsSection from "@/components/homepage/StatsSection";
import Testimonials from "@/components/homepage/Testimonials";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Banner />
      <CategoryFilter />
      <HowItWorks />
      <StatsSection />
      <Testimonials />
      <CallToAction />
    </div>
  );
}
