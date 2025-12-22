import React from "react";
import { Outlet } from "react-router";
import Footer from "../components/Shared/Footer/Footer";
import Navbar from "../components/Shared/Navbar/Navbar";

const MainLayout = () => {
  return (
    <div className="min h-screen max-w-7xl mx-auto bg-base-100">
      <Navbar></Navbar>
      <main className="max-w-7xl mx-auto">
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
