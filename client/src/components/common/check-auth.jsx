import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  console.log("CheckAuth - Location:", location.pathname);
  console.log("CheckAuth - isAuthenticated:", isAuthenticated);
  console.log("CheckAuth - user:", user);

  // Always redirect any /auth/* route to the home page EXCEPT for login and register
  if (location.pathname.startsWith("/auth") && 
      location.pathname !== "/login" && 
      location.pathname !== "/signup") {
    return <Navigate to="/shop/home" replace />;
  }

  if (location.pathname === "/") {
    if (!isAuthenticated) {
      return <Navigate to="/auth/login" />;
    } else {
      if (user?.role === "admin") {
        return <Navigate to="/admin/dashboard" />;
      } else {
        return <Navigate to="/shop/home" />;
      }
    }
  }

  // Do not force unauthenticated users to /auth; let them browse

  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/shop/home" />;
    }
  }

  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }

  // Only redirect admin users from shop to admin dashboard if they're not already on the login page
  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("shop") &&
    !location.pathname.includes("login")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  return <>{children}</>;
}

CheckAuth.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    role: PropTypes.string,
  }),
  children: PropTypes.node,
};

export default CheckAuth;