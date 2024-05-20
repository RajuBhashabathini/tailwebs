import React, { Suspense, lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const CalenderEvents = lazy(() => import("../components/CalenderEvents"));
const DashBoard = lazy(() => import("../pages/DashBoard"));
const SignIn = lazy(() => import("../pages/SignIn"));

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense loading="SignIn Component is Loading">
          <SignIn />,
        </Suspense>
      ),
    },
    // {
    //   path: "/calender",
    //   element: (
    //     <Suspense loading="CalenderEvents Component is Loading">
    //       <CalenderEvents />,
    //     </Suspense>
    //   ),
    // },
    {
      path: "/dashboard",
      element: (
        <Suspense loading="DashBoard Component is Loading">
          <DashBoard />
        </Suspense>
      ),
    },
  ]);

  return (
    <div className="h-full w-full ">
      <RouterProvider router={router} />
    </div>
  );
};

export default Router;
