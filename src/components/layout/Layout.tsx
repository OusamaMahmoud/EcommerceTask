// src/components/Layout.tsx
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
      {/* Optionally, you can add a footer here */}
      <Footer />
    </div>
  );
};

export default Layout;
