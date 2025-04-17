import { ToastContainer } from "react-toastify";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <>
      <AppRoutes />
      <ToastContainer />
    </>
  );
}
