import React, { useState , useEffect} from "react";
import Header from "../../Components/header";
import MainHeader from "../../Components/mainheader";
import Footer from "../../Components/footer";
import slide1 from "../../Assests/Images/pagetitle_bg.jpg";
import { FaGreaterThan } from "react-icons/fa";
import pixalive from "../../Assests/Images/pixalive_logo.jpeg"
import {BsFillFileEarmarkPersonFill} from "react-icons/bs";
import {FaCalendarAlt} from "react-icons/fa"
import { useLocation, useNavigate } from "react-router-dom";
import {getOpenings} from "../../Api/jobOpenings"
import { getSearchQuery,saveSearchQuery } from "../../Utils/storage";

// const jobs = [
//   {
//     career:"careers",
//     title: "Senior Software Developer - Java",
//     description: [
//       "Provide technical consultation to the Business/System Analyst and Project Manager for developing new systems or enhancing existing ones to support the business.",
//       "Analysis and translation of complex business requirements into technical requirements for development, and creation of high-level technical architecture, design documents and technical specifications, in accordance with best practices and standards.",
//       "Research and evaluation of alternative solutions and recommend implementations.",
//       "Work with team members to estimate timelines, define project plans, and delegate tasks.",
//       "Ensure that expected application performance levels are achieved.",
//       "Work with the Technical Architect to realize technical concepts.",
//       "Provide guidance to junior team members.",
//     ],
//     qualifications: [
//       "At least a Bachelor Degree in Information Systems/Computer Science/Computer Engineering or equivalent.",
//       "At least 6 years of professional experience in design, development and implementation of Java-based server applications.",
//       "Deep professional experience in processing complex (product) data creating efficient (SQL) database queries.",
//       "Analyzing complex data of different formats (JSON/XML/CSV) - Transforming data into different formats.",
//       "Good knowledge in at least one of the following scripting languages: Bash, Powershell, Node.js or Python.",
//       "Solid analytical, interpersonal and communication (verbal and written) skills.",
//       "Independent, self-disciplined, self-organized, able to learn and work under minimum supervision.",
//     ],
//     extraQualifications: [
//       "Good knowledge in Informatica Product 360.",
//       "Good knowledge in OSGi Java frameworks.",
//       "Good knowledge in Kubernetes and Docker.",
//       "Good knowledge of streaming architectures (e.g. Kafka and message queuing).",
//       "API-Management platform experience.",
//     ],
//     email: "pixalivetech@gmail.com",
//   },
//   {
//     career:"careers",
//     title: "Front Office Executive",
//     description: [
//       "Attending Incoming & Outgoing Calls.",
//       "Managing the front office area in terms of discipline.",
//       "Co-ordinating with various departments as per enquiries.",
//       "Sending Fax – Downloading Daily Internet mail Forwarding them to the respective executives.",
//       "Maintaining records of Outward & Inward mail Communicating & Directing Visitors to the respective department.",
//     ],
//     qualifications: [
//       "Any Graduate.",
//       "Ready to sign 2.5 years service agreement with the company.",
//       "Freshers are preferred.",
//     ],
//     email: "pixalivetech@gmail.com",
    
//   },
// ]; 

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get search term from URL
  const searchQuery = new URLSearchParams(location.search).get("query") || getSearchQuery();
  

  const [searchTerm, setSearchTerm] = useState("");
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchDevelopers();
  }, []);

  // Update input field when the URL search query changes
  useEffect(() => {
    setSearchTerm(searchQuery);
  }, [searchQuery]);

  const fetchDevelopers = async () => {
    try {
      const res = await getOpenings();
      setJobs(res?.data?.result || []);
    } catch (error) {
      console.log("Error fetching Developers", error);
    }
  };

  // Filter jobs based on search term
  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()||searchTerm.toLocaleLowerCase())
  );

  const handleSearch = () => {
        saveSearchQuery(searchTerm);
       navigate(`/search?query=${getSearchQuery()}`); // Navigate to Search.jsx with search term
 
   };
  return (
    <div>
      <div className="relative z-50">
                <Header />
                <MainHeader />
            </div>
      {/* Header Section */}
      <div className="relative bg-gray-900 h-[180px] -z-10">
          <img
            src={slide1}
            alt="Page Title Background"
            className="w-full h-full object-cover bg-black opacity-40"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative max-w-7xl mx-auto px-4 py-16 text-white text-center md:text-left relative bottom-48">
            <div className="border-l-4 border-yellow-600 p-2">
              <h1 className="lg:text-5xl text-xl font-bold mb-4">Job Careers</h1>
              <div className="flex items-center space-x-2">
                <span>Home</span>
                <FaGreaterThan className="h-3 w-3" />
                <span>Job Careers</span>
              </div>
            </div>
          </div>
        </div>
       
      {/* Main Content */}
      <div className="flex max-w-7xl mx-auto px-4 py-16  gap-12 -z-10">
        {/* Job Listings */}
        <div className="lg:w-[70%]">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job, index) => (
            <div key={index} className="border rounded-lg p-6 shadow-lg mb-8">
            <div className="bg-yellow-600 text-white rounded-lg w-20 flex justify-center items-center p-2 mb-2">careers</div>
              <h2 className="text-2xl font-bold text-yellow-600 mb-4">
                {job.title}
              </h2>
              <div className="space-y-4">
                <h3 className="font-semibold">Job Description:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  {job.description.map((desc, idx) => (
                    <li key={idx}>{desc}</li>
                  ))}
                </ul>
                <h3 className="font-semibold">Qualifications:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  {job.qualifications.map((qual, idx) => (
                    <li key={idx}>{qual}</li>
                  ))}
                </ul>
                {job.extraQualifications && (
                  <>
                    <h3 className="font-semibold">Additional Qualifications:</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      {job.extraQualifications.map((extra, idx) => (
                        <li key={idx}>{extra}</li>
                      ))}
                    </ul>
                  </>
                )}
                <p className="text-gray-600">
                  Send resume to:{" "}
                  <a
                    href={`mailto:${job.email}`}
                    className="text-yellow-600 font-bold underline"
                  >
                    {job.email}
                  </a>
                </p>
                <p className="flex justify-between ">
                    <div className="flex mt-8"><BsFillFileEarmarkPersonFill className="text-yellow-600 w-5 h-5"/> <div className="text-sm  font-bold ">PIXALIVE</div></div>
                    <div className="flex mt-8">< FaCalendarAlt className="text-yellow-600 w-5 h-5"/> <div className="text-sm  font-bold ">Jan,07,2025</div></div>
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No jobs found.</p>
        )}
        </div>

        {/* Sidebar */}
        <div className="relative lg:w-[30%] flex flex-col gap-5  ">
          <div className="shadow-lg  p-8 rounded-lg text-gray-600 border border-gray-300">
            PIXALIVE TECHNOLOGY SERVICES PVT LTD. is an Information and Technology-based
            company working towards excellence in the Computers, and believe in
            pursuing business through innovation and technology.Our team comes with several years of industry experience, and comprise of a highly motivated set of specialists.
          </div>
          <div className="shadow-lg  p-8 rounded-lg border border-gray-300">
          <form onSubmit={handleSearch}>
            <label className="block mb-2 font-medium text-gray-400">
              Search
            </label>
            <div className="w-full">
            <input
            type="text"
            placeholder="search jobs..."
            className="w-3/4 p-2 rounded-lg shadow-sm border border-gray-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
          <button
            className="w-1/4 bg-yellow-600 p-2 rounded-lg text-white"
            type="submit"
          >
            Search
          </button>
          
            </div>
          </form>
          </div>
          <div className="shadow-lg  p-8 rounded-lg border border-gray-300 flex justify-center items-center">
            <img src={pixalive} alt="pixalive" className="h-20 w-20"></img>
          </div>
        </div>
      </div>
      <div className="relative -z-50"> <Footer  /></div>
    </div>
  );
};

export default Search;
