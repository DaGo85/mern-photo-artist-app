import React from "react";
import { motion } from "framer-motion";
import PageHeadLine from "../../components/elements/pageheadline";

function Contact() {
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
      <main className="home-bg bg-setup">
        <PageHeadLine headline="Contact" />
      </main>
    </motion.div>
  );
}

export default Contact;
