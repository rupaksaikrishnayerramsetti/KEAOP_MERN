import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";

type ProtectedRouteProps = {
  isTokenCreated: boolean;
  setIsTokenCreated: (value: boolean) => void;
};

function ProtectedRoute({
  isTokenCreated,
  setIsTokenCreated,
}: ProtectedRouteProps) {
  const isAuthenticated: boolean = !!localStorage.getItem("jwt_token");
  // eslint-disable-next-line no-lone-blocks
  {
    setIsTokenCreated(isAuthenticated);
  }
  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
}

export default ProtectedRoute;
