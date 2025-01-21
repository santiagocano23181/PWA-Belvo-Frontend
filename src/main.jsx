import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import axios from "axios";

try {
    const functions = require("firebase-functions");
    axios.defaults.baseURL = functions.config().variable.key;
} catch (error) {
    console.log(import.meta.env.VITE_APP_SERVER);
    axios.defaults.baseURL = import.meta.env.VITE_APP_SERVER;
}

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App />
    </StrictMode>
);
