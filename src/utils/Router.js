import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import DashBoard from "../pages/DashBoard";
import Signin from "../pages/Signin";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Signin />,
    },
    {
      path: "/dashboard",
      element: <DashBoard />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default Router;
