import { useCallback, useEffect } from "react";

/**
 * Prevent Copy-Paste
 */
export function useCopyDisable({ disabled = false } = {}) {
  const handleCopy = useCallback((e) => {
    e.preventDefault();
  }, []);

  useEffect(() => {
    const removeListener = () => {
      document.removeEventListener("copy", handleCopy);
    };

    if (disabled) return removeListener;

    document.addEventListener("copy", handleCopy);
    return removeListener;
  }, [disabled, handleCopy]);

  return;
}
