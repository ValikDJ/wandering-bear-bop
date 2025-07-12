import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1); // Remove the '#'
      const element = document.getElementById(id);
      if (element) {
        // Use setTimeout to ensure the element is rendered and the layout is stable
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100); // A small delay might be needed for elements rendered conditionally or after data fetch
      }
    }
  }, [location.hash]);
}