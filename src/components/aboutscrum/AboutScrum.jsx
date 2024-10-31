import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Button } from '../ui/button';
import features from '../../assets/marketing/about.png'
import MainButton from '@/Shared/MainButton';
import { HashLink } from 'react-router-hash-link';
const AboutScrum = () => {
  useEffect(() => {
    AOS.init({ duration: 600 });
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4 lg:p-8 mb-24 lg:pt-10">
      <div className="grid justify-center items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        <div
          data-aos="fade-zoom-in"
          data-aos-offset="200"
          data-aos-easing="ease-in-sine"
          data-aos-duration="600"
          className="mt-3 lg:text-start text-center"
        >
          <h1 className="text-xl text-gray-700 mb-3">About FlowMate</h1>
          <h1 className="text-3xl font-bold">What is FlowMate?</h1>
          <p className="mt-2 text-gray-600">
            FlowMate helps people and teams <strong>deliver value incrementally</strong> in a{" "}
            <strong>collaborative</strong> manner. If you are just getting
            started, think of it as a way to get work done as a team in small
            pieces at a time, with experimentation and feedback loops along the
            way.
          </p>
          <HashLink smooth to="/contact" className="cursor-pointer">
            <MainButton
              text="Learn More"
              size="small"
              className="border-none rounded-[12px] mt-5"
            />
          </HashLink>
        </div>
        <div data-aos="fade-zoom-in"
          data-aos-offset="200"
          data-aos-easing="ease-in-sine"
          data-aos-duration="400" className="ms-5">
          <img src={features} alt="" />
        </div>
      </div>
    </div>
  );
};

export default AboutScrum;