import { useCallback, useEffect, useState } from "react";
import devTools from "devtools-detect";
import { isMobileSafari, isIOS, isChrome } from "react-device-detect";

export function useDevToolDetection({ disabled = false } = {}) {
  const [devToolsOpen, setDevToolsOpen] = useState(null);

  /**
   * Dev Tools Access:
   * Prevent all shortcuts from opening dev tools
   */
  const listener = useCallback((e) => {
    if (
      e.key === "F12" ||
      (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key)) ||
      (e.ctrlKey && e.key === "U")
    ) {
      e.preventDefault();
    }
  }, []);

  const devToolsChangeListener = useCallback((event) => {
    setDevToolsOpen(event.detail.isOpen);
  }, []);

  useEffect(() => {
    if (disabled || isMobileSafari || (isIOS && isChrome)) return;

    if (devTools.isOpen) {
      setDevToolsOpen(true);
    }
    window.addEventListener("devtoolschange", devToolsChangeListener);
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
      window.removeEventListener("devtoolschange", devToolsChangeListener);
    };
  }, [disabled, devToolsChangeListener, listener]);

  return { devToolsOpen };
}
