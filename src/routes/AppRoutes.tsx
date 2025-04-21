import Home from "../pages/Home";
import Register from "../pages/Register";
import Cart from "../pages/Cart";
import About from "../pages/About";
import Contact from "../pages/Contact";
import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "../components/layout/Layout";
import LoginPage from "../pages/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import { lazy, Suspense } from "react";
import Skeleton from "../components/common/Skeleton";
const ProductDetails = lazy(() => import("../pages/ProductDetails"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/products/:id",
        element: (
          <Suspense fallback={<Skeleton height="80vh" width="100%" />}>
            <ProductDetails />
          </Suspense>
        ),
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
