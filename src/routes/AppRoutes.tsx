import Home from "../pages/Home";
import Register from "../pages/Register";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import About from "../pages/About";
import Contact from "../pages/Contact";
import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "../components/layout/Layout";
import LoginPage from "../pages/LoginPage";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        {" "}
        <Layout />
      </ProtectedRoute>
    ), // Apply Layout to all child routes
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/product/:id",
        element: <ProductDetails />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
