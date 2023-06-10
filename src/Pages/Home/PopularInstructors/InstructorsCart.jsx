import React from "react";
import { FaShareAlt } from "react-icons/fa";
// eslint-disable-next-line react/prop-types
const InstructorsCart = ({ item }) => {
  // eslint-disable-next-line react/prop-types
  const { name, image, course_name } = item;
  return (
    <div className=" w-96 mx-auto items-center text-center">
      <figure className="px-10 pt-10">
        <img src={image} alt="Shoes" className="rounded-xl bg-white h-56" />
      </figure>
      <div className="card-body items-start ">
        <p className="font-serif">{course_name}</p>
        <h2 className="card-title font-mono">{name}</h2>
        <div className=" flex gap-20">
          <button className="btn btn-primary">Buy Now</button>
          <button className="btn ">
            {" "}
            <FaShareAlt />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructorsCart;
