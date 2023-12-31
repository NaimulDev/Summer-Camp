import React from "react";
import { Helmet } from "react-helmet-async";
import useInstructors from "../../../hooks/UseInstructors";
import SingleInstructor from "../InstructorsPages/SingleInstructor";

const PopularInstructors = () => {
  const [instructors] = useInstructors();
  return (
    <div className="max-w-6xl mx-auto my-14 pt-12">
      <Helmet>
        <title>Pallikodam | Instructors</title>
      </Helmet>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {instructors.slice(0, 6).map((instructor) => (
          <SingleInstructor
            key={instructor._id}
            instructor={instructor}
          ></SingleInstructor>
        ))}
      </div>
    </div>
  );
};

export default PopularInstructors;
