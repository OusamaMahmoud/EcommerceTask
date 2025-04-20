import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="my-10">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
