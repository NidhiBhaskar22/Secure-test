import { useState, useMemo, useEffect } from "react";

export function useIntersectionObserver(ref) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) =>
        setIsIntersecting(entry.isIntersecting)
      ),
    []
  );

  useEffect(() => {
    if (!ref.current) return;
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref.current, observer]);

  return { isIntersecting };
}
