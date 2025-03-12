import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { updateLaptop, getSingleLaptop } from "../../Api/laptopRental"; 
import { getAdminId, getToken } from "../../Utils/storage";
import { uploadFile } from "../../Utils/fileUpload"; 
import { toast } from "react-toastify";
import Header from "../../Components/header";
import Sidebar from "../../Components/sidebar";
import { FiCamera,FiArrowLeft } from "react-icons/fi";

const EditLaptop = () => {
    const location = useLocation();
    const id = new URLSearchParams(location.search).get("id");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const profileRef = useRef(null);

const initialStateInputs = {
     adminId:getAdminId(),
    _id:id || "",
     title: "",
     desc: "", 
     price: "",
     img: "",
};

const initialStateErrors = {
    _id: { required: false },
    title: { required: false },
    desc: { required: false },
    price: { required: false },
    img: { required: false },
    
};

const [inputs, setInputs] = useState(initialStateInputs);
const [errors, setErrors] = useState(initialStateErrors);
const [submitted, setSubmitted] = useState(false);

const handleValidation = (data) => {
    let error = { ...initialStateErrors };

    if (data.title === "") {
        error.title.required = true;
    }
    if (data.desc === "") {
        error.desc.required = true;
    }
    if (data.price === "") {
        error.price.required = true;
    }
    if (data.img === "") {
        error.img.required = true;
    }

    
    return error;
};


  // Fetch client details on mount
  useEffect(() => {
    fetchLaptopDetails();
   
  }, [id]);

  const fetchLaptopDetails = async () => {
    try {
      const token = getToken();
      const res = await getSingleLaptop(id, token);
      setInputs({
        _id: res?.data?.result?._id || id,
        title: res?.data?.result?.title || "",
        desc: res?.data?.result?.desc || "",
        price: res?.data?.result?.price || "",
        img: res?.data?.result?.img || "",
      
      });
    } catch (error) {
      console.log("Error fetching client details:", error);
      toast.error("Failed to load client data.");
    }
  };


  // Handle input changes
  const handleInputs = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });

    if (submitted) {
      setErrors(handleValidation({ ...inputs, [event.target.name]: event.target.value }));
    }
  };

  // Handle file upload
  const handleFileInputs = (event) => {
    const file = event?.target?.files[0];
    const folder = "Laptoprental/"; // Folder path for uploaded files
  
    if (file && file.type.startsWith("image/")) {
      const fileName = file.name; // Get the file name
  
      uploadFile(file, folder)
        .then((res) => {
          const fileUrl = res?.Location;
          setInputs({ ...inputs, logo: fileUrl, fileName }); // Save image details
        })
        .catch((err) => {
          console.error(err);
          toast.error("Error uploading image.");
        });
    } else {
      toast.error("Please upload a valid image file.");
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
  // Handle form submission
  const handleEditSubmit = async (event) => {
    event.preventDefault();
        const newError = handleValidation(inputs);
        setErrors(newError);
        setSubmitted(true);
    
        if (handleErrors(newError)) {
            try {
                console.log("inputs",initialStateInputs,inputs);
                await updateLaptop(inputs);
                toast.success("Client added successfully!");
                setInputs({ name: "", logo: "" });
                setErrors(initialStateErrors);
                setSubmitted(false);
    
                if (profileRef.current) {
                    profileRef.current.value = "";
                }
                fetchLaptopDetails();
    
            } catch (err) {
                toast.error(err?.response?.data?.message);
            }
        }
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
    <Sidebar isOpen={isSidebarOpen} />
    <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? "lg:ml-64 ml-16" : "ml-16"}`}>
      <Header toggleSidebar={toggleSidebar} />

      {/* Edit Client Section */}
      <div className="max-w-md md:max-w-lg mx-auto px-4 w-full mt-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-[#13266A]">Edit Rental</h2>
          <Link to="/laptoprental">
            <button className="bg-[#13266A] text-white px-4 py-2 rounded-md hover:bg-yellow-950 transition flex items-center gap-2">
              <FiArrowLeft className="text-xl" /> Laptops List
            </button>
          </Link>
        </div>
      </div>

      <div className="max-w-md md:max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 w-full">
        <form onSubmit={handleEditSubmit}>
          {/* Title */}
          <label className="block text-md font-medium mb-2">Title:</label>
          <input
            type="text"
            name="title"
            placeholder="Enter Title"
            className="w-full p-2 border rounded-lg mb-4"
            value={inputs.title}
            onChange={handleInputs}
          />
          {errors?.title?.required && <span className="text-red-500 text-sm">title is required</span>}

          {/* Description */}
          <label className="block text-md font-medium mb-2">Description:</label>
          <textarea
            type="text"
            name="desc"
            placeholder="Enter Description"
            className="w-full p-2 border rounded-lg mb-4"
            value={inputs.desc}
            onChange={handleInputs}
          />
          {errors?.desc?.required && <span className="text-red-500 text-sm">desc is required</span>}

          {/* Price */}
          <label className="block text-md font-medium mb-2">Price:</label>
          <input
            type="text"
            name="price"
            placeholder="Enter Price"
            className="w-full p-2 border rounded-lg mb-4"
            value={inputs.price}
            onChange={handleInputs}
          />
          {errors?.price?.required && <span className="text-red-500 text-sm">price is required</span>}

          {/* Image Upload */}
          <label className="block text-md font-medium mb-2">Image:</label>
          <div className="flex items-center">
            <label htmlFor="fileInputImage" className="cursor-pointer">
              {inputs?.img ? (
                <img src={inputs.img} width="100" height="100" alt="Preview" className="rounded-full border shadow-md" />
              ) : (
                <FiCamera size={60} className="text-gray-600" />
              )}
            </label>
            <input ref={profileRef} className="hidden" id="fileInputImage" type="file" accept="image/*" onChange={handleFileInputs} />
          </div>
          {inputs?.img?.required && <p className="text-sm text-start text-gray-700 mt-2">Uploaded: {inputs.fileName}</p>}
          {errors?.img?.required && <span className="text-red-500 text-sm">image is required</span>}

          {/* Save Button */}
          <div className="flex justify-end mt-6">
            <button type="submit" className="bg-[#13266A] text-white px-6 py-2 rounded-lg hover:bg-yellow-950">
              Save Changes
            </button>
          </div>
        </form>
      </div>

      {/* Table */}
      <div className="overflow-x-auto px-4 md:px-24 mt-6">
        <div className="overflow-auto rounded-lg shadow-lg">
          <table className="w-full bg-white border rounded-lg min-w-[600px]">
            <thead>
              <tr className="bg-[#13266A] text-white">
                <th className="p-3 text-left">S.No</th>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Description</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Image</th>
                
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-100">
                <td className="p-3">1</td>
                <td className="p-3">{inputs.title}</td>
                <td className="p-3">{inputs.desc}</td>
                <td className="p-3">${inputs.price}</td>
                <td className="p-3">
                  {inputs.img ? <img src={inputs.img} alt={inputs.title} className="h-10 w-10 rounded-full" /> : "No Image"}
                </td>
               
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  );
};

export default EditLaptop;
