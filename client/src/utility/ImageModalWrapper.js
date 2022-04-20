// Context for ModalImage

import { useContext, useState, createContext } from "react";

// Creates Context

const ModalContext = createContext(null);
// Context Provider

const ModalProvider = ({ children }) => {
  const [imageData, setImageData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ModalContext.Provider
      value={{ imageData, setImageData, isOpen, setIsOpen }}
    >
      {children}
    </ModalContext.Provider>
  );
};

// Custom hook for consuming Context

const useModalContext = () => {
  return useContext(ModalContext);
};

export { ModalProvider, useModalContext, ModalContext };

function ImageModalWrapper({ children }) {
  return <>{children}</>;
}

export default ImageModalWrapper;
