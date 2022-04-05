import React from "react";
import { motion } from "framer-motion";
import PageHeadLine from "../../components/elements/pageheadline";

function Impressum() {
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
      <main className="impressum-bg bg-setup">
        <PageHeadLine headline="Impressum" />
      </main>
    </motion.div>
  );
}

export default Impressum;
