// ProtectedRoute.jsx
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${API_URL}/auth/check`, {
          withCredentials: true,
        });
        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    // optional: show loading spinner while checking auth
    return <div>Loading...</div>;
  }

  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
