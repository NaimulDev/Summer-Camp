import React, { useContext } from "react";
import {
  FaCalendarAlt,
  FaExternalLinkAlt,
  FaHome,
  FaWallet,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import DarkLight from "../Home/DarkLight/DarkLight";

const IsInstractors = () => {
  const { user, logOut } = useContext(AuthContext);
  const handleLogOut = () => {
    logOut()
      .then()
      .catch((error) => console.log(error));
  };
  return (
    <>
      <div className="justify-center text-center space-y-4">
        <div className="avatar cursor-pointer">
          <div className="w-10 h-10 rounded-full  ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={user?.photoURL} alt="User Avatar" />
          </div>
        </div>
        <div>
          <p>{user?.email}</p>
        </div>
        <div className="flex gap-5 justify-center">
          <NavLink to="/">
            <FaHome></FaHome>
          </NavLink>
          <FaCalendarAlt></FaCalendarAlt>
          <FaWallet></FaWallet>
        </div>
      </div>
      <hr className="my-5 " />
      <li>
        <NavLink to="/dashboard/userhome">
          <FaHome></FaHome> User Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/addclass">
          <FaCalendarAlt></FaCalendarAlt> Add Class
        </NavLink>
      </li>
      <li>
        <NavLink to="/">
          <FaWallet></FaWallet> My Added Classes
        </NavLink>
      </li>
      <li>
        <NavLink to="/">
          <FaWallet></FaWallet> Total Enrolled Students
        </NavLink>
      </li>
      <hr className="my-5 " />

      <li className="ml-24">
        <DarkLight />
      </li>
      <li>
        <button className="mt-6 ml-14" onClick={handleLogOut}>
          <FaExternalLinkAlt></FaExternalLinkAlt> Logout
        </button>
      </li>
    </>
  );
};

export default IsInstractors;
