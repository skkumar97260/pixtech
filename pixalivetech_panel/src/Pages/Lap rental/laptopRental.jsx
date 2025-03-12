import React, { useState, useEffect ,useRef} from "react";
import { getLaptops, deleteLaptop, addLaptop, updateLaptop } from "../../Api/laptopRental"; 
import { getAdminId, getToken } from "../../Utils/storage";
import { uploadFile } from "../../Utils/fileUpload"; 
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Header from "../../Components/header";
import Sidebar from "../../Components/sidebar";
import { Eye, Trash2, MoreVertical, Upload,Edit  } from "lucide-react";
import { FiCamera } from "react-icons/fi";

const Laptoprental = () => {
  const [laptops, setLaptops] = useState([]);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null); 
  const [showAddModal, setShowAddModal] = useState(false);
  const profileRef = useRef(null);
  const initialStateInputs = {
    adminId: getAdminId(),
    title: "",
    desc: "", 
    price: "",
    img: "",

};

const initialStateErrors = {
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

   if(data.title === "") {
    error.title.required = true;
   }

   if(data.desc === "") {
    error.desc.required = true;
   }

   if(data.price === "") {
    error.price.required = true;
   }

   if(data.img === "") {
    error.img.required = true;
   }
    
    return error;
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

  const handleAddLaptop = async (event) => {
    event.preventDefault();
    const newError = handleValidation(inputs);
    setErrors(newError);
    setSubmitted(true);
console.log("inputs",inputs);
    if (handleErrors(newError)) {
        try {
            await addLaptop(inputs);
            toast.success("Client added successfully!");
            setInputs({ title: "", desc: "", price: "", img: "" });
            setErrors(initialStateErrors);
            setSubmitted(false);

            if (profileRef.current) {
                profileRef.current.value = "";
            }
            fetchLaptops();

        } catch (err) {
            toast.error(err?.response?.data?.message);
        }
    }
};


  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const laptopsPerPage = 10;

  // Toggle Sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  // Fetch clients
  useEffect(() => {
    fetchLaptops();
    console.log("adminId",getAdminId())
  }, []);

  const fetchLaptops = async () => {
    const token = getToken();
    try {
      const res = await getLaptops(token);
      setLaptops(res?.data?.result || []);
      console.log("res",res?.data?.result);
    } catch (error) {
      console.log("Error fetching clients", error);
    }
  };

  // Delete client
  const handleDelete = async () => {
    try {
      await deleteLaptop(deleteId);
      toast.success("Client deleted successfully");
      setShowDeleteModal(false);
      fetchLaptops();
    } catch (error) {
      console.log("Error deleting client", error);
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
          setInputs({ ...inputs, img: fileUrl, fileName }); // Save image details
        })
        .catch((err) => {
          console.error(err);
          toast.error("Error uploading image.");
        });
    } else {
      toast.error("Please upload a valid image file.");
    }
  };
  
  const closeSearch = () => {
    setShowAddModal(false); 
};
const filteredLaptops = laptops.filter((c) =>
    c?.title?.toLowerCase().includes(search.toLowerCase())
  );
console.log("filteredLaptops",filteredLaptops);  

  const indexOfLastLaptop = currentPage * laptopsPerPage;
  const indexOfFirstLaptop = indexOfLastLaptop - laptopsPerPage;
  const currentLaptops = filteredLaptops.slice(
    indexOfFirstLaptop,
    indexOfLastLaptop
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Sidebar isOpen={isSidebarOpen} />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? "lg:ml-64 ml-16" : "ml-16"}`}>
        <Header toggleSidebar={toggleSidebar} />
        <h1 className="text-2xl font-semibold text-purple-600 mb-4">Our Laptop</h1>

        {/* Add New Client Button */}
        <div className="flex items-center justify-center">
        <button
          onClick={() => setShowAddModal(true)}
          className="mb-4   p-3 w-40 bg-[#13266A] text-white rounded-lg hover:bg-yellow-950 "
        >
          + Add New Laptop
        </button>
        </div>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by Name"
          className="w-full p-2 border rounded-lg mb-4"
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Clients Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg">
            <thead>
              <tr className="bg-[#13266A] text-white">
                <th className="p-3 text-left">S.No</th>
                <th className="p-3 text-left">title</th>
                <th className="p-3 text-left">desc</th>
                <th className="p-3 text-left">price</th>
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
            {currentLaptops.map((laptop, index) => (
                <tr key={laptop._id} className="border-b hover:bg-gray-100">
                  <td className="p-3 text-left">{indexOfFirstLaptop + index + 1}</td>
                  <td className="p-3 text-left">{laptop.title}</td>
                  <td className="p-3 text-left">{laptop.desc}</td>
                  <td className="p-3 text-left">{laptop.price}</td>
                  <td className="p-3 text-left">
                    <img src={laptop.img} alt={laptop.title} className="w-10 h-10 rounded-full" />
                  </td>
                  <td className="p-3 text-center ">
                    <button
                      className="text-gray-600 hover:text-gray-900 text-2xl"
                      onClick={() => setDropdownOpen(dropdownOpen === laptop._id ? null : laptop._id)}
                    >
                      <MoreVertical size={24} />
                    </button>

                    {dropdownOpen === laptop._id && (
                      <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg z-10">
                        <Link to={`/laptoprental/viewlaptop?id=${laptop._id}`}>
                          <button className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            <Eye size={16} /> View
                          </button>
                        </Link>
                        <Link to={`/laptoprental/editlaptop?id=${laptop._id}`}>
                          <button className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            <Edit size={16} /> Edit
                          </button>
                        </Link>
                        <button
                          className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                          onClick={() => {
                            setDeleteId(laptop._id);
                            setShowDeleteModal(true);
                            setDropdownOpen(null);
                          }}
                        >
                          <Trash2 size={16} /> Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination Controls */}
        <div className="flex justify-end items-center mt-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className={`px-4 py-2 rounded ${currentPage === 1 ? "bg-[#13266A] text-white cursor-not-allowed  hover:bg-yellow-950 " : "bg-[#13266A] text-white hover:bg-yellow-950"}`}
          >
            Prev
          </button>
          <span className="text-gray-700 p-5">Page {currentPage} of {Math.ceil(filteredLaptops.length / laptopsPerPage)}</span>
          <button
            disabled={indexOfLastLaptop >= filteredLaptops.length}
            onClick={() => setCurrentPage(currentPage + 1)}
            className={`px-4 py-2 rounded ${indexOfLastLaptop >= filteredLaptops.length ? "bg-[#13266A] text-white cursor-not-allowed  hover:bg-yellow-950" : "bg-[#13266A] text-white hover:bg-yellow-950"}`}
          >
            Next
          </button>
        </div>
        {/* Add Client Modal */}
        {showAddModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ml-10 p-4">
    <div className="bg-white p-6 w-11/12 max-w-md md:w-96 rounded-lg shadow-md text-center relative">
      
      {/* Close Button */}
      <button
        onClick={closeSearch}
        className="absolute top-3 right-4 text-yellow-950 hover:text-gray-700 text-2xl font-bold"
      >
        ✕
      </button>

      {/* Modal Title */}
      <h2 className="text-lg font-semibold text-[#13266A] mb-4">Add New Laptop</h2>

      {/* Laptop Title */}
      <label className="block text-md font-medium mb-2 text-start">Title:</label>
      <input
        type="text"
        name="title"
        placeholder="Laptop Title"
        className="w-full p-2 border rounded-lg mb-2"
        value={inputs.title}
        onChange={handleInputs}
      />
      {errors.title.required && <span className="text-red-500 text-sm">Title is required</span>}

      {/* Laptop Description */}
      <label className="block text-md font-medium mb-2 text-start">Description:</label>
      <textarea
        name="desc"
        placeholder="Laptop Description"
        className="w-full p-2 border rounded-lg mb-2"
        value={inputs.desc}
        onChange={handleInputs}
      ></textarea>
 {errors.desc.required && <span className="text-red-500 text-sm">Description is required</span>}
      {/* Laptop Price */}
      <label className="block text-md font-medium mb-2 text-start">Price:</label>
      <input
        type="text"
        name="price"
        placeholder="Laptop Price"
        className="w-full p-2 border rounded-lg mb-2"
        value={inputs.price}
        onChange={handleInputs}
      />
      {errors.price.required && <span className="text-red-500 text-sm">Price is required</span>}

      {/* Laptop Image Upload */}
      <label className="block text-md font-medium mb-2 text-start">Image:</label>
      <div className="flex flex-col items-center">
        <label htmlFor="fileInputImage" className="cursor-pointer">
          {inputs.img ? (
            <img
              src={inputs.img}
              width="100"
              height="100"
              alt="Preview"
              className="rounded-lg border shadow-md"
            />
          ) : (
            <FiCamera size={60} className="text-gray-600" />
          )}
        </label>
        <input
          ref={profileRef}
          className="hidden"
          onChange={handleFileInputs}
          name="img"
          id="fileInputImage"
          type="file"
          accept="image/*"
        />
      </div>
      {errors.img.required && <span className="text-red-500 text-sm">Image is required</span>}
      {inputs.img && <p className="text-sm text-gray-700 mt-2">Uploaded: {inputs.fileName}</p>}
      {/* Submit Button */}
      <button
        className="bg-[#13266A] text-white px-6 py-2 rounded-lg mt-4 w-full md:w-auto hover:bg-yellow-950"
        onClick={handleAddLaptop}
      >
        Add Laptop
      </button>
    </div>
  </div>
)}


        {showDeleteModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h2 className="text-lg font-semibold text-purple-600 mb-4">Are you sure you want to delete this laptop?</h2>
              <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Yes, Delete</button>
              <button onClick={() => setShowDeleteModal(false)} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 ml-4">Cancel</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Laptoprental;
      