import { Navigate } from "react-router-dom";
import MainLayoutPage from "../pages/MainLayoutPage";

const UserPrivateRoutes = () => {
  const userToken = localStorage.getItem("user-token");

  if (!userToken) return <Navigate to="/" />;
  else {
    const parsedData = JSON.parse(userToken);
    const currentTime = Date.now();

    if (parsedData.expiration && parsedData.expiration < currentTime) {
      localStorage.removeItem("user-token");
      localStorage.removeItem("userId");
    }
  }
  return <MainLayoutPage />;
};

export default UserPrivateRoutes;
