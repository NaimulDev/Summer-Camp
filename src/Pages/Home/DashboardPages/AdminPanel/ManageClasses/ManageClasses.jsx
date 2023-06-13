import React, { useEffect, useState } from "react";
import "./ManageClasses.css";
import ManageClass from "./ManageClass";

const token = localStorage.getItem("access-token");

const ManageClasses = () => {
  const [classes, setClasses] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/all-classes", {
      headers: {
        authorization: `bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setClasses(data);
      });
  }, []);
  return (
    <div>
      <h2 style={{ textAlign: "center", fontSize: "40px" }}>Manage Classes</h2>
      <div className="grid grid-cols-2 mx-24">
        {classes &&
          classes.map((classItem, idx) => (
            <ManageClass
              key={classItem._id}
              classItem={classItem}
            ></ManageClass>
          ))}
      </div>
    </div>
  );
};

export default ManageClasses;
