import react,{ useEffect, useState }  from "react";
import slide1 from "../../Assests/Images/pagetitle_bg.jpg";
import {FaGreaterThan} from "react-icons/fa";
import Header from "../../Components/header";
import MainHeader from "../../Components/mainheader";
import Footer from "../../Components/footer";
import logo from "../../Assests/Images/stock-market.png";
import { getClients } from "../../Api/ourClients";
import AOS from "aos";
import "aos/dist/aos.css";
const Client = () => {
  const[partners, setPartners] = useState([]);
  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
   
    try {
      const res = await getClients();
      setPartners(res?.data?.result || []);
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
             <div className="relative bg-gray-900 h-[180px] -z-10 ">
      <img src={slide1} alt={slide1} className="w-full h-full  object-cover bg-black opacity-40 " />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 text-white text-center md:text-left relative bottom-48  ">
        <div className="border-l-4 border-yellow-600 p-2">
          <h1 className="lg:text-5xl text-xl font-bold mb-4">Our Clients</h1>
          <div className="flex items-center space-x-2">
              <span>Home</span>
              <FaGreaterThan className="h-3 w-3" />
              <span>Our Clients</span>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-16">
      <h2 data-aos="zoom-in-up" className="text-lg font-semibold text-center mb-8 text-gray-700">
        Together with our professional partners we provide our clients with the ultimate service, budgeting, scalability, and innovation for their needs.
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-center">
        {partners.map((partner, index) => (
          <div data-aos="flip-left" key={index} className="flex flex-col items-center">
            <img
              src={partner.logo}
              alt={partner.name}
              className="h-20 w-20 object-contain"
            />
            <p className="text-center text-sm mt-2 text-gray-700">{partner.name}</p>
          </div>
        ))}
      </div>
    </div>
    <div className="relative -z-50"> <Footer  /></div>
        </div>
    );
};

export default Client;