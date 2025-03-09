import React from "react";
import { FaGreaterThan } from "react-icons/fa";
import Header from "../../Components/header";
import MainHeader from "../../Components/mainheader";
import Footer from "../../Components/footer";
import slide1 from "../../Assests/Images/pagetitle_bg.jpg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSingleService } from "../../Api/services";
import { useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
// const Services = {
//     title: "Mobile Application Development",
//     introduction: [
//         "Mobility is the call of the market and when it comes to applications, enterprises, budding businesses, and startups all want to be IN-THE-RACE with an app. L-IT Truly Services avail highly chiseled and feature-rich Mobile Application development services which will entertain and leave you spell-bound asking for more.",
//         "Our rich experiences in app development, promises a kick-start to your business with our tech-geniuses and comprehensive life cycle management processes. We develop elegant and user-friendly mobile apps which can be used by a non-techie! Mobile apps development includes:"
//     ],
//     expertiseTitle: "Our Expertise in Mobile Application Development",
//     expertiseList: [
//         { platform: "iOS (iPhone/iPad)", technologies: "iPhone SDK, Xcode, Objective-C" },
//         { platform: "Android", technologies: "Eclipse, Android SDK, Android Native Development, Java" },
//         { platform: "Windows Mobile", technologies: "MS Visual Studio, .NET Compact Framework, Visual Basic, C#" },
//         { platform: "Blackberry", technologies: "Eclipse, BlackBerry Theme Studio, Java ME, BlackBerry SDK" }
//     ],
//     callToAction: {
//         text: "If you are looking for the right company to outsource, we are the best in the market.",
//         linkText: "Let’s talk.",
//     }
// };

const Services = () => {

    const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const [Services, setServices] = useState(null);


  useEffect(() => {
    fetchServicesDetails();
  }, []);

  const fetchServicesDetails = async () => {
    try {
      const data = await getSingleService(id);
      setServices(data?.data?.result);
      console.log(id,data);
    } catch (error) {
      console.log("Error fetching Services details", error);
    }
  };

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

            {/* Hero Section */}
            <div className="relative bg-gray-900 h-[180px] -z-10">
                <img src={slide1} alt="Mobile App Development" className="w-full h-full object-cover bg-black opacity-40" />
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative max-w-7xl mx-auto px-4 py-16 text-white text-center md:text-left bottom-48">
                    <div className="border-l-4 border-yellow-600 p-2">
                        <h1 className="lg:text-5xl text-xl font-bold mb-4">{Services?.title}</h1>
                        <div className="flex items-center space-x-2">
                            <span>Home</span>
                            <FaGreaterThan className="h-3 w-3" />
                            <span>{Services?.title}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                
                {/* Introduction Section */}
                <section data-aos="zoom-in-up" className="mb-8">
                    {Services?.introduction.map((paragraph, index) => (
                        <p key={index} className="text-lg text-gray-700 mb-4">{paragraph}</p>
                    ))}
                </section>

                {/* Expertise Section */}
                <section data-aos="zoom-in-up" className="mb-8">
                    <h1 className="text-3xl font-bold text-start mb-8">{Services?.expertiseTitle}</h1>
                </section>

                {/* Expertise Table */}
                <section data-aos="zoom-in-up">
                    <table className="table-auto w-full border border-gray-300">
                        <tbody>
                            {Services?.expertiseList.map((expertise, index) => (
                                <tr key={index} className="border-b border-gray-300">
                                    <td className="p-4 font-medium">{expertise?.platform}</td>
                                    <td className="p-4 border-l">{expertise?.technologies}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

                {/* Call to Action */}
                <section data-aos="zoom-in-up" className="text-center mt-8">
                    <p className="text-lg text-gray-700">
                        {Services?.callToAction?.text}
                        <Link to="/" className="text-blue-500 font-medium ml-1 hover:underline">
                            {Services?.callToAction?.linkText}
                        </Link>
                    </p>
                </section>
            </div>

            <div className="relative -z-50"> <Footer  /></div>
        </div>
    );
};

export default Services;
