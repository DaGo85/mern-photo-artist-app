import React, { useEffect } from "react";
import { motion } from "framer-motion";
import useStorage from "../../../utility/useFirestorage";

const ProgressBar = ({ selected, setSelected }) => {
  const { progress, url } = useStorage(selected);

  useEffect(() => {
    if (url) {
      setSelected(null);
    }
  }, [url, setSelected]);

  return (
    <motion.div
      className="progress-bar"
      initial={{ width: 0 }}
      animate={{ width: progress + "%" }}
    ></motion.div>
  );
};

export default ProgressBar;
