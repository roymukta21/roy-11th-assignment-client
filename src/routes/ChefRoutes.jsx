import React from "react";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import Loading from "../components/Loading";
import Forbidden from "../components/Forbidden";

const ChefRoutes = ({ children }) => {
  const { loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) {
    return <Loading />;
  }
  if (role !== "chef") {
    return <Forbidden />;
  }
  return children;
};

export default ChefRoutes;
