import React from "react";
import img1 from "../../../assets/section/bg-image.png";
import img2 from "../../../assets/section/bg-image2.png";
import "./SectionTwo.css";

const SectionTwo = () => {
  return (
    <div className="">
      <div className="flex">
        <div>
          <img src={img2} alt="" className="h-full" />
        </div>

        <div className="bg-blue-950 corner-ribbon">
          <img src={img1} className="" alt="" />
          <div className=" corner-ribbon__ribbon"></div>
          <div className="absolute top-16 right-72 text-white flex gap-28 text-2xl font-bold">
            <div>
              <h3>
                Learn the Latest
                <br />
                Top Skill
              </h3>
            </div>
            <div>
              <h3>
                Learn From
                <br />
                Industry Experts
              </h3>
            </div>
            <div>
              <h3>
                Learn In Your
                <br />
                Own Pace
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionTwo;
