import { Outlet, createBrowserRouter } from "react-router-dom";
import AuthenticationPage from "./pages/AuthenticationPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    errorElement: <h1>Error</h1>,
    children: [{ index: true, element: <AuthenticationPage /> }],
  },
]);

export default router;
