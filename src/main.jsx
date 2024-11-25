import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";



const router = createBrowserRouter([
  {
    path: "/",
    element: <div></div>,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <RouterProvider router={router} />
  </StrictMode>
);
