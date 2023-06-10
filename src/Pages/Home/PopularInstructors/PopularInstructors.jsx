import React, { useEffect, useState } from "react";
import InstructorsCart from "./InstructorsCart";

const PopularInstructors = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // fetch("http://localhost:5000/Instructor")
    fetch("classes.json")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
      {data.slice(0, 6).map((item) => (
        <InstructorsCart key={item._id} item={item}></InstructorsCart>
      ))}
    </div>
  );
};

export default PopularInstructors;
