import React from "react";
import { Outlet } from "react-router";
import Footer from "../components/Shared/Footer/Footer";
import Navbar from "../components/Shared/Navbar/Navbar";

const MainLayout = () => {
  return (
    <div className="max-w-7xl mx-auto bg-base-200">
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
