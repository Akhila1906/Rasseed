import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="container mx-auto mt-20 flex-1 overflow-auto">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default RootLayout;
