import React,{useEffect,useState} from "react";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { TiWorld } from "react-icons/ti";
import { RxFileText } from "react-icons/rx";
import { getServices } from "../Api/services";
import { getDevelopers } from "../Api/hireDevelopers";
import {Link} from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
const Footer = () => {
          const [services, setServices] = useState([]);
          useEffect(() => {
              getservices();
          },[])
          const getservices = async() => {
          try {
              const res = await getServices();
              setServices(res?.data?.result || []);
              console.log("res",res)
          } catch (error) {
              console.log("error",error);
          }
          }
          useEffect(() => {
              fetchDevelopers();
            }, []);
            const [developers, setDevelopers] = useState([]);
            const fetchDevelopers = async () => {
          
              try {
                const res = await getDevelopers();
                setDevelopers(res?.data?.result || []);
              } catch (error) {
                console.log("Error fetching Developers", error);
              }
            };

            useEffect(() => {
              AOS.init({
                duration: 1000, // Animation duration in milliseconds
                easing: "ease-in-out", // Smooth easing effect
                once: false, // Animation runs only once
                mirror: true,
              });
            }, []);
  return (
    <>
      {/* Card Section */}
      <div className="relative bg-[#13256B] lg:bg-transparent z-10">
        <div className="container mx-auto px-4 lg:px-20 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Coworking Space Card */}
                   {/* Coworking Space Card */}
                   <div  data-aos="fade-right" className="relative top-[50px] bg-white shadow-lg p-6 flex gap-4 items-center rounded-lg">
            {/* Background Shadow Effect */}
            <div className="absolute left-4 top-[-12px] right-4 bottom-[-12px] bg-gray-300 opacity-40 rotate-3 rounded-lg -z-10"></div>

            <div className="text-red-500 text-3xl z-10"><TiWorld className="h-14 w-14 text-yellow-600 hover:text-[#13256B]"/></div>
            <div className="z-10">
              <h3 className="text-lg font-bold text-gray-700">Coworking Space in Bangalore</h3>
              <p className="text-sm text-gray-500">
                Own an Office Space for you and your team in Bangalore.
              </p>
            </div>
          </div>

          {/* Career Opportunities Card */}
          <div  data-aos="fade-left" className="relative top-[50px] bg-white shadow-lg p-6 flex gap-4 items-center rounded-lg">
            {/* Background Shadow Effect */}
            <div className="absolute left-4 top-[-12px] right-4 bottom-[-12px] bg-gray-300 opacity-40 rotate-3 rounded-lg -z-10"></div>

            <div className="text-red-500 text-3xl z-10"><RxFileText className="h-14 w-14 text-yellow-600 hover:text-[#13256B]"/></div>
            <div className="z-10">
              <h3 className="text-lg font-bold text-gray-700">Career Opportunities</h3>
              <p className="text-sm text-gray-500">
                Build a career that suits your lifestyle, in a company where your voice matters.
              </p>
            </div>
          </div>
        
        </div>
      </div>

      {/* Footer Section */}
      <div data-aos="fade-down" className="w-full bg-[#13256B] text-white py-10 pt-20 relative z-0">
        
        <div className="container mx-auto px-4 lg:px-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Us */}
          <div  data-aos="fade-up">
            <h2 className="text-lg font-bold text-yellow-500 mb-4">About Us</h2>
            <p className="text-sm leading-relaxed text-white">
              PIXALIVE TECHNOLOGY SERVICES is a provider of IT consulting and software services. We help
              organizations and software companies improve their business performance.
            </p>
            <div className="flex mt-4 gap-4">
              <a
                href="https://www.facebook.com/pixalive.app"
                className="h-8 w-8 flex items-center justify-center bg-yellow-600 rounded-full hover:bg-white hover:text-yellow-600 transition"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://www.linkedin.com/company/pixalive/"
                className="h-8 w-8 flex items-center justify-center bg-yellow-600 rounded-full hover:bg-white hover:text-yellow-600 transition"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Our Services */}
          <div  data-aos="fade-up">
            <h2 className="text-lg font-bold text-yellow-500 mb-4">Our Services</h2>
            <ul className="space-y-2 text-sm text-white">
            {services?.map((ser) => (
  <Link
    key={ser._id}
    to={{
      pathname: "/services",
      search: `?id=${ser?._id}`,
    }}
    className="block"
  >
    <li className="relative pl-4 hover:text-yellow-600 hover:before:content-['■'] hover:before:absolute hover:before:left-0 hover:before:text-yellow-600">
      {ser?.title}
    </li>
  </Link>
))}
            </ul>
          </div>

          {/* Hire Developers */}
          <div  data-aos="fade-up">
            <h2 className="text-lg font-bold text-yellow-500 mb-4">Hire Developers</h2>
            <ul className="space-y-2 text-sm text-white">
            {developers?.map((dev) => (
  <Link
    key={dev._id}
    to={{
      pathname: "/Hire-Developers",
      search: `?id=${dev?._id}`,
    }}
    className="block"
  >
    <li className="relative pl-4 hover:text-yellow-600 hover:before:content-['■'] hover:before:absolute hover:before:left-0 hover:before:text-yellow-600">
      {dev?.role}
    </li>
  </Link>
))}

             
              
            </ul>
          </div>

          {/* Newsletter */}
          <div  data-aos="fade-up">
            <h2 className="text-lg font-bold text-yellow-500 mb-4">Newsletter</h2>
            <p className="text-sm leading-relaxed text-white">
            Want to be notified of the latest PIXALIVE TECHNOLOGY SERVICES news right away? We are happy to provide you with new information regularly.
            </p>
            
          </div>
        </div>

        {/* Copyright */}
        <div   className="flex  justify-center mt-10 text-center text-sm  lg:mx-52  ">
          <p className="text-white bg-yellow-600 p-3 shadow-md rounded-sm w-[50%] ">Copyright © 2025 PIXALIVE TECH SERVICES</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
