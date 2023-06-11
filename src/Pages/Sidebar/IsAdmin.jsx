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
        <NavLink to="/dashboard/addItem">
          {" "}
          <FaUtensils></FaUtensils> Add an Item
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/manageitems">
          <FaWallet></FaWallet> Manage Items
        </NavLink>
      </li>
      <li>
        <NavLink to="/">
          <FaBook></FaBook> Manage Bookings(not implemented)
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/allusers">
          <FaUsers></FaUsers> All Users
        </NavLink>
      </li>
    </div>
  );
};

export default IsAdmin;
