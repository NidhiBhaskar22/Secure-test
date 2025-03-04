import { useCallback, useEffect } from "react";

/**
 * Prevent Right Click:
 * User should not be able to access the default context menu on right-click.
 */
export function useDisableContextMenu({ disabled = false } = {}) {
  const contextMenuListener = useCallback((e) => {
    e.preventDefault();
  }, []);

  useEffect(() => {
    const removeListener = () => {
      window.removeEventListener("contextmenu", contextMenuListener);
    };

    if (disabled) return removeListener;

    window.addEventListener("contextmenu", contextMenuListener);
    return removeListener;
  }, [disabled, contextMenuListener]);

  return;
}
