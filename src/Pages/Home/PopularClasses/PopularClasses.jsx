import React, { useContext, useEffect, useState } from "react";
import { FaAtlas, FaRegClock, FaUserNurse, FaDollarSign } from "react-icons/fa";
import { AuthContext } from "../../../Providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import useCart from "../../../hooks/useCart";
import Swal from "sweetalert2";

const PopularClasses = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [, refetch] = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetch("https://pallikoodam-server.vercel.app/class")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  const handleSelectClass = (item) => {
    if (user && user.email) {
      const { _id, name, image, price } = item;
      const classItem = {
        classId: _id,
        name,
        image,
        price,
        email: user.email,
      };
      fetch("https://pallikoodam-server.vercel.app/bookmark", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(classItem),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            refetch(); // refetch cart to update the number of items in the cart
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Class Selected Successfully.",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    } else {
      Swal.fire({
        title: "Please login to order the food",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login now!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };

  return (
    <div className="container mx-auto px-4 my-14">
      <h2 className="text-5xl text-center my-10">Explore top courses</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.slice(0, 6).map((item) => (
          <div key={item._id} className="card w-full md:w-96 glass mx-auto">
            <figure>
              <img className="w-full" src={item.image} alt="Class!" />
            </figure>

            <div className="card-body">
              <div className="flex justify-evenly">
                <p className="font-light flex items-center gap-2">
                  <FaAtlas />
                </p>
                <p className="font-light flex items-center gap-2">
                  <FaRegClock />
                  12h 36m
                </p>
                <p className="font-light flex items-center gap-2">
                  <FaUserNurse /> Students
                </p>
              </div>

              <p className="text-2xl font-mono">{item.name}</p>

              <div className="rating">
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                  checked
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                />
              </div>

              <div className="flex justify-between">
                <h2 className="text-lg font-serif">
                  Available Seats: {item.seats}
                </h2>
                <h2 className="flex items-center text-2xl text-blue-700">
                  <FaDollarSign />
                  {item.price}
                </h2>
              </div>

              <div className="divider"></div>

              <div className="card-actions justify-between">
                <div tabIndex={0} className="flex items-center avatar">
                  <div className="w-10 rounded-full">
                    <img src={item.Image} alt="Instructor" />
                  </div>
                  <h2 className="ml-2 text-lg hover:text-blue-600 font-sans">
                    {item.insName}
                  </h2>
                </div>
                <button
                  onClick={() => handleSelectClass(item)}
                  className="btn btn-primary"
                >
                  Selected!
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularClasses;
