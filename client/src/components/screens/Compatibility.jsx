import { useState, useEffect, useRef } from "react";

export default function WebRTCFullControl() {
  const [isFullscreen, setIsFullscreen] = useState(
    document.fullscreenElement !== null
  );
  const [multipleTabsOpen, setMultipleTabsOpen] = useState(false);
  const [tabActive, setTabActive] = useState(true);
  const videoRef = useRef(null);
  const sessionKey = "webrtc_unique_tab_check"; // Unique session key for tabs

  useEffect(() => {
    // Check for multiple tabs using localStorage
    const checkTabs = () => {
      if (localStorage.getItem(sessionKey)) {
        setMultipleTabsOpen(true);
      } else {
        localStorage.setItem(sessionKey, "active");
        setMultipleTabsOpen(false);
      }
    };

    checkTabs();

    const handleStorageChange = () => {
      checkTabs();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("beforeunload", () => {
      localStorage.removeItem(sessionKey);
    });

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      localStorage.removeItem(sessionKey);
    };
  }, []);

  useEffect(() => {
    // Start WebRTC video stream if no multiple tabs
    async function startWebRTC() {
      try {
        if (!multipleTabsOpen) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
          });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        }
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    }

    startWebRTC();

    // Detect fullscreen changes
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement !== null);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, [multipleTabsOpen]);

  // Detect Tab Switching (Visibility API)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        console.log("Tab is active");
        setTabActive(true);
      } else {
        console.warn("Tab switched or minimized!");
        setTabActive(false);
        alert("⚠️ Please do not switch tabs!");
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  const enterFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error("Error entering fullscreen:", err);
      });
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {multipleTabsOpen && (
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-red-500 text-white p-4 rounded-xl text-center">
          <p className="text-lg font-semibold mb-2">
            Close all other tabs to continue!
          </p>
        </div>
      )}

      {!tabActive && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white p-4 rounded-xl text-center">
          <p className="text-lg font-semibold mb-2">⚠️ Do not switch tabs!</p>
        </div>
      )}

      {!isFullscreen && !multipleTabsOpen && tabActive && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-white shadow-lg p-4 rounded-xl text-center">
          <p className="text-lg font-semibold mb-2">
            Enter Fullscreen for Best Experience
          </p>
          <button
            onClick={enterFullscreen}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Enter Fullscreen
          </button>
        </div>
      )}

      <h1 className="text-2xl font-bold mb-4">WebRTC Video Stream</h1>

      {!multipleTabsOpen && tabActive ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="border border-gray-400 rounded-lg shadow-lg"
        ></video>
      ) : (
        <p className="text-lg font-semibold text-red-600">
          Please close all other tabs and keep this tab active.
        </p>
      )}
    </div>
  );
}
