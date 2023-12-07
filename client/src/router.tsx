import { Outlet, createBrowserRouter } from "react-router-dom";
import AuthenticationPage from "./pages/AuthenticationPage";
import MainLayoutPage from "./pages/MainLayoutPage";
import UserPrivateRoutes from "./routing/UserPrivateRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    errorElement: <h1>Error</h1>,
    children: [
      { index: true, element: <AuthenticationPage /> },
      {
        path: "/goods",
        element: <UserPrivateRoutes />,
        children: [{ index: true, element: <MainLayoutPage /> }],
      },
    ],
  },
]);

export default router;
