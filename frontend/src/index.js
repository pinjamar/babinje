import { createRoot } from "react-dom/client";
import React from "react";
import Error from "./router/Error"
import ItemList from "./pages/ItemList"

import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
  
import App from "./App";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <Error />,
      children: [{
        path: "",
        element: <ItemList />,
      }],
    },
  ]);

createRoot(document.getElementById("app")).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );