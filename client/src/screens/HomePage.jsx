// import React from "react";
import Header from "../components/common/Header";
import { Link } from "react-router-dom";
import Hero from "../assets/Hero.jpg";

const HomePage = () => {
  return (
    <div className="relative flex flex-col justify-center items-center">
      <div className="fixed top-0 w-full z-40">
        <Header />
      </div>
      <div className="">
        <div className="relative isolate">
          <div className="mx-auto w-[80%] px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
            <div className="mx-auto w-1/2 lg:mx-0 lg:flex-auto">
              <h1 className="mt-10 text-pretty text-5xl font-semibold tracking-tight text-orange-500 sm:text-7xl ml-12">
                A better way to proctor your Quizzes
              </h1>
              <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8 ml-12">
              SecureTest provides a seamless and secure environment for conducting online exams. Whether you're a student, a professional, or an organization, we ensure fairness, security, and accuracy in every test.
              </p>
              <div className="mt-10 flex items-center gap-x-6 ml-12">
                <Link
                  to="/instructions"
                  className="rounded-md bg-orange-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Get started
                </Link>
                <Link href="/register" className="text-sm/6 font-semibold text-gray-900">
                  Sign Up <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
            <div className="mt-16 sm:mt-24 lg:mt-0 lg:shrink-0 lg:grow w-1/2">
            <img src={Hero} alt="hero"></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
