import React from "react";
import Dashboard from "../components/Dashboard";
import DefaultLayout from "../components/DefaultLayout";

const DashboardContainer = () => {
  return (
    <DefaultLayout>
      <Dashboard />
      <Dashboard />
      <Dashboard />
      <Dashboard />
      <Dashboard />
      <Dashboard />
    </DefaultLayout>
  );
};

export default DashboardContainer;
