import React from "react";
import { Children } from "../@types/core";
import { useAuthStore } from "@/store/auth";
import { Navigate } from "react-router-dom";

type AppMiddlewareAuthProps = Children & { 
    redirectPath: string;
 };

const AppMiddlewareAuth: React.FC<AppMiddlewareAuthProps> = ({ children,redirectPath }) => {
  const isLogin = useAuthStore((state) => state.isLogin);

  if (!isLogin) {
    return <Navigate to={redirectPath} />;
  }

  return children;
};


export default AppMiddlewareAuth;