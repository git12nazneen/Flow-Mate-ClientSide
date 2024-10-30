import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      offset: 150,
    });
  }, []);

  return (

    <div className="pt-10 pb-10 px-2 md:px-10">
      <div data-aos="zoom-in" className="text-center pb-10">
        <h1 className="text-2xl md:text-4xl font-bold mb-5">
          Frequently Asked Questions
        </h1>
        <p className="text-gray-600 text-sm md:text-base max-w-3xl mx-auto">
          Below are answers to some common questions. If you need more help,
          feel free to{" "}
          <a
            href="mailto:support@flowmate.com"
            className="text-blue-600 underline"
          >
            email us
          </a>
          .
        </p>
      </div>

      <div className="flex flex-col md:flex-row lg:flex-row container mx-auto mt-5 mb-20 justify-between gap-5 bg-white rounded-lg rounded-b-3xl py-8 md:px-3 lg:px-6 px-1 shadow-md">
        {/* Left section with title and description */}
        <div className="w-full lg:w-1/2 p-5">
          <div className="flex justify-center items-center pt-5">
            <div className="flex flex-col gap-5 max-w-lg w-full">
              {/* Question */}
              <div className="flex items-center bg-[#00053d] text-gray-200 rounded-md shadow-sm">
                <div className="w-1/4 bg-sky-100 flex justify-center items-center py-8">
                  <span className="text-6xl font-serif text-black ">Q</span>
                </div>
                <div className="w-3/4 p-4 text-right">
                  <p className="text-lg ">
                    How can i increase my productivity using FlowMate?
                  </p>
                </div>
              </div>

              {/* Answer */}
              <div className="flex items-center bg-[#00053d] text-gray-200 rounded-md shadow-sm">
                <div className="w-3/4 p-4">
                  <p className="text-lg ">
                    By automating tasks, setting deadlines, and tracking project.
                  </p>
                </div>
                <div className="w-1/4 bg-sky-100 flex justify-center items-center py-8">
                  <span className="text-6xl font-serif text-black">A</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Accordion FAQ section with light background and rounded edges */}
        <Accordion
          type="single"
          collapsible
          className="w-full lg:w-1/2 space-y-4 rounded-tl-lg rounded-br-lg lg:p-5 md:p-2"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {/* Accordion items with borders and paddings */}
          <AccordionItem
            value="item-1"
            className="border rounded-md p-4 hover:shadow-lg"
          >
            <AccordionTrigger className="font-semibold">
              How do I get started with FlowMate?
            </AccordionTrigger>
            <AccordionContent className="mt-2">
              Sign up with your email or Google account. Once registered, you
              can create your first project, invite team members, and start
              managing tasks instantly.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-2"
            className="border rounded-md p-4 hover:shadow-lg"
          >
            <AccordionTrigger className="font-semibold">
              Can I integrate FlowMate with other tools?
            </AccordionTrigger>
            <AccordionContent className="mt-2">
              Yes, FlowMate integrates with tools like Google Calendar, Slack,
              and more, helping you sync workflows and enhance team
              collaboration.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-3"
            className="border rounded-md p-4 hover:shadow-lg"
          >
            <AccordionTrigger className="font-semibold">
              Is my data secure on FlowMate?
            </AccordionTrigger>
            <AccordionContent className="mt-2">
              Absolutely. We use industry-standard encryption and secure
              authentication to ensure your data is safe and accessible only to
              authorized users.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
