import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { Toaster, toast } from "react-hot-toast";
import { AuthContext } from "../../Providers/AuthProvider";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";
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
    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);

      // form.reset();
      // toast.success("Successfully toasted!");
      // navigate(from, { replace: true });

      updateUserProfile(data.name, data.photoURL)
        .then(() => {
          const saveUser = { name: data.name, email: data.email };
          fetch("http://localhost:5000/users", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(saveUser),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.insertedId) {
                reset();
                // toast.success("Successfully toasted!");
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "User created successfully.",
                  showConfirmButton: false,
                  timer: 1500,
                });
                navigate("/");
              }
            });
        })
        .catch((error) => console.log(error));
    });
  };

  // email signup
  // const handleSignUp = (event) => {
  //   event.preventDefault();
  //   const form = event.target;
  //   const name = form.name.value;
  //   const email = form.email.value;
  //   const photo = form.photo.value;
  //   const password = form.password.value;
  //   const confirm = form.confirm.value;
  //   console.log(name, email, photo, password, confirm);

  //   setError("");
  //   if (password !== confirm) {
  //     setError("Your password did not match");
  //     return;
  //   } else if (password.length < 6) {
  //     setError("password must be 6 characters or longer");
  //     return;
  //   }

  //   createUser(email, password).then((result) => {
  //     const loggedUser = result.user;
  //     console.log(loggedUser);

  //     updateUserProfile(data.name, data.photoURL)
  //       .then(() => {
  //         const saveUser = { name: data.name, email: data.email };
  //         fetch("http://localhost:5000/users", {
  //           method: "POST",
  //           headers: {
  //             "content-type": "application/json",
  //           },
  //           body: JSON.stringify(saveUser),
  //         })
  //           .then((res) => res.json())
  //           .then((data) => {
  //             if (data.insertedId) {
  //               reset();
  //               Swal.fire({
  //                 position: "top-end",
  //                 icon: "success",
  //                 title: "User created successfully.",
  //                 showConfirmButton: false,
  //                 timer: 1500,
  //               });
  //               navigate("/");
  //             }
  //           });
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         setError(error.message);
  //       });
  //   });
  // };

  //   createUser(email, password)
  //     .then((result) => {
  //       const loggedUser = result.user;
  //       console.log(loggedUser);
  //       form.reset();
  //       navigate(from, { replace: true });
  //       toast.success("Successfully toasted!");

  //       // alert("successfully create");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setError(error.message);
  //     });
  // };

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
            {/* <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              name="name"
              placeholder="Your Name"
              required
            /> */}
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
            {/* <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              name="email"
              required
            /> */}
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
            {/* <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="photo"
              type="text"
              placeholder="Photo Url"
              name="photo"
              required
            /> */}
            <input
              type="text"
              {...register("photoURL", { required: true })}
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
            {/* <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type={show ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
            /> */}
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
            {/* <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="confirm-password"
              type={show ? "text" : "password"}
              name="confirm"
              placeholder="Confirm Password"
              required
            /> */}
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

            {/* <Toaster /> */}
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
