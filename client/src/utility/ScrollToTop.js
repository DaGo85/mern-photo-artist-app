// Utility function scrolling to top on initial pageload

import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const useScrollToTop = () => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [location.pathname]);
};

export default useScrollToTop;
