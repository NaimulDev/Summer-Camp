import React, { useState } from "react";
import Swal from "sweetalert2";

// TODO: SEND FEEDBACK DATA ON INSTRUCTOR
// TODO: BY DEFAULT STATUS WILL BE PENDING
const token = localStorage.getItem("access-token");

// eslint-disable-next-line react/prop-types
const ManageClass = ({ classItem }) => {
  const [handleApproveDisabled, setHandleApproveDisabled] = useState(
    // eslint-disable-next-line react/prop-types
    classItem.status !== "Pending"
  );
  const [handleDenyDisabled, setHandleDenyDisabled] = useState(
    // eslint-disable-next-line react/prop-types
    classItem.status !== "Pending"
  );

  const [showModal, setShowModal] = useState(false);
  const [feedback, setFeedback] = useState("");
  const {
    // eslint-disable-next-line react/prop-types
    image,
    // eslint-disable-next-line react/prop-types
    name,
    // eslint-disable-next-line react/prop-types
    insName,
    // eslint-disable-next-line react/prop-types
    email,
    // eslint-disable-next-line react/prop-types
    seats,
    // eslint-disable-next-line react/prop-types
    price,
    // eslint-disable-next-line react/prop-types
    status,
    // eslint-disable-next-line react/prop-types
    _id,
  } = classItem;

  const handleApprove = (id) => {
    fetch(`http://localhost:5000/classes/approved/${id}`, {
      method: "PATCH",
      headers: {
        authorization: `bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: `${className} is an Approved Now!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
        setHandleApproveDisabled(true);
        setHandleDenyDisabled(true);
      });
  };

  const handleDeny = (id) => {
    fetch(`http://localhost:5000/classes/deny/${id}`, {
      method: "PATCH",
      headers: {
        authorization: `bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          Swal.fire({
            position: "top-center",
            icon: "error",
            title: `${className} is denied!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
        setHandleDenyDisabled(true);
        setHandleApproveDisabled(true);
      });
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
    <div className="cart-container">
      <div>
        <img src={image} alt="Class Image" />
      </div>
      <div>
        <h2>{name}</h2>
        <p>Instructor: {insName}</p>
        <p>ID: {_id}</p>
        <p>Email: {email}</p>
        <p>Available Seats: {seats}</p>
        <p>Price: {price}</p>
        <p>Status: {status}</p>
      </div>
      <div>
        <button
          disabled={handleApproveDisabled}
          onClick={() => handleApprove(_id)}
        >
          Approve
        </button>
        <button disabled={handleDenyDisabled} onClick={() => handleDeny(_id)}>
          Deny
        </button>
        <button onClick={handleSendFeedback}>Send Feedback</button>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Send Feedback</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleConfirmSendFeedback(_id);
              }}
            >
              <textarea
                value={feedback}
                onChange={handleFeedbackChange}
                placeholder="Enter your feedback..."
              />
              <div>
                <button onClick={handleCloseModal}>Cancel</button>
                <button type="submit">Send</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageClass;
