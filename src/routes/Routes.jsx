import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import Home from "../pages/Home.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";
import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout.jsx";
import Meals from "../pages/Meals.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import DashboardLayout from "../pages/dashboard/DashboardLayout.jsx";
import Profile from "../pages/Profile.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage />,
    children: [
      { index: true, Component: Home },

      {
        path: "/login",
        Component: Login,
      },

      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/Meals",
        Component: Meals,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        ),
        children: [
          // {
          //   index: true,
          //   element: <Dash
          // },
          {
            path: "Profile",
            element: <Profile></Profile>
          },
          // {
          //   path: "manage-decorators",
          //   element: <>,
          // },
          // {
          //   path: "add-services",
          //   element: <h3 className="text-center mt-6">Add Services</h3>,
          // },
          // {
          //   path: "manage-services",
          //   element: <h3 className="text-center mt-6">Manage Services</h3>,
          // },
          // {
          //   path: "manage-bookings",
          //   element: <h3 className="text-center mt-6">Manage Bookings</h3>,
          // },
          // {
          //   path: "assign-decorator",
          //   element: <h3 className="text-center mt-6">Assign Decorator</h3>,
          // },
        ],
      },
    ],
  },
]);

export default router;
