import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const questions = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correct: "Paris",
  },
  {
    id: 2,
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correct: "4",
  },
  {
    id: 3,
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    correct: "Mars",
  },
  {
    id: 4,
    question: "Who wrote 'Hamlet'?",
    options: ["Shakespeare", "Hemingway", "Tolkien", "Austen"],
    correct: "Shakespeare",
  },
];

export default function TestPage2() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [violations, setViolations] = useState(0);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Request Camera & Mic Permissions
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((error) => {
        console.error("Error accessing camera and microphone:", error);
        alert(
          "Camera and microphone access is required. The test will be submitted."
        );
        submitExam();
      });

    // Force Fullscreen Mode
    forceFullscreen();

    // Handle Visibility Change (Tab Switching)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        handleViolation();
      }
    };

    // Prevent Fullscreen Exit
    const handleFullscreenExit = () => {
      if (!document.fullscreenElement) {
        handleViolation();
        forceFullscreen();
      }
    };

    // Prevent Window Resizing (Detect Shrinking)
    const handleResize = () => {
      if (window.innerHeight < screen.height - 100 || window.innerWidth < screen.width - 100) {
        handleViolation();
      }
    };

    // Prevent Developer Tools (F12, Ctrl+Shift+I, Ctrl+Shift+J)
    const disableShortcuts = (e) => {
      if (
        e.key === "Escape" || // Block ESC
        e.keyCode === 123 || // Block F12
        (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) // Block Ctrl+Shift+I and Ctrl+Shift+J
      ) {
        e.preventDefault();
        alert("Developer tools and escape key are disabled.");
        handleViolation();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("fullscreenchange", handleFullscreenExit);
    window.addEventListener("resize", handleResize);
    document.addEventListener("keydown", disableShortcuts);
    document.addEventListener("contextmenu", (e) => e.preventDefault()); // Disable Right Click

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("fullscreenchange", handleFullscreenExit);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("keydown", disableShortcuts);
    };
  }, []);

  // Function to force Fullscreen Mode
  const forceFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error("Error enabling fullscreen:", err);
      });
    }
  };

  // Function to handle violations
  const handleViolation = () => {
    setViolations((prev) => {
      const newCount = prev + 1;
      alert(`Warning: Violation ${newCount}/3 detected!`);

      if (newCount >= 3) {
        alert("You have violated the rules multiple times. Submitting your test.");
        submitExam();
      }
      return newCount;
    });
  };

  // Function to submit the exam
  const submitExam = () => {
    navigate("/");
  };

  // Function to handle question selection
  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  // Function to move to the next question
  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    }
  };

  return (
    <div className="flex h-screen p-5 bg-gray-100 relative">
      <div className="flex-1 p-6 bg-white rounded-lg shadow-lg mx-5 flex flex-col justify-between relative">
        <div className="absolute top-4 right-4 w-32 h-24 bg-black rounded-lg overflow-hidden border border-gray-300">
          <video ref={videoRef} autoPlay playsInline className="w-full h-full"></video>
        </div>

        <div className="mt-4 space-y-3">
          <h2 className="text-2xl font-semibold">
            {questions[currentQuestion].question}
          </h2>
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              className={`w-full p-3 text-left border rounded-lg transition-all ${
                selectedOption === option ? "bg-orange-400 text-white" : "bg-gray-100"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="flex justify-between mt-6">
          {currentQuestion > 0 && (
            <button
              onClick={() => setCurrentQuestion(currentQuestion - 1)}
              className="px-4 py-2 bg-orange-400 text-white rounded-lg"
            >
              Previous
            </button>
          )}
          {currentQuestion < questions.length - 1 ? (
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-orange-400 text-white rounded-lg"
            >
              Next
            </button>
          ) : (
            <button
              onClick={submitExam}
              className="px-4 py-2 bg-green-500 text-white rounded-lg"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
