import React, { useContext, useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../Providers/AuthProvider";

const token = localStorage.getItem("access-token");

const ClassCart = ({ classItem }) => {
  const [isSelectButtonDisabled, setIsSelectButtonDisabled] = useState(false);

  const { user, loading } = useContext(AuthContext);
  const email = user?.email;

  const [users, setUsers] = useState([]);

  const { data: fetchedUsers = [] } = useQuery(
    ["users"],
    async () => {
      const res = await fetch(`https://pallikoodam-server.vercel.app/users/`, {
        headers: {
          authorization: `bearer ${token}`,
        },
      });
      return res.json();
    },
    {
      enabled: !loading,
    }
  );

  useEffect(() => {
    if (fetchedUsers.length > 0) {
      setUsers(fetchedUsers);
    }
  }, [fetchedUsers]);
  const currentUser = users.find((item) => item?.email === email);

  const instructor = currentUser?.role === "instructor";
  const admin = currentUser?.role === "admin";

  const {
    name,
    insName,
    seats,
    price,
    image,
    status,
    classDetails,
    enrolledStudents,
    adminFeedback,
  } = classItem;

  const newData = {
    className: name,
    instructorName: insName,
    instructorEmail: email,
    seats: seats,
    price: price,
    classDetails: classDetails,
    imageURL: image,
    status: status,
    adminFeedback: adminFeedback,
    enrolledStudents: enrolledStudents,
    email: user?.email,
  };

  const handleSelectButton = (id) => {
    if (user) {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to be added to the class",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, add me!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Added!", "You have been added to the class.", "success");
          fetch("https://pallikoodam-server.vercel.app/mySelectedClasses", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(newData),
          })
            .then((res) => res.json())
            .then((data) => {
              setIsSelectButtonDisabled(true);
            });
        }
      });
    } else {
      Swal.fire({
        icon: "question",
        title: "Oops...",
        text: "Please Login Now!",
        footer: '<a href="/login">Do you have an account?</a>',
      });
    }
  };

  const cardClasses = admin || instructor || seats === 0 ? "bg-red-500" : "";

  return (
    <div className={`w-72 mx-4 mb-8 ${cardClasses}`}>
      <div className="border border-gray-300 rounded-lg p-4">
        <div className="mb-4">
          <img src={image} alt="Course" className="h-40 w-full object-cover" />
        </div>
        <div className="text-gray-800">
          <h2 className="text-xl font-semibold mb-2">{name}</h2>
          <p className="text-sm mb-1">Instructor: {insName}</p>
          <p className="text-sm mb-1">Email: {classItem.email}</p>
          <p className="text-sm mb-1">Available Seats: {seats}</p>
          <p className="text-sm mb-1">Enrolled Students: {enrolledStudents}</p>
          <p className="text-sm mb-1">Price: ${price}</p>
          <p className="text-sm mb-1">Status: {status}</p>

          <button
            onClick={handleSelectButton}
            disabled={
              seats === 0 || instructor || admin || isSelectButtonDisabled
            }
            className="bg-slate-500 text-white font-bold py-2 px-4 rounded"
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassCart;
