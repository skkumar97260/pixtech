import React, { useState,useEffect,useRef } from "react";
import Header from "../../../Components/header";
import MainHeader from "../../../Components/mainheader";
import Footer from "../../../Components/footer";
import slide1 from "../../../Assests/Images/pagetitle_bg.jpg";
import { FaGreaterThan } from "react-icons/fa";
import pixalive from "../../../Assests/Images/pixalive_logo.jpeg"
import {BsFillFileEarmarkPersonFill} from "react-icons/bs";
import {FaCalendarAlt} from "react-icons/fa";
import {getOpenings} from "../../../Api/jobOpenings";
import { isValidEmail, isValidPhone } from "../../../Utils/validation";
import { toast } from "react-toastify";
import { saveApply } from "../../../Api/apply";
import { uploadFile } from "../../../Utils/fileUpload"; 
import { FiFolder } from "react-icons/fi";
import AOS from "aos";
import "aos/dist/aos.css";

const Openings = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const [jobs,setJobs]=useState()
  const [modalState, setModalState] = useState({ showModal: false, title: "" });
  const resumeRef = useRef(null);
      const initialStateInputs = {
         title:"",
          name: "",
          email: "",
          mobileNumber: "",
          resume: "",
      };
  
      const initialStateErrors = {
          title: { required: false },
          name: { required: false },
          email: { required: false, validEmail: false },
          mobileNumber: { required: false, validMobile: false }, // Fixed key
          resume: { required: false },
        
      };
  
      const [inputs, setInputs] = useState(initialStateInputs);
      const [errors, setErrors] = useState(initialStateErrors);
      const [submitted, setSubmitted] = useState(false);
  
      const handleValidation = (data) => {
          let error = { ...initialStateErrors };
          if(data.title===""){
              error.title.required=true
          }
          if (data.name === "") {
              error.name.required = true;
          }
          if (data.email === "") {
              error.email.required = true;
          } if (!isValidEmail(data.email)) {
              error.email.validEmail = true;
          }
          if (data.mobileNumber === "") {
              error.mobileNumber.required = true;
          } if (!isValidPhone(data.mobileNumber)) {
              error.mobileNumber.validMobile = true;
          }
          if (data.resume === "") {
              error.resume.required = true;
          }
         
          
          return error;
      };
      const handleFileInputs = (event) => {
        const file = event?.target?.files[0];
        const folder = "resume/"; 
        
       
        if (file && (file.type === "application/pdf" || file.type === "application/msword" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
          const fileName = file.name; 
          
    
          uploadFile(file, folder)
            .then((res) => {
              const fileUrl = res?.Location;
              setInputs({ ...inputs, resume: fileUrl, fileName }); 
            })
            .catch((err) => {
              console.error(err);
            });
        } else {
          toast.error("Please upload a valid resume file (PDF or DOC/DOCX).");
        }
      };
      
      const handleInputs = (event) => {
          setInputs({ ...inputs, [event.target.name]: event.target.value });
          if (submitted) {
              setErrors(handleValidation({ ...inputs, [event.target.name]: event.target.value }));
          }
      };
  
      const handleErrors = (obj) => {
          for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
              const prop = obj[key];
              if (prop.required === true || prop.valid === true) {
                return false;
              }
            }
          }
          return true;
        };
  
      const handleApply = async(event) => {
          event.preventDefault();
          const newError = handleValidation(inputs);
          setErrors(newError);
          setSubmitted(true);
          console.log("inputs",inputs)
          if (handleErrors(newError)) {
            try {
              console.log("inputs",inputs)
              const res = await saveApply(inputs);
              toast.success(res?.data?.message || "Application submitted successfully");
              event.target.reset();
                    setInputs(initialStateInputs);
                    setErrors(initialStateErrors);
                    setSubmitted(false);
              
            } catch (err) {
              console.error("API Error:", err);
              toast.error(err?.response?.data?.message || "Failed to apply");
            }
          }
      };
  const filteredJobs = jobs?.filter((job) =>
    job?.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  useEffect(() => {
    fetchOpenings();
  }, []);

  const fetchOpenings = async () => {

    try {
      const res = await getOpenings();
      setJobs(res?.data?.result || []);
    } catch (error) {
      console.log("Error fetching Openings", error);
    }
  };
  const handleApplyClick = (title) => {
    setModalState({ showModal: true, title });
  setInputs((prevInputs) => ({ ...prevInputs, title })); 
  };
  const closeSearch = () => {
    setModalState({ showModal: false, title: "" }); 
  };
  useEffect(() => {
    AOS.init({
        duration: 1000,
        easing: "ease-in-out",
        once: false,
        mirror: true,
    });
}, []);

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
      <div className=" flex lg:flex lg:flex-row flex-col max-w-6xl mx-auto  py-16  gap-12 -z-10">
        {/* Job Listings */}
        <div data-aos="flip-left" className="lg:w-[70%]">
        {filteredJobs?.length > 0 ? (
          filteredJobs?.map((job, index) => (
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
                
                <p className="flex gap-2">
                <h3 className="font-semibold">Vacancies:</h3>
                  <div className="text-gray-600">{" "}{job.vacancies}</div>
                </p>
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
                    <div className="flex mt-8">< FaCalendarAlt className="text-yellow-600 w-5 h-5"/> <div className="text-sm  font-bold "> {new Date(job.createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    })}</div></div>
                </p>
                <div className="flex justify-end mt-2">
                  <button className="bg-[#13256B] text-white py-2 px-3 rounded-lg"
                  onClick={() => handleApplyClick(job.title)} 
                  >Apply</button>
                </div>
              </div>
            </div>
           ))
        ) : (
          <p className="text-gray-600">No jobs found.</p>
        )}
        </div>

        {/* Sidebar */}
        <div data-aos="flip-right" className="relative lg:w-[30%] flex flex-col gap-5  ">
          <div className="shadow-lg  p-8 rounded-lg text-gray-600 border border-gray-300">
            PIXALIVE TECHNOLOGY SERVICES PVT LTD. is an Information and Technology-based
            company working towards excellence in the Computers, and believe in
            pursuing business through innovation and technology.Our team comes with several years of industry experience, and comprise of a highly motivated set of specialists.
          </div>
          <div className="shadow-lg  p-8 rounded-lg border border-gray-300">
            <label className="block mb-2 font-medium text-gray-400">
              Search
            </label>
            <div className="w-full">
            <input
              type="text"
              placeholder="Search jobs..."
              className="w-3/4 p-2 rounded-lg shadow-sm border border-gray-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="w-1/4 bg-yellow-600 p-2 rounded-lg text-white">Search</button>
            </div>
          </div>
          <div className="shadow-lg  p-8 rounded-lg border border-gray-300 flex justify-center items-center">
            <img src={pixalive} alt="pixalive" className="h-20 w-20"></img>
          </div>
        </div>
      </div>
      {modalState.showModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 auto-scroll">
    <div className="bg-white p-6 ml-[5%] lg:ml-[0%] w-[95%] flex flex-col mt-10 max-w-md md:w-[50%] rounded-lg shadow-md text-center relative max-h-[80vh] overflow-y-auto">

      {/* Close Button */}
      <button
        onClick={closeSearch}
        className="absolute top-3 right-4 text-yellow-950 hover:text-gray-700 text-2xl font-bold"
      >
        ✕
      </button>

      <div className="grid grid-cols  gap-4">
      <lable className="mt-5">Apply for {modalState.title}</lable>
      <form onSubmit={handleApply}>
      <div>
                                    <label className="block text-white font-medium mb-1">Role</label>
                                    <input type="text" name="title" value={inputs?.title} onChange={handleInputs} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400" placeholder="Enter your role" />
                                    {errors.title?.required && <p className="text-red-500 text-sm">Title is required</p>}
                                </div>
                                <div>
                                    <label className="block text-white font-medium mb-1">Full Name</label>
                                    <input type="text" name="name" value={inputs?.name} onChange={handleInputs} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400" placeholder="Enter your name" />
                                    {errors.name?.required && <p className="text-red-500 text-sm">Name is required</p>}
                                </div>
                                <div>
                                    <label className="block text-white font-medium mb-1">Email Address</label>
                                    <input type="email" name="email" value={inputs?.email} onChange={handleInputs} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400" placeholder="Enter your email" />
                                    {errors.email?.required && <p className="text-red-500 text-sm">Email is required</p>}
                                    {errors.email?.validEmail && <p className="text-red-500 text-sm">Email is invalid</p>}
                                </div>
                           

                            <div>
                                <label className="block text-white font-medium mb-1">Mobile Number</label>
                                <input type="tel" name="mobileNumber" value={inputs?.mobileNumber} onChange={handleInputs} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400" placeholder="Enter mobile number" />
                                {errors.mobileNumber?.required && <p className="text-red-500 text-sm">Mobile number is required</p>}
                                {errors.mobileNumber?.validMobile && <p className="text-red-500 text-sm">Invalid mobile number</p>}
                            </div>

                            <div>
                                <label className="block text-white font-medium mb-1">Resume:</label>
                                <div className="flex items-center">
                                <label htmlFor="fileInputResume" className="cursor-pointer flex items-center gap-2 bg-gray-100 border border-gray-300 px-4 py-2 rounded-md shadow-md hover:bg-gray-200">
        <FiFolder size={20} className="text-yellow-600" />
        <span className="text-gray-800">
          {inputs.resume ? inputs.fileName  : "Upload Resume (PDF/DOC)"}
        </span>
      </label>
      <input
        ref={resumeRef}
        className="hidden"
        id="fileInputResume"
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleFileInputs}
      />
                </div>
                {inputs?.resume?.required && <p className="text-sm text-start text-gray-700 mt-2">Uploaded: {inputs.fileName}</p>}
                {errors?.resume?.required && <span className="text-red-500 text-sm">Resume is required</span>}
                            </div>

      <button
        className="bg-[#13266A] mb-4 text-white px-6 py-2 rounded-lg mt-5 w-full md:w-auto"
        type="submit"
      >
        Apply Now
      </button>
      </form>
      </div>
    </div>
  </div>
)}
<div className="relative -z-50"> <Footer  /></div>
    </div>
  );
};

export default Openings;
