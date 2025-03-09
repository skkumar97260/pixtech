import React, { useState, useRef,useEffect } from "react";
import Header from "../../Components/header";
import MainHeader from "../../Components/mainheader";
import Footer from "../../Components/footer";
import slide1 from "../../Assests/Images/slider_one01.jpg";
import slide2 from "../../Assests/Images/slider_one02.jpg";
import slide3 from "../../Assests/Images/slider_one03.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../App.css";
import {VscGraph} from "react-icons/vsc";
import {GoGraph} from "react-icons/go";
import {FaLightbulb} from "react-icons/fa";
import {  FaMobileAlt, FaChartLine } from "react-icons/fa";
import con1 from "../../Assests/Images/CON1.png";
import con2 from "../../Assests/Images/CON2.png";
import con3 from "../../Assests/Images/CON3.jpg";
import monitor from "../../Assests/Images/monitoring.png";
import stockmorket from "../../Assests/Images/stock-market.png";
import analytics from "../../Assests/Images/analytics.png";
import pagetitle_bg from "../../Assests/Images/pagetitle_bg.jpg";
import AOS from "aos";
import "aos/dist/aos.css";
const carouselItems = [
  {
    content: "/ We Are Here /",
    image: slide1,
    title: (
      <div className="text-left">
        Software Development from <span className="text-yellow-500">Conception to Delivery</span>
      </div>
    ),
    description: "We create and build flexible & creative design in your budget.",
    button: "Contact Us",
    justify: "justify-start",
    align: "items-start",
  },
  {
    content: "/ We Are Here /",
    image: slide2,
    title: (
      <div className="text-center">
        Co-working Space in <span className="text-yellow-500">Bangalore</span>
      </div>
    ),
    description: "Join Bangalore’s largest business and growing coworking community.",
    button: "Book Now",
    justify: "justify-center",
    align: "items-center",
  },
  {
    content: "/ We Are Here /",
    image: slide3,
    title: (
      <div className="text-right">
        Software Development from <span className="text-yellow-500">Conception to Delivery</span>
      </div>
    ),
    description: "PIXALIVE TECHNOLOGY SERVICES is Providing Software Development resources on contract to clients across India.",
    button: "Contact Us",
    justify: "justify-end",
    align: "items-end",
  }
];

const services = [
  {
    image:con1,
    title: "IT CONSULTANCY SERVICES",
    description:
      "L-IT Truly Services has achieved many milestones while providing IT Consulting Services to clients. The ability to render service as per client requirement has made us a favored and proven company in India.",
    icon:monitor , 
  },
  {
    image:con2,
    title: "PRODUCT DEVELOPMENT",
    description:
      "Whether you are a small startup or an established company, to bring any new product to the market or develop existing ones, you need a structured and efficient planning that minimizes risks.",
    icon:analytics, 
  },
  {
    image:con3,
    title: "MOBILE APP DEVELOPMENT",
    description:
      "Smartphones are where consumers connect to the business they need. In today's instant world, it is important that businesses catch up to consumers changing demands and establish visibility.",
    icon:stockmorket , 
  },
];

const Home = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRef = useRef(null);
 const [activeItem, setActiveItem] = useState("");
  const settings = {
    dots: false, // Disable default slick dots
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    beforeChange: (current, next) => setActiveSlide(next), // Track active slide
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
            </div>{/* Apply a high z-index to the MainHeader */}

      {/* Slider Container with lower z-index */}
      <div className="relative w-full -z-10"> 
        <Slider ref={sliderRef} {...settings}>
          {carouselItems.map((item, index) => (
            <div key={index} className="relative h-[600px] w-full">
              <img src={item.image} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
              
              {/* Overlay Content */}
              <div className={`absolute inset-0 bg-black bg-opacity-50 flex ${item.justify} items-center  text-white p-6`}>
                <div className={`text-left max-w-lg flex flex-col ${item.justify} ${item.align} ` }>
                  <h4 className="font-thin mb-2">{item.content}</h4>
                  <h1 className="lg:text-5xl text-xl font-extrabold mb-4">{item.title}</h1>
                  <p className="text-lg mb-4">{item.description}</p>

                  {/* Button Below the Text */}
                  <div className="relative overflow-hidden w-40" >
                    <div className="relative bg-yellow-600 text-white font-semibold py-2 px-8 rounded-lg cursor-pointer">
                      {item.button}
                    </div>
                    <div className="absolute -right-5 top-1/2 -translate-y-1/2 w-12 h-12 bg-indigo-600 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>

        {/* Custom Radio Buttons for Manual Navigation */}
        <div className="absolute bottom-20 lg:bottom-24 left-1/2 transform -translate-x-1/2 flex justify-center items-center mt-6 z-20">
          {carouselItems.map((_, i) => (
            <input
              key={i}
              type="radio"
              name="carousel-dot"
              checked={activeSlide === i}
              onChange={() => sliderRef.current.slickGoTo(i)} // Move slider when clicked
              className="w-4 h-4 mx-2 appearance-none border border-gray-400 rounded-full checked:bg-yellow-600 transition-all duration-300 cursor-pointer"
            />
          ))}
        </div>
      </div>

    <div data-aos="flip-up" className=" relative bottom-16 flex flex-col md:flex-row justify-center items-center bg-[#0E1320] p-10 gap-5 lg:mx-52 rounded-lg">

      <div className="flex-1 bg-[#0E1320] text-white p-6  border-r-2 border-dashed border-gray-700">
        <div className="flex items-center justify-center mb-4">
        <div className="hover:bg-yellow-950 p-4 rounded-full border-4 hover:border-white ">
            <FaLightbulb className="w-16 h-16 text-white "/>
          </div>
        </div>
        <h3 className="text-lg font-semibold">IT Staffing</h3>
        <p className="text-gray-400 mt-2 text-sm">Dedicated Full-time Staffing, Temporary IT Staffing, Field Service Technicians, On-Demand IT Staffing, Remote IT Staffing</p>
      </div>
      

      <div className="flex-1 bg-[#0E1320] text-white p-6  border-r-2 border-dashed border-gray-700">
        <div className="flex items-center justify-center mb-4">
        <div className="hover:bg-yellow-950 p-4 rounded-full border-4 hover:border-white">
            <VscGraph className="w-16 h-16 text-white"/>
          </div>
        </div>
        <h3 className="text-lg font-semibold">IT Infrastructure Management</h3>
        <p className="text-gray-400 mt-2 text-sm">LAN/WLAN Management, Systems Management, Cloud Services and Migration</p>
      </div>
      

      <div className="flex-1 bg-[#0E1320] text-white p-6  border-r-2 border-dashed border-gray-700">
        <div className="flex items-center justify-center mb-4">
          <div className="hover:bg-yellow-950 p-4 rounded-full border-4 hover:border-white">
           <GoGraph className="w-16 h-16 text-white"/>
          </div>
        </div>
        <h3 className="text-lg font-semibold">Digital Workplace</h3>
        <p className="text-gray-400 mt-2 text-sm">End User Computing, 24/7 Service Desk, VIP Support, Work From Home Support, Windows Roll/Out</p>
      </div>
    </div>
    <div className=" flex flex-col justify-center items-center gap-4 mb-40">
    <div data-aos="fade-up" className="text-yellow-600 text-center">/ Services /</div>
    <h1 data-aos="fade-up" className="text-4xl font-bold text-black text-center">Here is what we provide</h1>
    <div data-aos="fade-up" className="text-gray-500 text-center ">Best Out Sourcing, IT Staffing and Software Development Company in India</div>
    <div className="flex felx-col lg:flex-row">
    <div data-aos="fade-up" className="flex flex-col md:flex-row gap-6 p-6 bg-gray-100 justify-center">
      {services.map((service, index) => (
        <div key={index} className="p-6 bg-white rounded-2xl shadow-md max-w-sm ">
        <div className="relative hover:top-10">
        <div className="flex h-60 w-full items-center justify-center hover:bg-gray-100 hover:opacity-40">
        <img src={service.image} alt={service.title}  className="w-full h-full object-contain"/>
        </div>
        <div className=" relative bg-white shadow-lg rounded-lg flex  justify-center items-center relative bottom-20 left-60 h-16 w-16 border-b-8 border-yellow-600">
          <img className="" src={service.icon} alt={service.icon} ></img>
          </div>
          </div>
          <h3 className="text-xl font-bold text-center mb-2">{service.title}</h3>
          <div className="text-gray-600 text-center">
            {service.description}
          </div>
        </div>
      ))}
    </div>
    </div>
   
   
    </div>

    <div className="bg-gray-100 p-6 gap-5 ">
      {/* Banner Section */}
      <div className="bg-yellow-600 text-white text-center h-40 rounded-lg mb-6 relative bottom-16 lg:mx-52 overflow-hidden">

      <img src={slide1} alt={slide1} className="w-full h-full  object-cover bg-yellow-600 opacity-40" />
      <div className="absolute -right-9 lg:-right-7 top-1/2 -translate-y-1/2 lg:w-60 lg:h-60 w-48 h-48 bg-black rounded-full"></div>
      <div className=" flex justify-between">
        <h2 className=" relative  lg:bottom-28 bottom-28 lg:pl-4 lg:text-3xl text-sm font-bold flex   lg:w-3/5 ">Leave us your phone number. We will call you back.</h2>
        <div className="relative lg:bottom-28 bottom-16 right-8 flex justify-center items-center overflow-hidden ">
        {/* <button className="absolute top-4 right-4 bg-white text-black px-4 py-2 rounded-lg">Contact Us</button> */}
        <div className="relative bg-yellow-600 text-white font-semibold lg:py-3 lg:px-8 py-2 px-4  w-52 lg:w-40 lg:w-0  rounded-lg cursor-pointer">
                      Contact Us
                    </div>
                    <div className="absolute -right-5 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#13256B] rounded-full"></div>
        </div>
        </div>
      </div>
      
      {/* Content Section */}
      <div data-aos="flip-left" className="grid md:grid-cols-2 gap-6 lg:mx-52   ">
        {/* Consulting Section */}
        <div className="bg-gray p-6 rounded-lg border border-gray-200">
          <h3 className="text-yellow-600 font-semibold mb-2">/ Consulting /</h3>
          <h2 className="text-3xl font-bold mb-2">We provide quality of resources to clients</h2>
          <p className="text-gray-700 mb-4">
            Strong Requirement Team, Expert in Temp Staffing, Domain experience of over 16 years,
            Immediate Joining, Experienced Developers in multiple technologies.
          </p>
          <div className="flex items-center bg-gray-100 p-4 rounded-lg">
            <div className=" border-b-4 border-yellow-600 p-3 rounded-lg mr-4">
              <span className="text-white text-2xl">💼</span>
            </div>
            <div>
              <p className="font-semibold">Talk to us</p>
              <div className="flex">
              <span className="text-gray-500 text-sm font-thin ">Mobile No:</span>
              <span className="text-yellow-600 text-sm font-bold ">(+91) 8778584566</span></div>
            </div>
          </div>
        </div>

        {/* Process Section */}
        <div data-aos="flip-right" className="bg-gray  p-6 rounded-lg border border-gray-200 ">
          <h3 className="text-yellow-600 font-semibold mb-2">/ Our Process /</h3>
          <h2 className="text-3xl font-bold mb-2">We follow the process as committed to clients</h2>
          <p className="text-gray-700 mb-4">
            Send Us Your Detailed Project Requirements, Select Candidates For Screening Process,
            Take Interview Of Selected Candidates, Initiate Project On-Boarding.
          </p>
          
          <div className="bg-black text-white   rounded-lg h-24 ">
          <img src={pagetitle_bg} alt={pagetitle_bg} className="w-full h-full  object-cover bg-black opacity-40 " />
          
            <h6 className=" relative  lg:bottom-16 bottom-16 pl-2 lg:pl-4 lg:text-md text-xs font-medium flex    w-1/2">Get an Easy Quotation for Your Own Business.</h6>
            <div className="relative lg:bottom-24 bottom-24 right-8 flex justify-center items-center overflow-hidden ">
        
        <div className="relative  justify-center items-center -right-40 bg-yellow-600 text-white font-semibold lg:py-2 lg:px-4 py-2 px-2  w-60 lg:w-32 lg:w-0  rounded-lg cursor-pointer">
                      Send Us
                    </div>
                    <div className="absolute -right-5 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#13256B] rounded-full"></div>
        </div>
          </div>
        </div>
      </div>
    </div>
    <div className="relative -z-50"> <Footer  /></div>
    </div>
  );
};

export default Home;
