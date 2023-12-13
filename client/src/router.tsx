import { Outlet, createBrowserRouter } from "react-router-dom";
import AuthenticationPage from "./pages/AuthenticationPage";
import ExplorePage from "./pages/ExplorePage";
import UserPrivateRoutes from "./routing/UserPrivateRoutes";
import WishlistPage from "./pages/WishlistPage";
import BasketPage from "./pages/BasketPage";
import MyStorePage from "./pages/MyStorePage";
import SettingsPage from "./pages/SettingsPage";
import PaymentResultPage from "./pages/PaymentResultPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    errorElement: <h1>Error</h1>,
    children: [
      { index: true, element: <AuthenticationPage /> },
      {
        path: "goods",
        element: <UserPrivateRoutes />,
        children: [
          {
            path: "explore",
            element: <ExplorePage />,
          },
          {
            path: "wishlist",
            element: <WishlistPage />,
          },
          {
            path: "basket",
            element: <BasketPage />,
          },
          {
            path: "my store",
            element: <MyStorePage />,
          },
          {
            path: "settings",
            element: <SettingsPage />,
          },
        ],
      },
      { path: "payment", element: <PaymentResultPage /> },
    ],
  },
]);

export default router;
