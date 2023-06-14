import React, { useState, useEffect } from "react";
import ClassCart from "./ClassCart";

const token = localStorage.getItem("access-token");

const ClassesPages = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/class", {
      headers: {
        authorization: `bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const approvedClasses = data.filter(
          (classItem) => classItem.status === "approved"
        );
        setClasses(approvedClasses);
      });
  }, []);
  console.log(classes);
  return (
    <div className="flex-container">
      {classes &&
        classes.map((classItem, idx) => {
          return <ClassCart key={idx} classItem={classItem}></ClassCart>;
        })}
    </div>
  );
};

export default ClassesPages;
