import { Helmet } from "react-helmet-async";
// import DashSectionTitle from "../../../component/DashboardSectionTitle";

import Swal from "sweetalert2";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import { useAllClasses } from "../../../../../hooks/useClasses";
import { useState } from "react";

const ManageClasses = () => {
  const [Classes, refetch] = useAllClasses();
  const [axiosSecure] = useAxiosSecure();

  const handleMakeApproved = (item) => {
    axiosSecure
      .patch(`/classes/approved/${item._id}`)
      .then((response) => {
        const { data } = response;
        console.log("response", data);
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: `${item?.instructorName} Your Class Approved`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleMakePending = (item) => {
    axiosSecure
      .patch(`/classes/pending/${item._id}`)
      .then((response) => {
        const { data } = response;
        console.log("response", data);
        if (data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: `${item?.instructorName} Your Class Pending`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSendFeedback = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFeedback("");
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleConfirmSendFeedback = (e) => {
    setShowModal(false);
    // e.preventDefault();
    // const fed = e.target.value;
    // console.log(fed);

    fetch(`http://localhost:5000/feedback/${_id}`, {
      method: "PATCH",
      headers: {
        authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ feedback: feedback }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: `Feedback is sended to ${instructorName}`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <div>
      <Helmet>
        <title>Pallikoodam || Manage Classes</title>
      </Helmet>
      {/* <DashSectionTitle
        name="Classes"
        title="Manage Classes"
        subTitle="All Instructors added by all Classes!"
      /> */}
      <h2 className="text-3xl font-medium p-4">
        Total Classes : {Classes.length}
      </h2>
      <div
        data-aos="fade-down"
        data-aos-easing="linear"
        data-aos-duration="1500"
        className="overflow-x-auto"
      >
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-center text-lg">
              <th>Image</th>
              <th>Class Name</th>
              <th>name</th>
              <th>Available Seat</th>
              <th>Price</th>
              <th>Status</th>
              <th></th>
              <th>Action</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {Classes.map((item) => (
              <tr key={item._id}>
                <td>
                  <div className="mask mask-squircle w-14 h-14">
                    <img src={item.image} alt="Avatar Tailwind CSS Component" />
                  </div>
                </td>
                <td className=" text-center">{item.name}</td>
                <td>
                  <p className="text-center">
                    {item.insName} <br />
                    <span>{item.email}</span>
                  </p>
                </td>
                <td className="text-center">{item.seats}</td>
                <td className="">${item.price}</td>
                <td className="text-green-600 font-medium ">{item.status}</td>
                <td>
                  {item?.status === "Approved" ? (
                    "Approved"
                  ) : (
                    <button
                      onClick={() => handleMakeApproved(item)}
                      className="btn btn-xs lowercase  bg-main_color text-base text-white"
                    >
                      Approved
                    </button>
                  )}
                </td>
                <td>
                  {item?.status === "Pending" ? (
                    "Pending"
                  ) : (
                    <button
                      onClick={() => handleMakePending(item)}
                      className="btn btn-xs lowercase bg-orange-600 text-base text-white"
                    >
                      Pending
                    </button>
                  )}
                </td>
                <td>
                  {item?.status === "FeedBack" ? (
                    "FeedBack"
                  ) : (
                    <>
                      <button
                        className="btn btn-xs bg-red-500 lowercase text-base text-white"
                        onClick={openModal}
                      >
                        feedback
                      </button>
                      {modalOpen && (
                        <div className="modal">
                          <div className="modal-box">
                            <button
                              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                              onClick={closeModal}
                            >
                              ✕
                            </button>
                            <h3>Send Feedback</h3>
                            <form
                              onSubmit={(e) => {
                                e.preventDefault();
                                handleConfirmSendFeedback(item._id);
                              }}
                            >
                              <textarea
                                value={feedback}
                                onChange={handleFeedbackChange}
                                placeholder="Enter your feedback..."
                              />
                              <div>
                                <button onClick={handleCloseModal}>
                                  Cancel
                                </button>
                                <button type="submit">Send</button>
                              </div>
                            </form>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageClasses;
