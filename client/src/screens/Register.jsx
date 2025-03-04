import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import login from "../assets/login.jpg";
import logo from "../assets/logo_bgless.png";
import axios from "axios";
import Header from "../components/common/Header";
import config from "../utils/config";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const { firstName, lastName, email, password } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        toast.error("Invalid email format");
        setLoading(false);
        return; 
      }
  
      if (formData.password.length < 8) {
        toast.error("Password must contain at least 8 characters");
        setLoading(false);
        return;
      }
      if (!/[A-Z]/.test(formData.password)) {
        toast.error("Password must contain at least one uppercase letter");
        setLoading(false);
        return;
      }
      if (!/[a-z]/.test(formData.password)) {
        toast.error("Password must contain at least one lowercase letter");
        setLoading(false);
        return;
      }
      if (!/\d/.test(formData.password)) {
        toast.error("Password must contain at least one number");
        setLoading(false)
        return;
      }
      if (!/[!@#$%^&*]/.test(formData.password)) {
        setLoading(false)
        toast.error("Password must contain at least one special character (!@#$%^&*)");
        return;
      }
  
      const response = await axios.post(
        `${config.API_URL}/api/auth/register`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
  
      if (response.status === 201 || response.status === 200) {
        toast.success("Registration Successful!");
        setLoading(false)
        navigate("/login");
        return; 
      }
      toast.error("Unexpected response from server");
    } catch (error) {
      console.error("Registration Error:", error);
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.error || "Invalid input data");
        setLoading(false)
      } 
      else if (error.request) {
        toast.error("No response from server. Please try again later.");
      }
    }
  };
  
  

  return (
    <div className="w-screen h-[100vh] overflow-hidden">
      {/* Image section */}
      <Header />
      <div className="flex">
        <div className="lg:w-1/2">
          <img src={login} alt="login" className="w-full h-full" />
        </div>
        {/* Form section */}
        <div className="lg:w-1/2 flex flex-col justify-center items-center">
          {/* Header */}
          <div className="flex flex-col items-center justify-center">
            <div>
              <img src={logo} alt="logo" className="w-auto h-" />
            </div>
            <div className="ml-6 mt-4 text-center text-4xl font-bold">
              Register to Secure Test
            </div>
          </div>
          {/* Form*/}
          <div className="mt-16 w-[70%]">
            <form
              onSubmit={handleOnSubmit}
              className="mt-6 flex w-full flex-col gap-y-4"
            >
              <label className="w-full">
                <p className="mb-4 text-xl leading-[1.375rem] text-richblack-5 font-[500]">
                  First Name <sup className="text-pink-500">*</sup>
                </p>
                <input
                  required
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={handleOnChange}
                  placeholder="Enter first name"
                  className="form-style w-full border px-4 py-2 rounded-md focus:outline-[0.125px] focus:outline-gray-300"
                />
              </label>
              <label className="w-full">
                <p className="mb-4 text-xl leading-[1.375rem] text-richblack-5 font-[500]">
                  Last Name <sup className="text-pink-500">*</sup>
                </p>
                <input
                  required
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={handleOnChange}
                  placeholder="Enter last name"
                  className="form-style w-full border px-4 py-2 rounded-md focus:outline-[0.125px] focus:outline-gray-300"
                />
              </label>
              <label className="w-full">
                <p className="mb-4 text-xl leading-[1.375rem] text-richblack-5 font-[500]">
                  Email Address <sup className="text-pink-500">*</sup>
                </p>
                <input
                  required
                  type="text"
                  name="email"
                  value={email}
                  onChange={handleOnChange}
                  placeholder="Enter email address"
                  className="form-style w-full border px-4 py-2 rounded-md focus:outline-[0.125px] focus:outline-gray-300"
                />
              </label>
              <label className="relative mt-2">
                <p className="mb-4 text-xl leading-[1.375rem] text-richblack-5 font-[500]">
                  Password <sup className="text-pink-500">*</sup>
                </p>
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={handleOnChange}
                  placeholder="Enter Password"
                  className="form-style w-full !pr-10 border px-4 py-2 rounded-md focus:outline-[0.125px] focus:outline-gray-300"
                />
                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-[46px] z-[10] cursor-pointer"
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible fontSize={24} fill="#6B7280" />
                  ) : (
                    <AiOutlineEye fontSize={24} fill="#6B7280" />
                  )}
                </span>
              </label>
              <Link to="/login">
                <p className="text-center hover:underline underline-offset-2 text-orange-500">
                  Already a member? Login
                </p>
              </Link>
              <button
              type="submit"
              className="w-full group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-orange-500  px-6 font-medium text-white transition hover:shadow-[0_4px_15px_#ff9800]"
            >
              <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-[1.5s] group-hover:[transform:skew(-12deg)_translateX(100%)]">
                <div className="relative h-full w-8 bg-white/20"></div>
              </div>
              <span className="mr-4 text-xl">Sign Up</span>
            </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
