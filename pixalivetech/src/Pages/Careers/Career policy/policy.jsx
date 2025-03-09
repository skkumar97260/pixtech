import React,{useEffect} from "react";
import Header from "../../../Components/header";
import MainHeader from "../../../Components/mainheader";
import Footer from "../../../Components/footer";
import slide1 from "../../../Assests/Images/pagetitle_bg.jpg";
import { FaGreaterThan } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
const EmailLink = ({ email, text }) => (
  <a href={`mailto:${email}`} className="text-yellow-500 font-bold">
    {text || email}
  </a>
);

const Policy = () => {
  useEffect(() => {
    AOS.init({
        duration: 1000,
        easing: "ease-in-out",
        once: false,
        mirror: true,
    });
}, []);
  return (
    <div>
     <div className="relative z-50">
                <Header />
                <MainHeader />
            </div>
        <div className="relative bg-gray-900 h-[180px] -z-10">
          <img
            src={slide1}
            alt="Page Title Background"
            className="w-full h-full object-cover bg-black opacity-40"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative max-w-7xl mx-auto px-4 py-16 text-white text-center md:text-left relative bottom-48">
            <div className="border-l-4 border-yellow-600 p-2">
              <h1 className="lg:text-5xl text-xl font-bold mb-4">Career Policy</h1>
              <div className="flex items-center space-x-2">
                <span>Home</span>
                <FaGreaterThan className="h-3 w-3" />
                <span>Career Policy</span>
              </div>
            </div>
          </div>
        </div>
    
      <div className="max-w-7xl mx-auto px-4 py-16 space-y-8">
        <section className="space-y-4">
          <p data-aos="zoom-in-up" className="text-md text-gray-600">
            The evolution of IT continues to provide new challenges and opportunities – that’s what we thrive on. Our business is enjoying considerable success and we are actively recruiting to support the growth of our international operations.
          </p>
          <p data-aos="zoom-in-up" className="text-md text-gray-600">
            We are looking for individuals in a number of key areas and we would be delighted to receive an application from you.
          </p>
          <p data-aos="zoom-in-up" className="text-md text-gray-600">
            Mail to: <EmailLink email="hr@pixalivetech.com" /> or{" "}
            <EmailLink email="pixalivetech@gmail.com" text="Click here" /> to submit your resume.
          </p>
          <p data-aos="zoom-in-up" className="text-md text-gray-600">
            <EmailLink email="pixalivetech@gmail.com" text="Click here" /> for our latest job openings.
          </p>
        </section>
      </div>
      <div className="relative -z-50"> <Footer  /></div>
    </div>
  );
};

export default Policy;
