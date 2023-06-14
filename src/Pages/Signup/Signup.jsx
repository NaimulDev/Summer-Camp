import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { AuthContext } from "../../Providers/AuthProvider";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";
import axios from "axios";
import Swal from "sweetalert2";
const Signup = () => {
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    if (data.password !== data.confirm) {
      setError("Your password did not match");
      return;
    }

    const imageUrl = data.image[0];

    const formData = new FormData();
    formData.append("image", imageUrl);

    const url = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMAGE_KEY
    }`;

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageData) => {
        const imageAdders = imageData.data.url;
        createUser(data.email, data.password)
          .then((result) => {
            updateUserProfile(data.name, imageAdders).then(() => {
              axios
                .post("https://pallikoodam-server.vercel.app/users", {
                  name: data.name,
                  email: data.email,
                  image: imageAdders,
                  role: data.role,
                })
                .then((data) => {
                  if (data.insertedId) {
                    Swal.fire({
                      position: "top-center",
                      icon: "success",
                      title: "Your SignUp Successful",
                      showConfirmButton: false,
                      timer: 1500,
                    });
                  }
                  navigate("/");
                })
                .catch((err) => {
                  Swal.fire({
                    position: "top-center",
                    icon: "error",
                    title: `${err.message}`,
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  setLoading(false);
                });
            });
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: `${error.message}`,
            });
            setLoading(false);
          });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.message}`,
        });
        setLoading(false);
      });
  };

  return (
    <>
      <div className="max-w-md mx-auto mt-8">
        <h1 className="text-2xl font-bold text-center my-5">
          Create an account
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>

            <input
              type="text"
              {...register("name", { required: true })}
              name="name"
              placeholder="Name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.name && (
              <span className="text-red-600">Name is required</span>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>

            <input
              type="email"
              {...register("email", { required: true })}
              name="email"
              placeholder="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.email && (
              <span className="text-red-600">Email is required</span>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="photo"
            >
              Photo
            </label>

            <input
              type="file"
              {...register("image", { required: true })}
              name="image"
              placeholder="Photo URL"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.photoURL && (
              <span className="text-red-600">Photo URL is required</span>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>

            <input
              type={show ? "text" : "password"}
              {...register("password", {
                required: true,
                minLength: 6,
                maxLength: 20,
                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
              })}
              placeholder="password"
              name="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="confirm-password"
            >
              Confirm Password
            </label>

            <input
              type={show ? "text" : "password"}
              id="confirm"
              {...register("confirm", {
                required: true,
              })}
              placeholder="Confirm Password"
              name="confirm"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
            <p>{error}</p>
            {errors.password?.type === "required" && (
              <p className="text-red-600">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-600">Password must be 6 characters</p>
            )}
            {errors.password?.type === "maxLength" && (
              <p className="text-red-600">
                Password must be less than 20 characters
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-600">
                Password must have one Uppercase one lower case, one number and
                one special character.
              </p>
            )}
            <p onClick={() => setShow(!show)}>
              <small className="cursor-pointer">
                {show ? <span>Hide Password</span> : <span>Show Password</span>}
              </small>
            </p>
          </div>
          <div className="text-center">
            <input className="btn btn-primary" type="submit" value="Sign Up" />
          </div>
        </form>

        <SocialLogin></SocialLogin>
        <p className="text-center  my-6 text-xl">
          <small>
            Already have an account? <Link to="/login">Login</Link>
          </small>
        </p>
      </div>
    </>
  );
};

export default Signup;
