// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

import { AuthContext } from "../../Providers/AuthProvider";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";

const Login = () => {
  const [show, setShow] = useState(false);

  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleLogin = (event) => {
    event.preventDefault();

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        form.reset();
        navigate(from, { replace: true });
        toast.success("Successfully Login..!");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Login Faild...!");
      });
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold text-center my-5">
        Log in to your account
      </h1>
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
          />
        </div>
        <div className="mb-4 relative">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            placeholder="Password"
            type={show ? "text" : "password"}
            name="password"
            required
          />
          <p className="absolute top-2 right-0" onClick={() => setShow(!show)}>
            <small className="cursor-pointer   font-medium  transition duration-200  shadow-md  md:mb-0  px-4 py-2 md:px-4 md:py-1 m-1 text-lg border-transparent border-2   ">
              {show ? (
                <span>
                  {" "}
                  <FaEyeSlash />
                </span>
              ) : (
                <span>
                  {" "}
                  <FaEye />
                </span>
              )}
            </small>
          </p>
        </div>
        <div className=" justify-between text-center items-center">
          <button className="btn-primary " type="submit">
            Sign In
          </button>
          <Toaster />
        </div>
      </form>
      <SocialLogin />
      <p className="text-center  my-6 text-xl">
        <small>
          <Link to="/signup">No account? Create one here</Link>
        </small>
      </p>
    </div>
  );
};

export default Login;
