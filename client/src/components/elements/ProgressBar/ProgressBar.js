import React, { useEffect } from "react";
import { motion } from "framer-motion";
import useStorage from "../../../utility/useFirestorage";

const ProgressBar = ({ selected, setSelected, setUrl, setFile }) => {
  const { progress, url } = useStorage(selected);

  useEffect(() => {
    if (url) {
      setUrl(url);
      setFile(null);
      setSelected(null);
    }
  }, [url, setSelected, setUrl, setFile]);

  return (
    <div className="h-20 w-72 ">
      <motion.div
        className="progress-bar"
        initial={{ width: 0 }}
        animate={{ width: progress + "%" }}
      ></motion.div>
    </div>
  );
};

export default ProgressBar;
