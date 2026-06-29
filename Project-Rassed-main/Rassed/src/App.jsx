import React from "react";
import Header from "./components/Header";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import HomePage from "./components/HomePage";
import DashBoard from "./components/DashBoard";
import UploadPage from "./components/UploadPage";
import QueryPage from "./components/QueryPage";
import Transactions from "./components/Transactions";
import Settings from "./components/Settings";
import { ClerkProvider } from "@clerk/clerk-react";
import Signin from "./components/Signin";
import Signup from "./components/Signup";

function App() {
  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key");
  }

  const browserRouterObj = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/dashboard",
          element: <DashBoard />,
        },
        {
          path: "/upload",
          element: <UploadPage />,
        },
        {
          path: "/query",
          element: <QueryPage />,
        },
        {
          path: "/transactions",
          element: <Transactions />,
        },
        {
          path: "/settings",
          element: <Settings />,
        },
      ],
    },
    {
      path: "/signin",
      element: <Signin />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
  ]);

  return (
    <div>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <RouterProvider router={browserRouterObj} />
      </ClerkProvider>
    </div>
  );
}

export default App;
