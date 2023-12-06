import { Navigate, Outlet } from "react-router-dom";

const UserPrivateRoutes = () => {
  const userToken = localStorage.getItem("user-token");

  if (!userToken) return <Navigate to="/" />;
  else {
    const parsedData = JSON.parse(userToken);
    const currentTime = Date.now();

    if (parsedData.expiration && parsedData.expiration < currentTime) {
      localStorage.removeItem("user-token");
    }
  }
  return <Outlet />;
};

export default UserPrivateRoutes;
