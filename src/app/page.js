import Banner from "@/components/homepage/Banner";
import CategoryFilter from "@/components/homepage/CategoryFilter";
import HowItWorks from "@/components/homepage/HowWorks";
import StatsSection from "@/components/homepage/StatsSection";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Banner />
      <CategoryFilter />
      <HowItWorks />
      <StatsSection />
    </div>
  );
}
