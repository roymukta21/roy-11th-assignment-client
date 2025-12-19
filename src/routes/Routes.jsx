//import { createBrowserRouter } from "react-router";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import Home from "../pages/Home.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";
import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout.jsx";
import Meals from "../pages/Meals.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import Profile from "../pages/Profile.jsx";
import OrderConfirm from "../pages/OrderConfirm.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage/>,
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
        path:"/Meals",
        Component: Meals
      },
      {
        path: "/Profile",
        Component: Profile
      },

      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <h2 className="text-center mt-10">Private Dashboard</h2>
          </PrivateRoute>
        ),
      },
      {
        path: "/order/:id",
        element: (
          <PrivateRoute>
           <OrderConfirm/>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
