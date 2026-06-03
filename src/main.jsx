import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./styles.css";
import App from "./App.jsx";
 
const baseName = import.meta.env.DEV ? "/" : "/webapp-mer-end-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename={baseName}>
      <App />
    </BrowserRouter>
  </StrictMode>
);
