import { createBrowserRouter } from "react-router";

import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import PrivateRoute from "./PrivateRoute.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        Component: Home,
      },

      {
        path: "login",
        Component: Login,
      },

      {
        path: "register",
        Component: Register,
      },

      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <h2 className="text-center mt-10">Private Dashboard</h2>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
