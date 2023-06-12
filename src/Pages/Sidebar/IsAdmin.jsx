import React from "react";
import { FaBook, FaHome, FaUsers, FaUtensils, FaWallet } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const IsAdmin = () => {
  return (
    <div>
      <li>
        <NavLink to="/dashboard/adminhome">
          <FaHome></FaHome> Admin Home
        </NavLink>
      </li>

      <li>
        <NavLink to="/dashboard/manageclasses">
          <FaBook></FaBook> Manage Classes
        </NavLink>
      </li>

      <li>
        <NavLink to="/dashboard/manageusers">
          <FaUsers></FaUsers> Manage Users
        </NavLink>
      </li>
    </div>
  );
};

export default IsAdmin;
