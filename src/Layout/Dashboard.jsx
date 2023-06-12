import { Outlet } from "react-router-dom";
import {
  // FaShoppingCart,
  FaWallet,
  // FaCalendarAlt,
  FaHome,
  FaExternalLinkAlt,
  // FaUtensils,
  // FaBook,
  // FaUsers,
} from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import IsUser from "../Pages/Sidebar/IsUser";
import IsAdmin from "../Pages/Sidebar/IsAdmin";
import IsInstractors from "../Pages/Sidebar/IsInstractors";
import { useAdmin, useInstractor } from "../hooks/useAdmin";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import DarkLight from "../Pages/Home/DarkLight/DarkLight";

// import useCart from "../hooks/useCart";
// import useAdmin from "../hooks/useAdmin.jsx";

const Dashboard = () => {
  // const { user } = useAuth();

  // TODO: load data from the server to have dynamic isAdmin based on Data
  const isAdmin = true;
  // const [isAdmin] = useAdmin();
  // const [isIntractor] = useInstractor();
  const { user, logOut } = useContext(AuthContext);
  const handleLogOut = () => {
    logOut()
      .then()
      .catch((error) => console.log(error));
  };

  return (
    <div className="drawer drawer-mobile lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>

        <Outlet></Outlet>
      </div>

      <div className="drawer-side bg-[#bae7ff]">
        <label htmlFor="my-drawer-2" className="drawer-overlay">
          <div className="justify-center text-center space-y-4 mt-9">
            <div className="avatar cursor-pointer">
              <div className="w-10 h-10 rounded-full  ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={user?.photoURL} alt="User Avatar" />
              </div>
            </div>
            <div>
              <p>{user?.email}</p>
            </div>
            <div className="flex gap-5 justify-center">
              {/* <NavLink to="/">
            <FaHome></FaHome>
          </NavLink>
          <FaCalendarAlt></FaCalendarAlt>
          <FaWallet></FaWallet> */}
            </div>
          </div>
          <hr className="my-5 " />
        </label>
        <ul className="menu p-4 w-80">
          {isAdmin ? <IsAdmin /> : <IsUser />}
          {/* {isIntractor ? <IsInstractors /> : <IsUser />} */}
          <div className="divider"></div>
        </ul>
        <hr className="my-5 " />

        <li className="ml-24">
          <DarkLight />
        </li>
        <li>
          <button className="mt-6 ml-14" onClick={handleLogOut}>
            <FaExternalLinkAlt></FaExternalLinkAlt> Logout
          </button>
        </li>
      </div>
    </div>
  );
};

export default Dashboard;
