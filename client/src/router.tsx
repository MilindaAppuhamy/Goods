import { Outlet, createBrowserRouter } from "react-router-dom";
import AuthenticationPage from "./pages/AuthenticationPage";
import MainPage from "./pages/MainPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    errorElement: <h1>Error</h1>,
    children: [
      { index: true, element: <AuthenticationPage /> },
      { path: "/goods", element: <MainPage /> },
    ],
  },
]);

export default router;
