import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import "bootstrap";
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const rootElement = document.getElementById("root");
const reactRoot = createRoot(rootElement);

reactRoot.render(
  <StrictMode>
    <ToastContainer ></ToastContainer>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
