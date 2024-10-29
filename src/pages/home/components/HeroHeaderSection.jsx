import { ChevronRight } from "lucide-react";

function HeroHeaderSection() {
  return (
    <div className="flex justify-center mt-24 ">
      <div className="inline-flex  items-center gap-1 bg-[#dadadb] p-1 rounded-[100px] pr-[10px]">
        <div className="text-white inline-block bg-[#00053d] p-2 rounded-[100px] text-[10px] font-semibold">
          New
        </div>
        <p className="text-[#31373D] sm:line-clamp-1">
          FlowMate is a powerful and easy-to-use platform that helps teams
          collaborate seamlessly.
        </p>
        <div>
          <ChevronRight />
        </div>
      </div>
    </div>
  );
}

export default HeroHeaderSection;
