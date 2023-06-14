import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Signup from "../Pages/Signup/Signup";
import Login from "../Pages/Login/Login";
import PopularInstructors from "../Pages/Home/PopularInstructors/PopularInstructors";
import Dashboard from "../Layout/Dashboard";
import AddClasses from "../Pages/Home/DashboardPages/IsInstractorPanel/AddClasses";
import ManageUsers from "../Pages/Home/DashboardPages/AdminPanel/ManageUsers/ManageUsers";
import AdminRoute from "./AdminRoute";
import MyAddedClass from "../Pages/Home/DashboardPages/IsInstractorPanel/MyAddedClass";
import SelectedClass from "../Pages/Home/DashboardPages/UserPanel/SelectedClass/SelectedClass";
import ManageClasses from "../Pages/Home/DashboardPages/AdminPanel/ManageClasses/ManageClasses";
import AdminHome from "../Pages/Home/DashboardPages/AdminPanel/AdminHome/AdminHome";
import InstructorHome from "../Pages/Home/DashboardPages/IsInstractorPanel/InstructorHome/InstructorHome";
import ClassesPages from "../Pages/Home/ClassesPages/ClassesPages";
import Payment from "../Pages/Payment/Payment";
import UserHome from "../Pages/Home/DashboardPages/UserPanel/UserHome/UserHome";
import Instructors from "../Pages/Home/InstructorsPages/Instructors";
import UserPayHistory from "../Pages/Home/DashboardPages/UserPanel/UserPayHistory/UserPayHistory";
import AdminPayHistory from "../Pages/Home/DashboardPages/AdminPanel/AdminPayHistory/AdminPayHistory";

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
        element: <Instructors />,
      },
      {
        path: "/classes",
        element: <ClassesPages />,
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
        path: "adminhome",
        element: <AdminHome />,
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
        path: "/dashboard/payhistory",
        element: (
          <AdminRoute>
            <AdminPayHistory />
          </AdminRoute>
        ),
      },
      // INstructor
      {
        path: "inshome",
        element: <InstructorHome />,
      },
      {
        path: "addclass",
        element: <AddClasses />,
      },
      {
        path: "myclass",
        element: <MyAddedClass />,
      },
      {
        path: "enrolled",
        element: <MyAddedClass />,
      },
      // User
      {
        path: "userhome",
        element: <UserHome />,
      },
      {
        path: "selectclass",
        element: <SelectedClass />,
      },
      {
        path: "/dashboard/payhistory",
        element: <UserPayHistory />,
      },
      {
        path: "/dashboard/payment/:id",
        element: <Payment></Payment>,
      },
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
