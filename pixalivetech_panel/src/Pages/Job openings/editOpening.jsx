import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {  getSingleOpening, updateOpening } from "../../Api/openings"; 
import { getAdminId, getToken } from "../../Utils/storage";
import {isValidEmail} from "../../Utils/validation";
import { uploadFile } from "../../Utils/fileUpload"; 
import { toast } from "react-toastify";
import Header from "../../Components/header";
import Sidebar from "../../Components/sidebar";
import { FiCamera,FiArrowLeft } from "react-icons/fi";

const EditOpening = () => {
    const location = useLocation();
    const id = new URLSearchParams(location.search).get("id");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const initialStateInputs = {
   adminId: getAdminId(),
    title: "",
    description: [""],
    qualifications: [""],
    extraQualifications:[""],
    email: "",
    vacancies: "",

};

const initialStateErrors = {
    title: { required: false },
    description: { required: false },
    qualifications: { required: false },
    extraQualifications: { required: false },
    email:{ required: false },
    vacancies: { required: false },

    
};

const [inputs, setInputs] = useState(initialStateInputs);
const [errors, setErrors] = useState(initialStateErrors);
const [submitted, setSubmitted] = useState(false);

const handleValidation = (data) => {
    let error = { ...initialStateErrors };

    if (data.title === "") {
        error.title.required = true;
    }
    if (data.description === "") {
        error.description.required = true;
    }
    if (data.qualifications === "") {
        error.qualifications.required = true;
    }
    if (data.extraQualifications === "") {
        error.extraQualifications.required = true;
    }
    if (data.email === "") {
        error.email.required = true;
    }
    if(!isValidEmail(data.email)) { 
        error.email.valid = true;
    }
    if (data.vacancies === "") {
        error.vacancies.required = true;
    }

    
    return error;
};

const handleInputs = (event) => {
  const { name, value } = event.target;

  setInputs((prevInputs) => {
      if (name.startsWith("callToAction.")) {
          const key = name.split(".")[1]; // Extract "text" or "linkText"

          const updatedInputs = {
              ...prevInputs,
              callToAction: {
                  ...prevInputs.callToAction, // Preserve other fields
                  [key]: value,
              },
          };

          if (submitted) {
              setErrors(handleValidation(updatedInputs)); // Use updated state
          }

          return updatedInputs;
      } else {
          const updatedInputs = { ...prevInputs, [name]: value };

          if (submitted) {
              setErrors(handleValidation(updatedInputs));
          }

          return updatedInputs;
      }
  });
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

  const handleEditinputs = async (event) => {
    event.preventDefault();
    const newError = handleValidation(inputs);
    setErrors(newError);
    setSubmitted(true);
console.log("inputs",inputs);
    if (handleErrors(newError)) {
        try {
            await updateOpening(inputs);
            toast.success("Opening added successfully!");
            setInputs({  title: "",
                description: [""],
                qualifications: [""],
                extraQualifications:[""],
                email: "",
                vacancies: "",
              });
            setErrors(initialStateErrors);
            setSubmitted(false);
            fetchOpenings();

        } catch (err) {
            toast.error(err?.response?.data?.message);
        }
    }
};




  // Toggle Sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  // Fetch Openings
  useEffect(() => {
    fetchOpenings();
  }, []);

  const fetchOpenings = async () => {

    try {
      const res = await getSingleOpening(id);
      setInputs(res?.data?.result || []);
    } catch (error) {
      console.log("Error fetching Openings", error);
    }
  };



  // Handle file upload
  const addDescriptionField = () => {
    setInputs((prev) => ({
      ...prev,
      description: [...prev.description, ""]
    }));
  };
  const addQualificationsField = () => {
    setInputs((prev) => ({
      ...prev,
      qualifications: [...prev.qualifications, ""]
    }));
  };
  const addExtraQualificationsField = () => {
    setInputs((prev) => ({
      ...prev,
      extraQualifications: [...prev.extraQualifications, ""]
    }));
  };
  const removeDescriptionField = (index) => {
    const updatedDescription = inputs.description.filter((_, i) => i !== index);
    setInputs((prev) => ({ ...prev, description: updatedDescription }));
  };
  const removeQualificationsField = (index) => {
    const updatedQualifications = inputs.qualifications.filter((_, i) => i !== index);
    setInputs((prev) => ({ ...prev, qualifications: updatedQualifications }));
  };
  const removeExtraQualificationsField = (index) => {
    const updatedExtraQualifications = inputs.extraQualifications.filter((_, i) => i !== index);
    setInputs((prev) => ({ ...prev, extraQualifications: updatedExtraQualifications }));
  };
  



  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
    <Sidebar isOpen={isSidebarOpen} />
    <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? "lg:ml-64 ml-16" : "ml-16"}`}>
      <Header toggleSidebar={toggleSidebar} />

      {/* Edit inputss Section */}
      <div className="max-w-md md:max-w-lg mx-auto px-4 w-full mt-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-[#13266A]">Edit Service</h2>
          <Link to="/jobopenings">
            <button className="bg-[#13266A] text-white px-4 py-2 rounded-md hover:bg-yellow-950 transition flex items-center gap-2">
              <FiArrowLeft className="text-xl" /> Opening List
            </button>
          </Link>
        </div>
      </div>

      {/* Form Section */}
      <div className="max-w-md md:max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 w-full">
        <form onSubmit={handleEditinputs}>
        <label className="block text-md font-medium mb-2 text-start">Title:</label>
      <input
        type="text"
        name="title"
        placeholder="Enter Opening Title"
        className="w-full p-2 border rounded-lg mb-2"
        value={inputs.title}
        onChange={handleInputs}
      />
      {errors.title?.required && <span className="text-red-500 text-sm">Title is required</span>}

      {/* Introduction Input */}
      <label className="block text-md font-medium mb-2 text-start">Description:</label>
      {(inputs.description || []).map((paragraph, index) => (
  <div key={index} className="flex items-center mb-2">
    <textarea
      name={`description-${index}`}
      placeholder={`description Line ${index + 1}`}
      className="w-full p-2 border rounded-lg"
      value={paragraph}
      onChange={(e) => {
        const newDesc = [...inputs.description];
        newDesc[index] = e.target.value;
        setInputs((prev) => ({ ...prev, description: newDesc }));
      }}
    />
    {index > 0 && (
      <button
        className="ml-2 text-red-500 hover:text-red-700"
        onClick={() => removeDescriptionField(index)}
      >
        ✕
      </button>
    )}
  </div>
))}
<button
  className="text-blue-600 text-sm mb-2"
  onClick={addDescriptionField}
>
  + Add More Description
</button>
      {errors.description?.required && <span className="text-red-500 text-sm">Description is required</span>}

      <label className="block text-md font-medium mb-2 text-start">Qualifications:</label>
      {(inputs.qualifications || []).map((paragraph, index) => (
  <div key={index} className="flex items-center mb-2">
    <textarea
      name={`qualifications-${index}`}
      placeholder={`qualifications Line ${index + 1}`}
      className="w-full p-2 border rounded-lg"
      value={paragraph}
      onChange={(e) => {
        const newQua = [...inputs.qualifications];
        newQua[index] = e.target.value;
        setInputs((prev) => ({ ...prev, qualifications: newQua }));
      }}
    />
    {index > 0 && (
      <button
        className="ml-2 text-red-500 hover:text-red-700"
        onClick={() => removeQualificationsField(index)}
      >
        ✕
      </button>
    )}
  </div>
))}
<button
  className="text-blue-600 text-sm mb-2"
  onClick={addQualificationsField}
>
  + Add More Qualification
</button>
      {errors.qualifications?.required && <span className="text-red-500 text-sm">Qualifications is required</span>}
      <label className="block text-md font-medium mb-2 text-start">ExtraQualifications:</label>
      {(inputs.extraQualifications || []).map((paragraph, index) => (
  <div key={index} className="flex items-center mb-2">
    <textarea
      name={`extraQualifications-${index}`}
      placeholder={`extraQualifications Line ${index + 1}`}
      className="w-full p-2 border rounded-lg"
      value={paragraph}
      onChange={(e) => {
        const newQua = [...inputs.extraQualifications];
        newQua[index] = e.target.value;
        setInputs((prev) => ({ ...prev, extraQualifications: newQua }));
      }}
    />
    {index > 0 && (
      <button
        className="ml-2 text-red-500 hover:text-red-700"
        onClick={() => removeExtraQualificationsField(index)}
      >
        ✕
      </button>
    )}
  </div>
))}
<button
  className="text-blue-600 text-sm mb-2"
  onClick={addExtraQualificationsField}
>
  + Add More ExtraQualification
</button>
      {errors.extraQualifications?.required && <span className="text-red-500 text-sm">ExtraQualifications is required</span>}

      {/* Expertise Title Input */}
      <label className="block text-md font-medium mb-2 text-start">Email:</label>
      <input
        type="text"
        name="email"
        placeholder="Enter Expertise Title"
        className="w-full p-2 border rounded-lg mb-2"
        value={inputs.email}
        onChange={handleInputs}
      />
 
 {errors.email?.required && <p className="text-red-500 text-sm">Email is required</p>}
 {errors.email?.validEmail && <p className="text-red-500 text-sm">Email is invalid</p>}
 <label className="block text-md font-medium mb-2 text-start">vacancies:</label>
      <input
        type="number"
        name="vacancies"
        placeholder="Enter vacancies"
        className="w-full p-2 border rounded-lg mb-2"
        value={inputs.vacancies}
        onChange={handleInputs}
      />
      {errors.vacancies?.required && <span className="text-red-500 text-sm">vacancies is required</span>}
          <div className="flex justify-end mt-6">
            <button type="submit" className="bg-[#13266A] text-white px-6 py-2 rounded-lg hover:bg-yellow-950">
              Save Changes
            </button>
          </div>
        </form>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto px-4 md:px-24 mt-6">
        <div className="overflow-auto rounded-lg shadow-lg">
          <table className="w-full bg-white border rounded-lg min-w-[600px]">
          <thead>
          <tr className="bg-[#13266A] text-white">
            <th className="p-3 text-left">S.No</th>
            <th className="p-3 text-left">Title</th>
            <th className="p-3 text-left">Description</th>
            <th className="p-3 text-left">Qualifications</th>
            <th className="p-3 text-left">Extra Qualifications</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Vacancies</th>
          </tr>
        </thead>
        <tbody>
          
            <tr  className="border-b hover:bg-gray-100 relative">
              <td className="p-3 text-center">{ 1}</td>
              <td className="p-3">{inputs.title}</td>

              <td className="p-3">
                {inputs.description.map((des, i) => (
                  <p key={i} className="text-gray-700 text-sm">
                    {i + 1}. {des}
                  </p>
                ))}
              </td>

              <td className="p-3">
                {inputs.qualifications.map((qua, i) => (
                  <p key={i} className="text-gray-700 text-sm">
                    {i + 1}. {qua}
                  </p>
                ))}
              </td>

              {/* Call To Action */}
              <td className="p-3">
                {inputs.extraQualifications.map((exqua, i) => (
                  <p key={i} className="text-gray-700 text-sm">
                    {i + 1}. {exqua}
                  </p>
                ))}
              </td>
              <td className="p-3">{inputs.email}</td>
              <td className="p-3">{inputs.vacancies}</td>
              {/* Actions (Dropdown Menu) */}
           
            </tr>
        
        </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  );
};

export default EditOpening;
