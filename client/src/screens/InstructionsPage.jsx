import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const InstructionsPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleStart = async () => {
    setError(null); // Reset error message on each attempt
    try {
      // Request Camera & Mic Permissions
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

      // Request Full-Screen Mode
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      }

      // If successful, navigate to TestPage
      navigate("/test");
    } catch (err) {
      setError("You must allow camera, microphone, and full-screen access to proceed.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-6 bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl text-center">
        <h1 className="text-2xl font-bold">Quiz Instructions</h1>
        <ol className="mt-4 space-y-2 text-gray-700 text-left" type="number">
          <li>Read each question carefully before answering.</li>
          <li>Select the most appropriate answer.</li>
          <li>You cannot go back once the quiz is submitted.</li>
          <li>Ensure your camera and microphone are enabled.</li>
          <li>The quiz will be monitored for security purposes.</li>
          <li>Do not switch tabs or exit fullscreen mode, or your test may be submitted automatically.</li>
        </ol>
        {error && <p className="mt-4 text-red-500 font-semibold">{error}</p>}
        <button
          onClick={handleStart}
          className="mt-6 w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-all"
        >
          Start Test
        </button>
      </div>
    </div>
  );
};

export default InstructionsPage;
