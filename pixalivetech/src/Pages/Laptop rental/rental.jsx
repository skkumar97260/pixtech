import React,{useEffect, useState} from "react";
import { getLaptops } from "../../Api/laptopRental"; 
import Header from "../../Components/header";
import MainHeader from "../../Components/mainheader";
import Footer from "../../Components/footer";
import lap1 from "../../Assests/Images/normal_laptop.jpeg";
import lap2 from "../../Assests/Images/Gaming_laptop.jpeg";
import lap3 from "../../Assests/Images/Bussiness_laptop.jpeg";
import slide1 from "../../Assests/Images/pagetitle_bg.jpg";
import { FaGreaterThan } from "react-icons/fa";
import {Link}  from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
const Rental = () => {
  const [laptops, setLaptops] = useState([]);
  useEffect(() => {
    fetchLaptops();
  }, []);

  const fetchLaptops = async () => {
   
    try {
      const res = await getLaptops();
      setLaptops(res?.data?.result || []);
      console.log("res",res?.data?.result);
    } catch (error) {
      console.log("Error fetching clients", error);
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
  
        {/* Page Header with Background */}
        
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
                Laptop Rental Services
              </h1>
              <div className="flex items-center space-x-2">
                <span>Home</span>
                <FaGreaterThan className="h-3 w-3" />
                <span>Laptop Rental Services</span>
              </div>
            </div>
          </div>
        </div>

        {/* Introduction Section */}
        <div className="text-center mt-10">
          <h1  data-aos="zoom-in-up" className="text-3xl lg:text-4xl font-bold text-yellow-600">
            Laptop Rental Services
          </h1>
          <p data-aos="zoom-in-up" className="text-gray-700 mt-3">
            Rent high-quality laptops for your business, events, or personal needs.
          </p>
        </div>

        {/* Rental Options Section */}
        <div className="mt-10 grid gap-8 lg:grid-cols-3 sm:grid-cols-2">
        {laptops.map((laptop, index) => (
            <div
              key={index}
              className="bg-white shadow-sm rounded-xl p-2 m-5 text-center border border-gray-300"
              data-aos="flip-left"
            >
              <img
                src={laptop.img}
                alt={laptop.title}
                className="w-full h-40 object-contain rounded-md"
              />
              <h2 className="text-xl font-bold mt-4">{laptop.title}</h2>
              <p className="text-gray-600 mt-2">{laptop.desc}</p>
              <p className="text-yellow-600 font-semibold mt-2">{laptop.price}</p>
              <Link to="/Contact-us">
                <button className="mt-4 bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-950">
                  Rent Now
                </button>
              </Link>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div data-aos="zoom-in-up" className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-800">Need Bulk Rentals?</h2>
          <p className="text-gray-600 mt-2">
            Contact us for special discounts and bulk orders.
          </p>
          <Link to="/Contact-us">
            <button className="mt-4 bg-[#4338CA] text-white px-6 py-2 rounded-lg transition duration-300 hover:bg-yellow-600">
              Contact Us
            </button>
          </Link>
        </div>
        
        <div className="relative -z-50"> <Footer  /></div>
    </div>
  );
};

export default Rental;
