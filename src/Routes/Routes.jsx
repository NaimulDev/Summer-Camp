import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Signup from "../Pages/Signup/Signup";
import Login from "../Pages/Login/Login";
import PopularClasses from "../Pages/Home/PopularClasses/PopularClasses";
import PopularInstructors from "../Pages/Home/PopularInstructors/PopularInstructors";
import Dashboard from "../Layout/Dashboard";
import AddClasses from "../Pages/Home/DashboardPages/IsInstractorPanel/AddClasses";
import ManageUsers from "../Pages/Home/DashboardPages/AdminPanel/ManageUsers/ManageUsers";
import AdminRoute from "./AdminRoute";
import MyAddedClass from "../Pages/Home/DashboardPages/IsInstractorPanel/MyAddedClass";
import SelectedClass from "../Pages/Home/DashboardPages/UserPanel/SelectedClass/SelectedClass";
import ManageClasses from "../Pages/Home/DashboardPages/AdminPanel/ManageClasses/ManageClasses";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/instructors",
        element: <PopularInstructors />,
      },
      {
        path: "/classes",
        element: <PopularClasses />,
      },

      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },

  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "addclass",
        element: <AddClasses />,
      },
      {
        path: "manageusers",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "manageclasses",
        element: (
          <AdminRoute>
            <ManageClasses />
          </AdminRoute>
        ),
      },
      {
        path: "myclass",
        element: <MyAddedClass />,
      },
      {
        path: "selectclass",
        element: <SelectedClass />,
      },
      {
        path: "payhistory",
        element: <MyAddedClass />,
      },
      // {
      //   path:'payment',
      //   element: <Payment></Payment>
      // },
      // admin routes
      // {
      //   path: 'adminhome',
      //   element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
      // },
      // {
      //   path: 'allusers',
      //   element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
      // },
      // {
      //   path: 'addItem',
      //   element: <AdminRoute><AddItem></AddItem></AdminRoute>
      // },
      // {
      //   path: 'manageitems',
      //   element: <AdminRoute><ManageItems></ManageItems></AdminRoute>
      // }
    ],
  },
]);
