import { useEffect } from "react";

/**
 * Prevent user selection
 */
export function useSelectionDisable({ disabled = false } = {}) {
  useEffect(() => {
    if (disabled) return;

    const element = document.body;

    const properties = [
      "user-select",
      "-webkit-user-select",
      "-ms-user-select",
      "-moz-user-select",
    ];

    properties.forEach((property) =>
      element.style.setProperty(property, "none")
    );

    return () => {
      properties.forEach((property) =>
        element.style.setProperty(property, "auto")
      );
    };
  }, [disabled]);

  return;
}
