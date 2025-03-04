import { useState, useCallback, useEffect } from "react";

export function useTabFocusDetection({ disabled = false } = {}) {
  const [tabFocusStatus, setTabFocusStatus] = useState(true);

  const visibilityChange = useCallback(() => {
    setTabFocusStatus(!document.hidden);
  }, []);

  useEffect(() => {
    if (disabled) return;

    var browserPrefixes = ["moz", "ms", "o", "webkit"],
      isVisible = true;

    function getHiddenPropertyName(prefix) {
      return prefix ? prefix + "Hidden" : "hidden";
    }

    function getVisibilityEvent(prefix) {
      return (prefix ? prefix : "") + "visibilitychange";
    }

    function getBrowserPrefix() {
      for (var i = 0; i < browserPrefixes.length; i++) {
        if (getHiddenPropertyName(browserPrefixes[i]) in document) {
          return browserPrefixes[i];
        }
      }
      return null;
    }

    const browserPrefix = getBrowserPrefix();
    const hiddenPropertyName = getHiddenPropertyName(browserPrefix);
    const visibilityEventName = getVisibilityEvent(browserPrefix);

    function onVisible() {
      if (isVisible) return;
      isVisible = true;
      setTabFocusStatus(true);
    }

    function onHidden() {
      if (!isVisible) return;
      isVisible = false;
      setTabFocusStatus(false);
    }

    function handleVisibilityChange(forcedFlag) {
      if (typeof forcedFlag === "boolean") {
        return forcedFlag ? onVisible() : onHidden();
      }

      if (document[hiddenPropertyName]) {
        return onHidden();
      }

      return onVisible();
    }

    document.addEventListener(
      visibilityEventName,
      handleVisibilityChange,
      false
    );

    document.addEventListener(
      "focus",
      () => handleVisibilityChange(true),
      false
    );
    document.addEventListener(
      "blur",
      () => handleVisibilityChange(false),
      false
    );
    window.addEventListener("focus", () => handleVisibilityChange(true), false);
    window.addEventListener("blur", () => handleVisibilityChange(false), false);

    return () => {
      document.removeEventListener(visibilityEventName, handleVisibilityChange);
      document.removeEventListener("focus", () => handleVisibilityChange(true));
      document.removeEventListener("blur", () => handleVisibilityChange(false));
      window.removeEventListener("focus", () => handleVisibilityChange(true));
      window.removeEventListener("blur", () => handleVisibilityChange(false));
    };
  }, []);

  return { tabFocusStatus };
}
