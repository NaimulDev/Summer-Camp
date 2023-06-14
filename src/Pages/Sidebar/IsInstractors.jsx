import React, { useContext } from "react";
import { FaCalendarAlt, FaHome, FaWallet } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const IsInstractors = () => {
  return (
    <>
      <li>
        <NavLink to="/dashboard/inshome">
          <FaHome></FaHome> Instractor Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/addclass">
          <FaCalendarAlt></FaCalendarAlt> Add Class
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/myclass">
          <FaWallet></FaWallet> My Added Classes
        </NavLink>
      </li>
    </>
  );
};

export default IsInstractors;
