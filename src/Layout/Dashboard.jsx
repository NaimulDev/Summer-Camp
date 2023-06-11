import { NavLink, Outlet } from "react-router-dom";
import {
  // FaShoppingCart,
  FaWallet,
  // FaCalendarAlt,
  FaHome,
  // FaUtensils,
  // FaBook,
  // FaUsers,
} from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import IsUser from "../Pages/Sidebar/IsUser";
import IsAdmin from "../Pages/Sidebar/IsAdmin";
// import useCart from "../hooks/useCart";
// import useAdmin from "../hooks/useAdmin.jsx";

const Dashboard = () => {
  const { user } = useAuth();
  //   const [cart] = useCart();

  // TODO: load data from the server to have dynamic isAdmin based on Data
  const isAdmin = true;
  // const [isAdmin] = useAdmin();

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
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80">
          {isAdmin ? <IsUser /> : <IsAdmin />}
          <div className="divider"></div>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
