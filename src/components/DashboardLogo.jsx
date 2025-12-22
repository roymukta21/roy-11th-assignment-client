import React from "react";

const DashboardLogo = () => {
  return (
    <div className="flex items-center">
      <div>
        <img src="/localChefBazaar.png" alt="" className="w-14 h-14"/>
      </div>
      <div>
        <h1 className="text-xl  font-bold text-primary">LocalChefBazaar</h1>
        <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
      </div>
    </div>
  );
};

export default DashboardLogo;
