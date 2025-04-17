// src/components/Layout.tsx
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="my-8">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
