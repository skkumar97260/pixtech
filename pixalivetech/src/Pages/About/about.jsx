import React, { useEffect } from "react";
import Header from "../../Components/header";
import MainHeader from "../../Components/mainheader";
import Footer from "../../Components/footer";
import slide1 from "../../Assests/Images/pagetitle_bg.jpg";
import {FaGreaterThan} from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
const About = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false, // Animation plays every time it enters the viewport
      mirror: true, // Animation also plays when scrolling back up
    });
  }, []);
    return (
        <div>
            <div className="relative z-50">
                <Header />
                <MainHeader />
            </div>
            <div>
     
      <div className="relative bg-gray-900 h-[180px] -z-10 ">
      <img src={slide1} alt={slide1} className="w-full h-full  object-cover bg-black opacity-40 " />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 text-white text-center md:text-left relative bottom-48  ">
        <div className="border-l-4 border-yellow-600 p-2">
          <h1 className="lg:text-5xl text-xl font-bold mb-4">About</h1>
          <div className="flex items-center space-x-2">
              <span>Home</span>
              <FaGreaterThan className="h-3 w-3" />
              <span>About</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 space-y-8">
     
        <section>
          <p data-aos="zoom-in-up" className="text-lg text-gray-700">
            PIXALIVE TECHNOLOGY SERVICES is one of the India’s fastest growing Software
            Development Company. PIXALIVE TECHNOLOGY SERVICES Services is headquartered in
            Bangalore, India and Collaborative business operations in USA &
            Malaysia.
          </p>
          <p data-aos="zoom-in-up" className="text-lg text-gray-700 mt-4">
            PIXALIVE TECHNOLOGY SERVICES works with leading Global firms in the Financial
            Services, Technology, Mobile Communications & Media, Airport
            Solutions, Manufacturing, and Retail domains by engaging the
            customer in a ‘collaborative’ manner, by being consultative and by
            offering domain-specific solutions.
          </p>
          <p data-aos="zoom-in-up" className="text-lg text-gray-700 mt-4">
            PIXALIVE TECHNOLOGY SERVICES delivers highly responsive and innovative
            solutions that bridge our client’s Execution. We enable business
            transformation for our customers through the innovative use of
            technology. PIXALIVE TECHNOLOGY SERVICES ’ relationship with clients is based
            on a philosophy of shared values and goals. Flexible business
            models encourage relationships that can grow and last. Innovation &
            Excellence through quality is not just a motto – it is the
            foundation on which PIXALIVE TECHNOLOGY SERVICES  is built.
          </p>
        </section>

        {/* Mission Section */}
        <section data-aos="zoom-in-up">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>We help our clients meet their business needs.</li>
            <li>Use cutting-edge state-of-the-art technologies in our products.</li>
            <li>
              Provide continuous robust support for our products post-launch.
            </li>
            <li>
              Transparency and speed at the heart of our communication with our
              clients.
            </li>
          </ul>
        </section>

        {/* Vision Section */}
        <section data-aos="zoom-in-up">
          <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
          <p className="text-lg text-gray-700">
            Our vision is to help companies improve & achieve success through
            revenue increase, cost management & customer satisfaction.
          </p>
          <p className="text-lg text-gray-700 mt-4">
            To have impeccable integrity in all our business practices with our
            customers, our suppliers, our employees, our investors, and the
            communities we work in. This means being truthful and honest at all
            times in every situation.
          </p>
        </section>
      </div>
    </div>
    <div className="relative -z-50"> <Footer  /></div>
        </div>
    )
};

export default About;