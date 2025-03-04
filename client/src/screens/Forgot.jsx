import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { setAuth } from "../redux/slices/authSlice";
import login from "../assets/login.jpg";
import axios from "axios";
import logo from "../assets/logo_bgless.png";
import Header from "../components/common/Header";
import { toast } from "react-toastify";
import config from "../utils/config";

const ForgetPage = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [tempToken, setTempToken] = useState("");
  const inputRefs = useRef([]);

  const handleOtpChange = (value, index) => {
    if (/^\d$/.test(value) || value === "") {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);

      // Move to next input box if value is entered
      if (value && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleGetOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${config.API_URL}/api/auth/forgot-password`,
        { email }
      );
      if (response) {
        toast.success("OTP sent to email.");
        setStep(2);
      } else {
        toast.error("Error in sending email.");
      }
    } catch (err) {
      console.error("Error sending OTP:", err);
      toast.error("Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const otpValue = otp.join("");
      const response = await axios.post(
        `${config.API_URL}/api/auth/verify-otp`,
        { email, otp: otpValue }
      );
      toast.success(response.data.message);
      if (response) {
        const token = response.data.tempToken;
        setTempToken(token);
      }
      setStep(3);
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Failed to verify OTP. Please try again.");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${config.API_URL}/api/auth/reset-password`,
        {
          tempToken,
          newPassword: newPassword,
        }
      );
      toast.success(response.data.message);
      setStep(1);
      setEmail("");
      setOtp("");
      setNewPassword("");
      navigate("/login");
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error("Failed to reset password. Please try again.");
    }
  };

  const renderHeadingAndText = () => {
    switch (step) {
      case 1:
        return (
            <p className="text-orange-400 text-2xl mb-16">
              Enter your email to receive the OTP.
            </p>
        );
      case 2:
        return (
            <p className="text-orange-400 text-2xl mb-16">
              Enter the OTP sent to your email.
            </p>
        );

      case 3:
        return (
            <p className="text-orange-400 text-2xl mb-16">
              Set your new password.
            </p>
        );
      default:
        return null;
    }
  };

  const renderForm = () => {
    switch (step) {
      case 1:
        return (
          <form onSubmit={handleGetOtp} className="space-y-6">
            <label className="w-full" htmlFor="email">
                <p className="mb-4 text-xl leading-[1.375rem] text-richblack-5 font-[500]">
                  Email Address <sup className="text-pink-500">*</sup>
                </p>
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e)=>{ setEmail(e.target.value)}}
                  placeholder="Enter email address"
                  className="form-style w-full border px-4 py-2 rounded-md focus:outline-[0.5px] focus:outline-gray-300"
                />
              </label>
            <button
              type="submit"
              className="w-full group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-orange-500  px-6 font-medium text-white transition hover:shadow-[0_4px_15px_#ff9800]"
            >
              <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-[1.5s] group-hover:[transform:skew(-12deg)_translateX(100%)]">
                <div className="relative h-full w-8 bg-white/20"></div>
              </div>
              <span className="mr-4 text-xl">
                {!isLoading ? "Send OTP" : "Sending..."}
              </span>
              {!isLoading ? (
                <svg
                  fill="#ffffff"
                  height={"20px"}
                  width={"20px"}
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 495.003 495.003"
                  xmlSpace="preserve"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <g id="XMLID_51_">
                      {" "}
                      <path
                        id="XMLID_53_"
                        d="M164.711,456.687c0,2.966,1.647,5.686,4.266,7.072c2.617,1.385,5.799,1.207,8.245-0.468l55.09-37.616 l-67.6-32.22V456.687z"
                      ></path>{" "}
                      <path
                        id="XMLID_52_"
                        d="M492.431,32.443c-1.513-1.395-3.466-2.125-5.44-2.125c-1.19,0-2.377,0.264-3.5,0.816L7.905,264.422 c-4.861,2.389-7.937,7.353-7.904,12.783c0.033,5.423,3.161,10.353,8.057,12.689l125.342,59.724l250.62-205.99L164.455,364.414 l156.145,74.4c1.918,0.919,4.012,1.376,6.084,1.376c1.768,0,3.519-0.322,5.186-0.977c3.637-1.438,6.527-4.318,7.97-7.956 L494.436,41.257C495.66,38.188,494.862,34.679,492.431,32.443z"
                      ></path>{" "}
                    </g>{" "}
                  </g>
                </svg>
              ) : (
                ""
              )}
            </button>
          </form>
        );
      case 2:
        return (
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <div className="flex justify-center gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  value={digit}
                  maxLength={1}
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                  onKeyDown={(e) => handleOtpKeyDown(e, index)}
                  ref={(el) => (inputRefs.current[index] = el)}
                  className="w-12 h-12 text-center text-lg border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ))}
            </div>
            <button
              type="submit"
              className="w-full group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-orange-500 px-6 font-medium text-white transition hover:shadow-[0_4px_15px_#ff9800]"
            >
              <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-[1.5s] group-hover:[transform:skew(-12deg)_translateX(100%)]">
                <div className="relative h-full w-8 bg-white/20"></div>
              </div>
              <span className="mr-4 text-xl">Verify OTP</span>
            </button>
          </form>
        );
      case 3:
        return (
          <form onSubmit={handleResetPassword} className="space-y-6">
            <label className="w-full" htmlFor="password">
                <p className="mb-4 text-xl leading-[1.375rem] text-richblack-5 font-[500]">
                  New Password<sup className="text-pink-500">*</sup>
                </p>
                <input
                  required
                  type="password"
                  name="password"
                  value={newPassword}
                  onChange={(e)=>{setNewPassword(e.target.value)}}
                  placeholder="Enter email address"
                  className="form-style w-full border px-4 py-2 rounded-md focus:outline-[0.5px] focus:outline-gray-300"
                />
              </label>
            <button
              type="submit"
              className="w-full group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-orange-500  px-6 font-medium text-white transition hover:shadow-[0_4px_15px_#ff9800]"
            >
              <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-[1.5s] group-hover:[transform:skew(-12deg)_translateX(100%)]">
                <div className="relative h-full w-8 bg-white/20"></div>
              </div>
              <span className="mr-4 text-xl">Reset Password</span>
            </button>
          </form>
        );
      default:
        return null;
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "") {
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${config.API_URL}/api/auth/login`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data?.token) {
        toast.success("Login successful!");
        dispatch(setAuth(response.data));
        navigate("/");
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] overflow-hidden">
      {/* Image section */}
      <Header />
      <div className="flex">
        <div className="lg:w-1/2">
          <img src={login} alt="login" className="w-full h-full" />
        </div>
        {/* Form section */}
        <div className="lg:w-1/2 flex flex-col justify-center items-center">
          {/* Header */}
          <div className="flex flex-col justify-center items-center">
            <div>
              <img src={logo} alt="logo" className="w-auto h-" />
            </div>
            <div className="ml-6 mt-4 text-center text-4xl font-bold">
              {renderHeadingAndText()}
            </div>
          </div>
          {/* Form*/}
          <div className="mt-4 w-[70%]">
            {renderForm()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPage;
