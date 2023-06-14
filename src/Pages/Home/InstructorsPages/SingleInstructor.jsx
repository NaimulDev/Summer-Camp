import React from 'react';

const SingleInstructor = ({ instructor }) => {
  // console.log(instructor);
  const { image, name, email } = instructor;

  return (
    <div className="card bg-base-100 shadow-xl">
      <figure className="px-10 pt-10">
        <img src={image} alt="" className="h-64 rounded-xl" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">Name: {name}</h2>
        <p>Email: {email}</p>
        <div className="card-actions">
          <button className="btn text-lg text-white bg-[#04AA6D] hover:bg-[#04AA6D] capitalize border-0">
            See Classes
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleInstructor;