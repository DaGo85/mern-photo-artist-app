import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useModalContext } from "../../utility/ImageModalWrapper";
import OrientedImage from "../elements/OrientedImage";

// Used in: singlepost, gallerygrid, singlestory? and singlestorygrid,

function ImageModal() {
  const { imageData, isOpen, setIsOpen } = useModalContext();
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (imageData.images) {
      setIdx(
        imageData.images.findIndex(
          (image) => image.photo === imageData.currentimage.photo
        )
      );
    }
  }, [imageData]);

  return (
    <AnimatePresence>
      {isOpen && imageData.images.length > 0 && (
        <div className="bg-slate-600/80 top-0 left-0 fixed w-full h-full inset-0 flex justify-center items-center z-50">
          <button
            onClick={() => setIsOpen(false)}
            type="button"
            className="animate-buttonPulse bg-transparent hover:bg-blue-900/75 rounded-2xl p-1.5 ml-auto inline-flex items-center absolute right-16 top-16"
          >
            <svg
              stroke="currentColor"
              className="w-10 h-10"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
            </svg>
          </button>
          <button
            disabled={idx === 0}
            onClick={() => {
              setIdx((prevIdx) => prevIdx - 1);
            }}
            className="hover:bg-blue-900/75 animate-buttonPulse w-12 h-full opacity-75 hover:opacity-100 disabled:opacity-0 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300 absolute left-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <motion.div
            key={imageData.images[idx].photo}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 50 }}
            whileInView="visible"
            viewport={{ once: true }}
          >
            <OrientedImage
              image={imageData.images[idx].photo}
              path={imageData.path.url}
              alt="geöffnet in der Detailansicht"
              orientation={imageData.orientation}
            />
          </motion.div>
          <button
            disabled={idx === imageData.images.length - 1}
            onClick={() => {
              setIdx((prevIdx) => prevIdx + 1);
            }}
            className="hover:bg-blue-900/75 animate-buttonPulse w-12 h-full absolute 
		  opacity-75 hover:opacity-100 disabled:opacity-0 disabled:cursor-not-allowed z-10
		   p-0 m-0 transition-all ease-in-out duration-300 right-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
          <span className="absolute bottom-20 left-20">
            <p className="animate-buttonPulse">
              von: {imageData.images[idx].username}
              <br />
              am: {new Date(imageData.images[idx].createdAt).toDateString()}
            </p>
          </span>
        </div>
      )}
    </AnimatePresence>
  );
}

export default ImageModal;
