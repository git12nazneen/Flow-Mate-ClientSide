import { useEffect, useState, useRef } from "react";
import UseAxiosCommon from "@/hooks/UseAxiosCommon";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import AOS from "aos";
import "aos/dist/aos.css";
import { Autoplay } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import "swiper/css/effect-coverflow";
import { EffectCoverflow, Pagination } from "swiper/modules";
const Testimonial = () => {
  const axiosCommon = UseAxiosCommon();
  const swiperRef = useRef(null);
  const [visibleSlides, setVisibleSlides] = useState(1);

  const {
    data: feedbackData = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["feedbackData"],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/feedbacks`);
      return data;
    },
  });

  const defaultImage =
    "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

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

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  const cardIamge =
    "https://st.depositphotos.com/2890953/3549/i/450/depositphotos_35491151-stock-photo-feedback-process-design-with-group.jpg";
  return (
    <div className="mx-auto lg:p-10 md:p-5 p-1">
      <div data-aos="zoom-in" className="text-center pt-6 pb-10">
        <h1 className="text-2xl md:text-4xl font-bold mb-5">
          Some real-life feedback from our customers
        </h1>
        <p className="text-gray-600 text-sm md:text-base max-w-3xl mx-auto">
          For over a decade, more than 50,000 teams made Real Work happen with
          FlowMate. Here are the thoughts from our team on how collaboration
          helps us achieve success together.
        </p>
      </div>

      <div className="container mx-auto px-5 py-2">
      <Swiper
  modules={[Autoplay, EffectCoverflow, Pagination]}
  effect={"coverflow"}
  autoplay={{ delay: 3000 }}
  coverflowEffect={{
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  }}
  spaceBetween={20} // Adjusted spacing for better layout on medium screens
  slidesPerView={1} // Default view for small screens
  breakpoints={{
    640: { slidesPerView: 1 },    // Small screens
    768: { slidesPerView: 2 },    // Medium screens (tablets)
    1024: { slidesPerView: 2 },   // Large screens (small laptops)
    1280: { slidesPerView: 3 },   // Extra-large screens (desktops)
  }}
  loop={true}
  pagination={{ clickable: true }}
  onSwiper={(swiper) => {
    swiperRef.current = swiper;
    updateVisibleSlides(swiper);
  }}
  onResize={(swiper) => updateVisibleSlides(swiper)}
>
  {feedbackData.length > 0 ? (
    feedbackData.map((feedback, index) => (
      <SwiperSlide key={index} className="rounded-3xl">
        <div className="overflow-hidden bg-white text-slate-500 shadow-md shadow-slate-200 group transition-transform transform hover:scale-95 rounded-2xl text-center hover:bg-[#2c2f52] lg:max-h-[450px] hover:text-white">
          <div className="flex flex-col justify-center items-center h-80">
            <div className="p-4">
              <header className="flex gap-2 py-1">
                <a
                  href="#"
                  className="relative inline-flex h-12 w-12 items-center justify-center rounded-full text-white"
                >
                  <img
                    src={feedback.image || defaultImage}
                    alt={feedback.name}
                    className="max-w-full rounded-full"
                  />
                </a>
                <div>
                  <h3 className="text-xl font-medium text-slate-700 group-hover:text-white">
                    {feedback.name}
                  </h3>
                  <p className="text-sm text-slate-400">
                    Given on{" "}
                    {feedback.createdAt
                      ? new Date(feedback.createdAt).toLocaleString()
                      : "Unknown date"}
                  </p>
                </div>
              </header>
            </div>

            <div className="p-2">
              <p>
                {feedback.feedback.split(" ").slice(0, 12).join(" ")}...
              </p>
            </div>
            <div className="flex justify-end gap-2 p-2 pt-0">
              <p className="inline-flex h-10 items-center justify-center gap-2 rounded px-5 text-sm font-medium text-emerald-500 transition hover:bg-emerald-100">
                <span className="relative">
                  <Rating
                    style={{ maxWidth: 120 }}
                    value={
                      typeof feedback.rating === "number"
                        ? feedback.rating
                        : 0
                    } 
                    readOnly
                  />
                </span>
              </p>
            </div>
          </div>
        </div>
      </SwiperSlide>
    ))
  ) : (
    <p>No feedback available.</p>
  )}
</Swiper>

      </div>
    </div>
  );
};

export default Testimonial;