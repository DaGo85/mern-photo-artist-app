// Wrapper for transition between pages

import { motion } from "framer-motion";

function TransitionWrapper({ children }) {
  const pageMotion = {
    initial: { opacity: 0, x: 0 },
    animate: { opacity: 1, x: 0, transition: { duration: 1 } },
    exit: { opacity: 0, x: 0, transition: { duration: 1 } },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageMotion}
    >
      {children}
    </motion.div>
  );
}

export default TransitionWrapper;
