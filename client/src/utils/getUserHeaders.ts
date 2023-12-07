export default function getUserHeaders() {
  const userHeaders = localStorage.getItem("user-token");
  if (!userHeaders) return null;
  const parsedData = JSON.parse(userHeaders);
  const headers = {
    "x-auth-token": parsedData.token,
  };
  return headers;
}
