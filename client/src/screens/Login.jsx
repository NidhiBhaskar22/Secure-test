import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuth } from "../redux/slices/authSlice";
import login from "../assets/login.jpg";
import axios from "axios";
import logo from "../assets/logo_bgless.png";
import Header from "../components/common/Header";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import config from "../utils/config";

const LoginPage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { email, password } = formData;

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
      if (!formData.password) {
        toast.error("Password cannot be empty");
        setLoading(false);
        return;
      }
  
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
      console.error("Login Error:", error);
  
      if (error.response) {
        if (error.response.status === 400) {
          toast.error("Invalid input data. Please check your details.");
        } else if (error.response.status === 401) {
          toast.error("Invalid credentials. Please check your email or password.");
        } else if (error.response.status === 500) {
          toast.error("Server error. Please try again later.");
        } else {
          toast.error(error.response.data.error || "Something went wrong.");
        }
      } else if (error.request) {
        toast.error("No response from server. Please check your connection.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
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
          <div className="flex flex-col items-center">
            <div>
              <img src={logo} alt="logo" className="w-auto h-" />
            </div>
            <div className="ml-6 mt-4 text-center text-4xl font-bold">
              Welcome to Secure Test
            </div>
          </div>
          {/* Form*/}
          <div className="mt-20 w-[70%]">
            <form
              onSubmit={handleOnSubmit}
              className="mt-6 flex w-full flex-col gap-y-4"
            >
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
                  className="form-style w-full border px-4 py-2 rounded-md focus:outline-[0.5px] focus:outline-gray-300"
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
                  className="form-style w-full !pr-10 border px-4 py-2 rounded-md focus:outline-[0.5px] focus:outline-gray-300"
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
                <Link to="/forget-password">
                  <p className="mt-4 ml-auto mr-2 max-w-max text-sm text-blue-900">
                    Forgot Password
                  </p>
                </Link>
              </label>
              <Link to="/register">
                <p className="text-center hover:underline underline-offset-2 text-orange-500">
                  Not a member? Create new account
                </p>
              </Link>
              <button
              type="submit"
              className="w-full group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-orange-500  px-6 font-medium text-white transition hover:shadow-[0_4px_15px_#ff9800]"
            >
              <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-[1.5s] group-hover:[transform:skew(-12deg)_translateX(100%)]">
                <div className="relative h-full w-8 bg-white/20"></div>
              </div>
              <span className="mr-4 text-xl">{!loading ? "Sign In":"Signing in..."}</span>
            </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
