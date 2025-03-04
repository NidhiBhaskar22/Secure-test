import { useState, useCallback, useEffect } from "react";
import { isMobileSafari, isIOS, isChrome } from "react-device-detect";

export const triggerFullscreen = () => {
  const methods = [
    "requestFullscreen",
    "webkitRequestFullscreen",
    "webkitRequestFullScreen",
    "mozRequestFullScreen",
    "msRequestFullscreen",
  ];

  const ref = document.documentElement; // ✅ Use full page instead of body
  if (ref) {
    for (const name of methods) {
      if (name in ref) {
        ref[name]?.()?.catch((err) => {
          console.error("Fullscreen error:", err);
        });
        ref.style.overflowY = "auto";
        break;
      }
    }
  }
};

export function useFullScreenDetection({ disabled = false } = {}) {
  const [fullScreenStatus, setFullScreenStatus] = useState("pending");
  const [isFullscreenEnabled, setIsFullscreenEnabled] = useState(false); // ✅ Track if fullscreen is enabled

  const changeFullscreenStatus = useCallback(() => {
    const isFullScreenNow =
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement;

    setFullScreenStatus(isFullScreenNow ? "on" : "off");

    // If fullscreen is exited after being enabled, force fullscreen again
    if (isFullscreenEnabled && !isFullScreenNow) {
      console.warn("User attempted to exit fullscreen!");
      setTimeout(triggerFullscreen, 100);
    }
  }, [isFullscreenEnabled]);

  const preventFullscreenExit = useCallback((e) => {
    if (["F11", "Escape"].includes(e.key)) {
      e.preventDefault();
      console.warn("Blocked fullscreen exit attempt!");
      triggerFullscreen();
    }
  }, []);

  // 🔹 Call this function when the user starts the test
  const enableFullscreenMode = () => {
    setIsFullscreenEnabled(true); // ✅ Mark that fullscreen is enabled
    triggerFullscreen(); // ✅ Force fullscreen
  };

  useEffect(() => {
    if (disabled || isFullscreenEnabled === false) return; // ✅ Only run detection after fullscreen is enabled

    if (isMobileSafari || (isChrome && isIOS)) {
      setFullScreenStatus("not-supported");
      return;
    }

    changeFullscreenStatus();

    document.addEventListener("fullscreenchange", changeFullscreenStatus);
    document.addEventListener("keydown", preventFullscreenExit);
    window.addEventListener("beforeunload", (event) => {
      event.preventDefault();
      event.returnValue =
        "Are you sure you want to leave? Your test will be terminated.";
    });

    return () => {
      document.removeEventListener("fullscreenchange", changeFullscreenStatus);
      document.removeEventListener("keydown", preventFullscreenExit);
      window.removeEventListener("beforeunload", () => {});
    };
  }, [disabled, isFullscreenEnabled]);

  return { fullScreenStatus, enableFullscreenMode };
}
