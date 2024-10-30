// import Features from "@/components/features/Features";
import Banner from "../../components/banner/Banner";
import { FAQ } from "./../../components/FAQ";
import Newsletters from "@/components/newsletters/Newsletters";
import Testmonial from "@/components/Testmonial/Testmonial";
import Contact from "@/components/contact/Contact";
import OurTeams from "@/pages/aboutPage/OurTeams";

import MarketingComponent from "@/components/marketing/MarketingComponent";
// import Navbar from "@/Shared/Navbar";
import HeroHeaderSection from "./components/HeroHeaderSection";
import HeroSection from "./components/HeroSection";
import MarqueeSection from "./components/MarqueeSection";
import { BannerImage } from "./components/BannerImage";
import Features from "./components/Features";
import AutoMateTask from "./components/AutoMateTask";
import ForPrice from "./components/ForPrice";
import ProjectIdea from "./components/ProjectIdea";

// import ModalPage from "@/components/modalPage/ModalPage";

const Home = () => {
  return (
    <div className="bg-gray-100">
      <HeroSection />
      <BannerImage />
      <MarqueeSection />
      <AutoMateTask/>
      <Features />
      <ProjectIdea/>
      <Testmonial />
      <FAQ />
      <ForPrice/>
    </div>
  );
};

export default Home;
