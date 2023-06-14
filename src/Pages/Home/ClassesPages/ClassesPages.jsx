import React, { useState, useEffect } from "react";
import ClassCart from "./ClassCart";

const token = localStorage.getItem("access-token");

const ClassesPages = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetch("https://pallikoodam-server.vercel.app/class", {
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

  return (
    <div className="flex flex-wrap">
      {classes &&
        classes.map((classItem, idx) => {
          return <ClassCart key={idx} classItem={classItem} />;
        })}
    </div>
  );
};

export default ClassesPages;
