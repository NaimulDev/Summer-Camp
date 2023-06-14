import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { FaPaypal, FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { BookMarkEmailFetch } from "../../../../../hooks/useClasses";

const SelectedClass = () => {
  const [bookMark, refetch] = BookMarkEmailFetch();

  const handleDelete = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/bookmark/${user._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
          });
      }
    });
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Class Name</th>
              <th>Price</th>
              <th>Pay</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {bookMark.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={user?.Image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div>
                    <div className="font-bold">{user?.name}</div>
                  </div>
                </td>
                <td>
                  {user?.price}
                  <br />
                </td>
                <td>
                  <Link
                    to={`/dashboard/payment/${user?._id}`}
                    className="btn bg-blue-500 "
                  >
                    <FaPaypal />
                  </Link>
                </td>
                <th>
                  <button
                    onClick={() => handleDelete(user)}
                    className="btn btn-ghost bg-red-700"
                  >
                    <FaRegTrashAlt />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SelectedClass;
