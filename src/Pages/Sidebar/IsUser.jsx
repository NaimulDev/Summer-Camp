import { FaCalendarAlt, FaHome, FaWallet } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const IsUser = () => {
  return (
    <>
      <li>
        <NavLink to="/dashboard/userhome">
          <FaHome></FaHome> User Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/">
          <FaCalendarAlt></FaCalendarAlt> My Selected Class
        </NavLink>
      </li>
      <li>
        <NavLink to="/">
          <FaWallet></FaWallet> Payment History
        </NavLink>
      </li>
      <li>
        <NavLink to="/">
          <FaWallet></FaWallet> Enroll Classes
        </NavLink>
      </li>
    </>
  );
};

export default IsUser;
