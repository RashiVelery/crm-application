import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../services/api";

const ProtectedRoute = ({ children }) => {
  const [authorized, setAuthorized] = useState(null);

  useEffect(() => {
    api.get("/customers")
      .then(() => setAuthorized(true))
      .catch(() => setAuthorized(false));
  }, []);

  if (authorized === null) return <p>Loading...</p>;
  return authorized ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
