import React,{useEffect, useState} from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "../../Components/header";
import MainHeader from "../../Components/mainheader";
import Footer from "../../Components/footer";
import bgImage from "../../Assests/Images/pagetitle_bg.jpg";
import { FaGreaterThan } from "react-icons/fa";
import slide1 from "../../Assests/Images/pagetitle_bg.jpg";
import {getSingleDeveloper} from "../../Api/hireDevelopers"
import { getClients } from "../../Api/ourClients";
import AOS from "aos";
import "aos/dist/aos.css";
// const content = {
//   role: "Java Developer",
//   title: "Develop Enterprise Portals Using Opensource JAVA Language",
//   introduction: `
//     Java has matured in over the years, for the last 20 years it has gained the reputation of a language which is very secure, relatively fast, and robust,
//     and most importantly which made Java famous is platform independence.

//     Today most critical applications are designed and built on Java, though its popularity has diminished slightly in the last decade because of
//     the emergence of other programming languages. However, Java rules the roost in the enterprise domain, especially in banking and other critical
//     applications and Java web development.
//   `,
//   highlights: [
//     "According to Oracle, more than 3 billion devices and 97% of enterprise desktop computers are powered by Java.",
//     "Google has chosen Java as its Android app development language because of its performance, security, better memory management, and automatic garbage collection.",
//     "Proven capabilities and expertise in Java software and Java web applications development.",
//     "Necessary documentation, testing, and quality analysis.",
//     "Project Methodologies – Agile Software Development, Waterfall Model.",
//     "A single-step solution for development and maintenance for Java applications and web-based projects.",
//   ],
//   services: {
//     title: "Java Application Development Solutions",
//     description: `
//       Our dedicated Java developers build Java applications that are highly productive, secure, and stable to handle large amounts of traffic.
//     `,
//     items: [
//       "Java Web Development",
//       "Java Web Portals",
//       "Java-based Web Services",
//       "B2B Integration (SOAP, REST)",
//       "Mobile App Development for Android",
//       "Product Development",
//       "Enterprise Solutions",
//       "Java-based eCommerce Development",
//     ],
//   },
//   whyUs: {
//     title: "Why hire Java Developers from L-IT Solutions?",
//     description: `
//       PIXALIVE TECHNOLOGY SERVICES provides highly qualified developers with flexible engagement models in the market.
//       We provide a minimum of 3 years of experience developers.
//     `,
//   },
//   hiringModels: {
//     title: "Our Hiring Models",
//     options: [
//       {
//         name: "Retainer",
//         description: `
//           For large and longer-term projects, we recommend going with the retainer hiring model. 
//           The billing for the retainer model is the last week of every month invoiced to the client. 
//           The no. of hours of retainer model is monthly 160-180 hours. Additional hours will be charged as per agreed rate/hour.
//         `,
//       },
//       {
//         name: "Hourly",
//         description: `
//           For short-term projects or maintenance, projects will be the most suitable model. 
//           The billing for hourly models is the time spent by the developers on the project.
//         `,
//       },
//       {
//         name: "Fixed Cost",
//         description: `
//           Our business analyst will analyze the requirement and provide the fixed cost for the project. 
//           This is most suitable for one-time development and handover. The cost will be based on the requirement of the project.
//         `,
//       },
//     ],
//     conclusion: `
//       If you are looking for the right company to hire developers, we are the best in the market. Why wait? Let's talk.
//     `,
//   },
// };

const HireJavaDevelopers = () => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const[developer,setDevelopers]=useState([])
  useEffect(() => {
    fetchDevelopers();
  }, []);

  const fetchDevelopers = async () => {

    try {
      const res = await getSingleDeveloper(id);
      setDevelopers(res?.data?.result || []);
    } catch (error) {
      console.log("Error fetching Developers", error);
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

          {/* Page Banner */}
          <div className="relative bg-white relative bg-gray-900 h-[180px] -z-10">
          <img
            src={slide1}
            alt="Rental Service"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative max-w-7xl mx-auto px-4 py-16 text-white text-center md:text-left bottom-48">
            <div className="border-l-4 border-yellow-600 p-2">
              <h1 className="lg:text-5xl text-xl font-bold mb-4">
                {developer.role}
              </h1>
              <div className="flex items-center space-x-2">
                <span>Home</span>
                <FaGreaterThan className="h-3 w-3" />
                <span>{developer.role}</span>
              </div>
            </div>
          </div>
        </div>
          

        <div className="p-6 lg:p-20">

<div className="text-start mb-10">
    <h1 data-aos="zoom-in-up" className="text-3xl font-bold text-yellow-600">{developer.title}</h1>
</div>

{/* Introduction */}
<p data-aos="zoom-in-up" className="text-gray-700 mb-6">{developer.introduction}</p>

{/* Highlights */}
{developer?.highlights?.length > 0 && (
<div className="mb-10">
    <h2 data-aos="zoom-in-up" className="text-xl font-bold text-yellow-600 mb-4">
        Highlights
    </h2>
    <ul data-aos="zoom-in-up" className="list-disc pl-5 space-y-2 text-gray-700">
        {developer.highlights.map((item, index) => (
            <li key={index} data-aos="zoom-in-up">{item}</li>
        ))}
    </ul>
</div>
)}
{/* Services */}
{developer?.services && (
<div className="mb-10">
    <h2  className="text-xl font-bold text-yellow-600 mb-4">
        {developer.services.title}
    </h2>
    <p data-aos="zoom-in-up" className="text-gray-700 mb-4">{developer.services.description}</p>
    <ul data-aos="zoom-in-up" className="list-disc pl-5 space-y-2 text-gray-700">
        {developer.services.items.map((item, index) => (
            <li key={index} data-aos="zoom-in-up">{item}</li>
        ))}
    </ul>
</div>
  )}
{/* Why Us */}
{developer?.whyUs && (
<div  className="mb-10">
    <h2 data-aos="zoom-in-up" className="text-xl font-bold text-yellow-600 mb-4">
        {developer.whyUs.title}
    </h2>
    <p data-aos="zoom-in-up" className="text-gray-700">{developer.whyUs.description}</p>
</div>
 )}
{/* Hiring Models */}
{developer?.hiringModels && (
          <div className="mb-10">
            <h2  className="text-xl font-bold text-yellow-600 mb-4">{developer.hiringModels.title || "Hiring Models"}</h2>
            {developer.hiringModels.options?.length > 0 ? (
              developer.hiringModels.options.map((model, index) => (
                <div key={index} className="mb-6">
                  <h3 data-aos="zoom-in-up" className="text-lg font-bold text-gray-800">{model.name}</h3>
                  <p data-aos="zoom-in-up" className="text-gray-700">{model.description}</p>
                </div>
              ))
            ) : (
              <p data-aos="zoom-in-up" className="text-gray-600">No hiring models available.</p>
            )}
            <p data-aos="zoom-in-up" className="text-gray-700">{developer.hiringModels.conclusion || ""}</p>
          </div>
        )}

</div>

<div className="relative -z-50"> <Footer  /></div>
    </div>
  );
};

export default HireJavaDevelopers;
