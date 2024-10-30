import Container from "@/components/Container";
import HeroHeaderSection from "./HeroHeaderSection";
// import { gilroyBold } from "@/lib/utils";
import MainButton from "@/Shared/MainButton";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { HashLink } from "react-router-hash-link";

function HeroSection() {
 
  return (
    <Container>
      <section className=" py-16">
        <HeroHeaderSection />
        <div>
          <div className="text-4xl font-bold md:text-[62px] text-center text-[#00053d] md:leading-[5.5rem] my-8">
            Empower Your Team, <br /> Achieve More Together
          </div>

          <p className="mb-8 text-[22px] text-center text-[#31373D]">
            Boost productivity and collaborate effortlessly with{" "}
            <strong>FlowMate</strong>, your all-in-one team platform.
          </p>

          <div className="flex gap-[12px] justify-center">
            <HashLink smooth to="/pricing" className="cursor-pointer">
            <MainButton
              text="Start for free"
              size="small"
              className="border-none rounded-[12px]"
            />
            </HashLink>
            <HashLink smooth to="/contact" className="cursor-pointer">
            <MainButton
              text="Talk to sales"
              size="small"
              className="rounded-[12px] border-[1px] border-[#EDEEF0] bg-white hover:bg-white text-[#31373D]"
            />
            </HashLink>
          </div>

          <div className="flex w-full justify-center"></div>
        </div>
      </section>
    </Container>
  );
}

export default HeroSection;