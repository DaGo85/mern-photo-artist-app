// Whole app with all providers

import "./index.css";
import App from "./App";

import { ModalProvider } from "./utility/ImageModalWrapper";
import { AuthProvider } from "./utility/AuthContextProvider";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ModalProvider>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </ModalProvider>
  </React.StrictMode>
);
