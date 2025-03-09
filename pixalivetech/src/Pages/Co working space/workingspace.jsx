import React, { useEffect, useState } from "react";
import { FaGreaterThan } from "react-icons/fa";
import slide1 from "../../Assests/Images/pagetitle_bg.jpg";
import Header from "../../Components/header";
import MainHeader from "../../Components/mainheader";
import Footer from "../../Components/footer";
import { WorkingSpace } from "../../Api/workingspace";
import AOS from "aos";
import "aos/dist/aos.css";

const Workingspace = () => {
    const [workspaceData, setWorkspaceData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchWorkspaceData();
    }, []);

    const fetchWorkspaceData = async () => {
        try {
            const res = await WorkingSpace();
            const workspace = res?.data?.result?.[0] || null; // Extract first object from the array
            setWorkspaceData(workspace);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
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
            <Header />
            <MainHeader />

            {/* Hero Section */}
            <div className="relative bg-gray-900 h-[180px] -z-10">
                <img src={slide1} alt="Coworking Space" className="w-full h-full object-cover bg-black opacity-40" />
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative max-w-7xl mx-auto px-4 py-16 text-white text-center md:text-left bottom-48">
                    <div className="border-l-4 border-yellow-600 p-2">
                        <h1 className="lg:text-5xl text-xl font-bold mb-4">
                            {workspaceData?.title || "Coworking Space"}
                        </h1>
                        <div className="flex items-center space-x-2">
                            <span>Home</span>
                            <FaGreaterThan className="h-3 w-3" />
                            <span>{workspaceData?.title || "Work Space"}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                {loading ? (
                    <p className="text-center text-lg text-gray-700">Loading workspace details...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : (
                    workspaceData && (
                        <>
                            {/* Introduction */}
                            <div data-aos="zoom-in-up" className="mb-10">
                                {workspaceData?.introduction?.length > 0 ? (
                                    workspaceData.introduction.map((paragraph, index) => (
                                        <p key={index} className="text-lg text-gray-700 mb-4">{paragraph}</p>
                                    ))
                                ) : (
                                    <p>No introduction available.</p>
                                )}
                            </div>

                            {/* Facilities */}
                            <div data-aos="zoom-in-up" className="mb-12">
                                <h3 className="font-semibold text-lg mb-4">Check Our Facilities:</h3>
                                {workspaceData?.facilities?.length > 0 ? (
                                    <ul className="list-disc pl-6 text-gray-700">
                                        {workspaceData.facilities.map((facility, index) => (
                                            <li key={index}>{facility}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No facilities available.</p>
                                )}
                            </div>

                            {/* Ways of Working */}
                            <div>
                                <h3 className="font-semibold text-lg mb-6">Choose your way of working:</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {workspaceData?.waysOfWorking?.length > 0 ? (
                                        workspaceData.waysOfWorking.map((option, index) => (
                                            <div data-aos="flip-left" key={index} className="p-4 border rounded-lg shadow-md">
                                                <h4 className="font-bold text-lg mb-2">{option.type}</h4>
                                                <p className="text-gray-700 mb-4">{option.description}</p>
                                                <h5 className="font-semibold mb-2">Features:</h5>
                                                {option?.features?.length > 0 ? (
                                                    <ul className="list-disc pl-6 text-gray-700">
                                                        {option.features.map((feature, i) => (
                                                            <li key={i}>{feature}</li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <p>No features listed.</p>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <p>No working options available.</p>
                                    )}
                                </div>
                            </div>
                        </>
                    )
                )}
            </div>

            <div className="relative -z-50"> <Footer  /></div>
        </div>
    );
};

export default Workingspace;
