import { useEffect, useState } from "react";

function useGetBackGround() {
  const [bg, setBg] = useState("bg-1");
  const backgrounds = ["bg-1", "bg-2", "bg-3", "bg-4", "bg-5"];
  useEffect(() => {
    setBg(backgrounds[Math.floor(Math.random() * 5)]);
  }, []);

  console.log("getback");

  return bg;
}

export default useGetBackGround;
