import { MainContext } from "context";
import { useContext } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
export const PrivateRoute = ({ children }) => {
  const { mainstate, setMainstate } = useContext(MainContext);
  console.log("privateroute", mainstate);
  const location = useLocation();
  return mainstate.token ? (
    children
  ) : (
    <Navigate to="/authentication/sign-in" state={{ from: location }} replace />
  );
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
