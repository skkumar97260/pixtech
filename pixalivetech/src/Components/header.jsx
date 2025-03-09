import React, { useEffect, useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { MdEmail, MdAccessTimeFilled } from "react-icons/md";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa6";
import { IoMdArrowDropdown } from "react-icons/io"; // Icon for dropdown button
import AOS from "aos";
import "aos/dist/aos.css";
const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        AOS.init({
          duration: 1000,
          easing: "ease-in-out",
          once: false, // Animation plays every time it enters the viewport
          mirror: true, // Animation also plays when scrolling back up
        });
      }, []);
    return (
        <div className="w-full bg-[#13256B] text-white">
            {/* Mobile Button */}
            <div className="lg:hidden flex justify-center py-2">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md hover:bg-pink-700 transition"
                >
                    Click to Open <IoMdArrowDropdown className="h-5 w-5" />
                </button>
            </div>

            {/* Main Header Content */}
            <div className={`flex flex-col lg:flex-row items-center justify-center lg:justify-between px-6 lg:px-52 gap-6  transition-all duration-300 ${isOpen ? "block" : "hidden"} lg:flex`}>

                <div  data-aos="fade-left" className="flex flex-col lg:flex-row gap-4 text-center lg:text-left  lg:p-3">
                    <div className="flex items-center gap-2">
                        <IoLocationSharp className="h-6 w-6 text-yellow-600 hover:text-white" />
                        <span className="hover:text-yellow-600 font-bold">Bengaluru, India</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MdEmail className="h-6 w-6 text-yellow-600 hover:text-white" />
                        <span className="hover:text-yellow-600 font-bold">hr@pixalivetech.com</span>
                    </div>
                </div>

                <div  data-aos="fade-right" className="flex flex-col lg:flex-row gap-4 text-center lg:text-left items-center  lg:p-3">
                    <div className="flex items-center gap-2">
                        <MdAccessTimeFilled className="h-6 w-6 text-yellow-600 hover:text-white" />
                        <span className="hover:text-yellow-600 font-bold">9:30 AM – 6:00 PM</span>
                    </div>

                    <div className="flex justify-center lg:justify-start gap-4">
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

            </div>
        </div>
    );
};

export default Header;
