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
import MyOrders from "../pages/dashboard/user/MyOrders.jsx";
import MyReviews from "../pages/dashboard/user/MyReviews.jsx";
import FavoriteMeals from "../pages/dashboard/user/FavoriteMeals.jsx";
import ChefRoutes from "./ChefRoutes.jsx";
import MyMeals from "../pages/dashboard/chef/MyMeals.jsx";
import CreateMeal from "../pages/dashboard/chef/CreateMeal.jsx";
import PlatformStatistics from "../pages/dashboard/admin/PlatformStatistics.jsx";
import AdminRoutes from "./AdminRoutes.jsx";
import ManageUsers from "../pages/dashboard/admin/ManageUsers.jsx";
import ManageRequests from "../pages/dashboard/admin/ManageRequests.jsx";
import OrderRequests from "../pages/dashboard/chef/OrderRequests.jsx";
import MealDetails from "../pages/MealDetails.jsx";


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
        path: "/meals",
        Component: Meals,
      },
      {
        path: "/meals-details/:id",
        Component: MealDetails
      },
      // Dashboard layout
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        ),
        children: [
          { path: "/dashboard", element: <Profile /> },
          { path: "/dashboard/orders", element: <MyOrders/> },
          { path: "", element: <MyReviews/> },
          { path: "/dashboard/favorites", element: <FavoriteMeals/> },
          {
            path: "/dashboard/my-meals",
            element: (
              <ChefRoutes>
                <MyMeals />{" "}
              </ChefRoutes>
            ),
          },
          {
            path: "/dashboard/order-requests",
            element: (
              <ChefRoutes>
                <OrderRequests />{" "}
              </ChefRoutes>
            ),
          },
          {
            path: "/dashboard/create-meal",
            element: (
              <ChefRoutes>
                <CreateMeal />
              </ChefRoutes>
            ),
          },
          {
            path: "/dashboard/statistics",
            element: (
              <AdminRoutes>
                <PlatformStatistics />
              </AdminRoutes>
            ),
          },
          {
            path: "/dashboard/manage-users",
            element: (
              <AdminRoutes>
                <ManageUsers/>
              </AdminRoutes>
            ),
          },
          {
            path: "/dashboard/manage-requests",
            element: (
              <AdminRoutes>
                <ManageRequests />
              </AdminRoutes>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
