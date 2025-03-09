import React, { useState,useEffect } from "react";
import Header from "../../Components/header";
import MainHeader from "../../Components/mainheader";
import Footer from "../../Components/footer";
import contact from "../../Assests/Images/contact_us.jpg";
import { isValidEmail, isValidPhone } from "../../Utils/validation";
import { toast } from "react-toastify";
import { saveContact } from "../../Api/contactUs";
import AOS from "aos";
import "aos/dist/aos.css";
const Contact = () => {
    const initialStateInputs = {
        name: "",
        email: "",
        mobileNumber: "",
        subject: "",
        message: "",
    };

    const initialStateErrors = {
        name: { required: false },
        email: { required: false, validEmail: false },
        mobileNumber: { required: false, validMobile: false }, // Fixed key
        subject: { required: false },
        message: { required: false }, // Fixed key
    };

    const [inputs, setInputs] = useState(initialStateInputs);
    const [errors, setErrors] = useState(initialStateErrors);
    const [submitted, setSubmitted] = useState(false);

    const handleValidation = (data) => {
        let error = { ...initialStateErrors };

        if (data.name === "") {
            error.name.required = true;
        }
        if (data.email === "") {
            error.email.required = true;
        }if (!isValidEmail(data.email)) {
            error.email.validEmail = true;
        }
        if (data.mobileNumber === "") {
            error.mobileNumber.required = true;
        } if (!isValidPhone(data.mobileNumber)) {
            error.mobileNumber.validMobile = true;
        }
        if (data.subject === "") {
            error.subject.required = true;
        }
        if (data.message === "") {
            error.message.required = true;
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

    const handleSubmit = (event) => {
        event.preventDefault();
        const newError = handleValidation(inputs);
        setErrors(newError);
        setSubmitted(true);
        if (handleErrors(newError)) {
            saveContact(inputs)
                .then((res) => {
                    toast.success(res?.data?.message);
                    event.target.reset();
                    setInputs(initialStateInputs);
                    setErrors(initialStateErrors);
                    setSubmitted(false);
                })
                .catch((err) => {
                    toast.error(err?.response?.data?.message);
                });
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
            <div className="min-h-screen bg-gray-100 p-6 -z-10">
                <div className="max-w-5xl mx-auto">
                    <div data-aos="flip-left" className="bg-white shadow-md rounded-lg p-6 mb-8 flex flex-wrap">
                        <div className="w-full md:w-1/2">
                            <h1 className="text-2xl font-medium mb-4">Contact Us:</h1>
                            <h2 className="text-xl font-semibold mb-4">India – Head Office</h2>
                            <p className="text-gray-700 mb-4">
                                <span className="font-semibold">PIXALIVE TECHNOLOGY SERVICES PVT LTD</span><br />
                                3rd Floor, Reliance Smart Bazaar Building<br />
                                Behind Electronic City Bus Stand<br />
                                2nd Phase, 35/2, Hosur Road, Konappana Agrahara<br />
                                Electronic City, Bengaluru, Karnataka – 560100<br />
                                <strong>Mobile:</strong> +91 9876543210, +91 8765432109
                            </p>
                        </div>
                        <div className="flex justify-center w-full md:w-1/2 mt-4 md:mt-0">
                            <img src={contact} alt="Contact Center" className="rounded-md shadow-md w-full h-full object-contain" />
                        </div>
                    </div>

                    <div data-aos="flip-right" className="shadow-lg rounded-lg p-6 mb-8 bg-gradient-to-r from-yellow-950 to-[#13256B]">
                        <h2 className="text-2xl font-semibold mb-4 text-center text-white">Get In Touch</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-white font-medium mb-1">Full Name</label>
                                    <input type="text" name="name" value={inputs.name} onChange={handleInputs} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400" placeholder="Enter your name" />
                                    {errors.name?.required && <p className="text-red-500 text-sm">Name is required</p>}
                                </div>
                                <div>
                                    <label className="block text-white font-medium mb-1">Email Address</label>
                                    <input type="email" name="email" value={inputs.email} onChange={handleInputs} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400" placeholder="Enter your email" />
                                    {errors.email?.required && <p className="text-red-500 text-sm">Email is required</p>}
                                    {errors.email?.validEmail && <p className="text-red-500 text-sm">Email is invalid</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-white font-medium mb-1">Mobile Number</label>
                                <input type="tel" name="mobileNumber" value={inputs.mobileNumber} onChange={handleInputs} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400" placeholder="Enter mobile number" />
                                {errors.mobileNumber?.required && <p className="text-red-500 text-sm">Mobile number is required</p>}
                                {errors.mobileNumber?.validMobile && <p className="text-red-500 text-sm">Invalid mobile number</p>}
                            </div>

                            <div>
                                <label className="block text-white font-medium mb-1">Subject</label>
                                <input type="text" name="subject" value={inputs.subject} onChange={handleInputs} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400" placeholder="Enter subject" />
                                {errors.subject?.required && <p className="text-red-500 text-sm">Subject is required</p>}
                            </div>

                            <div>
                                <label className="block text-white font-medium mb-1">Message</label>
                                <textarea name="message" value={inputs.message} onChange={handleInputs} rows="5" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400" placeholder="Type your message..."></textarea>
                                {errors.message?.required && <p className="text-red-500 text-sm">Message is required</p>}
                            </div>

                            <div className="text-center">
                                <button type="submit" className="bg-white text-gray-900 font-semibold py-3 px-6 rounded-lg hover:bg-yellow-600 hover:text-white border border-gray-300 transition duration-300">Send Message</button>
                            </div>
                        </form>
                    </div>

                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.095836460991!2d77.67281437484374!3d12.840396417435966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae6caa79f28a9d%3A0x6fc579503c514c!2sReliance%20Smart%20Bazaar!5e0!3m2!1sen!2sin!4v1707570123456!5m2!1sen!2sin" width="100%" height="400" style={{ border: 0 }} allowFullScreen="" loading="lazy"></iframe>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Contact;
