import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isValidEmail } from "../../Utils/validation";
import { getLoginType, saveToken } from "../../Utils/storage";
import { isAuthenticated } from "../../Utils/auth";
import { toast } from "react-toastify";
import { adminLogin } from "../../Api/login";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  let initilastateinputs = {
    email: "",
    password: "",
  };

  let initialstateerrors = {
    email: { required: false },
    password: { required: false },
  };

  const [inputs, setInputs] = useState(initilastateinputs);
  const [errors, setErrors] = useState(initialstateerrors);
  const [submitted, SetSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleValidation = (data) => {
    let error = initialstateerrors;

    if (data.email === "") {
      error.email.required = true;
    }
    if (data.password === "") {
      error.password.required = true;
    }
    if (!isValidEmail(data.email)) {
      error.email.valid = true;
    }
    return error;
  };

  const handleInputs = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
    if (submitted) {
      const newError = handleValidation({
        ...inputs,
        [event.target.name]: event.target.value,
      });
      setErrors(newError);
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
    SetSubmitted(true);
    if (handleErrors(newError)) {
      const data = {
        email: inputs.email,
        password: inputs.password,
      };
      adminLogin(data)
        .then((res) => {
          let token = res?.data?.result?.token;
          let loginType = res?.data?.result?.loginType;
          let Admin = res?.data?.result?.adminDetails?._id;
          console.log("res",res);
          if (loginType === "Admin") {
            let data = {
              token: token,
              loginType: loginType,
              Admin: Admin,
            };
            saveToken(data);
            if (isAuthenticated()) {
              if (getLoginType() === "Admin") {
                navigate("/dashboard");
              }
            }
            toast.success(res?.data?.message||"Login Successfully");
          } else {
            toast.error(res?.data?.err?.message||"Login Failed");
          }
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message||"Login Failed");
          console.log(err);
        });
    }
  };

  if (isAuthenticated()) {
    if (getLoginType() === "Admin") {
      navigate("/dashboard");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6">
        <div className="flex justify-center mb-4">
          <img
            src={require("../../Assests/Images/pixalive_logo.jpeg")}
            alt="logo"
            className="h-16 w-auto"
          />
        </div>
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Login as Admin!
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6 from to">
          {/* Email Input */}
          <div>
            <input
              type="email"
              name="email"
              required
              value={inputs.email}
              onChange={handleInputs}
              placeholder="Enter your Email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.email.required ? (
              <p className="text-sm text-red-500 mt-1">This field is required</p>
            ) : errors.email.valid ? (
              <p className="text-sm text-red-500 mt-1">Enter a valid email</p>
            ) : null}
          </div>
          {/* Password Input */}
          <div>
            <input
              type="password"
              name="password"
              required
              value={inputs.password}
              onChange={handleInputs}
              placeholder="Enter your Password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.password.required ? (
              <p className="text-sm text-red-500 mt-1">This field is required</p>
            ) : errors.password.valid ? (
              <p className="text-sm text-red-500 mt-1">Enter a valid password</p>
            ) : null}
          </div>
          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
