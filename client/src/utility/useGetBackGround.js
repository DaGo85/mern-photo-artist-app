// Custom hook for random background images

import { useEffect, useState } from "react";

function useGetBackGround() {
  const [bg, setBg] = useState("bg-1");

  useEffect(() => {
    const backgrounds = [
      "bg-1",
      "bg-2",
      "bg-3",
      "bg-4",
      "bg-5",
      "bg-6",
      "bg-7",
    ];
    setBg(backgrounds[Math.floor(Math.random() * 7)]);
  }, [setBg]);

  return bg;
}

export default useGetBackGround;
