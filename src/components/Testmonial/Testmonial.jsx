import { useEffect, useState, useRef } from "react";
import UseAxiosCommon from "@/hooks/UseAxiosCommon";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import AOS from "aos";
import "aos/dist/aos.css";
import { Autoplay } from "swiper/modules";
const Testimonial = () => {
  const axiosCommon = UseAxiosCommon();
  const [feedbacks, setFeedbacks] = useState([]);
  const swiperRef = useRef(null); // To control Swiper manually
  const [visibleSlides, setVisibleSlides] = useState(1); // Track the number of visible slides

  useEffect(() => {
    axiosCommon
      .get("feedbacks")
      .then((response) => {
        setFeedbacks(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [axiosCommon]);

  const defaultImage =
    "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

  // Update the number of visible slides based on the Swiper breakpoints
  const updateVisibleSlides = (swiper) => {
    const breakpoints = swiper.params.breakpoints;
    const currentWidth = window.innerWidth;
    let slides = 1;

    if (breakpoints[1280] && currentWidth >= 1280) slides = 3;
    else if (breakpoints[1024] && currentWidth >= 1024) slides = 2;
    else if (breakpoints[640] && currentWidth >= 640) slides = 1;

    setVisibleSlides(slides);
  };
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      offset: 150,
    });
  }, []);
  return (
    <div className=" mx-auto p-5 lg:p-10">
      <div data-aos="zoom-in" className="text-center pt-6 pb-10">
        <h1 className="text-xl lg:text-2xl md:text-4xl font-bold mb-5">
          Some real-life feedback from our customers
        </h1>
        <p className="text-gray-600 text-sm md:text-base max-w-3xl mx-auto">
          For over a decade, more than 50,000 teams made Real Work happen with
          FlowMate. Here are the thoughts from our team on how collaboration
          helps us achieve success together.
        </p>
      </div>

      <div className="container mx-auto px-5 py-5">
        {/* Swiper Implementation for Sliding Cards */}
        <Swiper
         modules={[Autoplay]} // Add Autoplay module here
         autoplay={{ delay: 3000 }} // 3 seconds delay for autoplay
          spaceBetween={30}
          slidesPerView={1} // One visible card on small screens, can be adjusted
          breakpoints={{
            640: { slidesPerView: 1 },
            1024: { slidesPerView: 2 },
            1280: { slidesPerView: 3 }, // Three visible cards on larger screens
          }}
          loop={true}
          pagination={{ clickable: true }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            updateVisibleSlides(swiper); // Call this to initialize the visible slides count
          }}
          onResize={(swiper) => updateVisibleSlides(swiper)} // Update on window resize
        >
          {feedbacks.map((feedback, index) => {
            const middleIndex = Math.floor(visibleSlides / 2);

            return (
              <SwiperSlide key={index} className="rounded-3xl">
              <div
                className={`relative p-8 rounded-2xl overflow-visible transition-transform transform hover:scale-105 w-96 h-80 group 
                ${index % visibleSlides === middleIndex ? "bg-[#00053d] text-white" : "bg-white hover:bg-[#00053d] hover:text-white rounded-3xl"}
                `}
              >
                {/* User Image */}
                <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-32 h-32 rounded-full border-4 border-white overflow-hidden z-20">
                  <img
                    src={feedback.image ? defaultImage : feedback.image}
                    alt={feedback.name}
                    className="w-full h-full object-cover"
                  />
                </div>
            
                {/* Card Content */}
                <div className="mt-20 text-center pt-12">
                  {/* Stars */}
                  <div
                    className={`flex justify-center mb-4 ${
                      index % visibleSlides === middleIndex
                        ? "text-white"
                        : "group-hover:text-white"
                    }`}
                  >
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={`${i < feedback.rating ? (index % visibleSlides === middleIndex ? "text-white" : "text-yellow-400 group-hover:text-white") : "text-gray-300 group-hover:text-white"} text-xl`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
            
                  {/* Review Text */}
                  <p
                    className={`mb-6 leading-relaxed ${
                      index % visibleSlides === middleIndex
                        ? "text-white"
                        : "text-gray-500 group-hover:text-white"
                    }`}
                  >
                    {feedback.feedback}
                  </p>
            
                  {/* Reviewer Name */}
                  <p
                    className={`font-bold text-lg ${
                      index % visibleSlides === middleIndex
                        ? "text-white"
                        : "text-gray-900 group-hover:text-white"
                    }`}
                  >
                    {feedback.name}
                  </p>
                </div>
              </div>
            </SwiperSlide>
            
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonial;
