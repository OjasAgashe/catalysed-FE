import React from "react";
import SectionOne from "./SectionOne";
import "./CommonHome.css";
import SectionTwo from "./SectionTwo";
import SectionThree from "./SectionThree";
import SectionFour from "./SectionFour";
import SectionFive from "./SectionFive";
import SectionSix from "./SectionSix";
import SectionSeven from "./SectionSeven";

const CommonHome = () => {
  return (
    <div className="CommonHomeContainer">
      {/* Show SectionOne Component */}
      <SectionOne />

      {/* Show SectionTwo Component */}
      <SectionTwo />

      {/* Show SectionThree Component */}
      <SectionThree />

      {/* Show SectionFour Component */}
      <SectionFour />

      {/* Show SectionFive Component */}
      <SectionFive />

      {/* Show SectionSix Component */}
      <SectionSix />

      {/* Show SectionSeven Component */}
      <SectionSeven />
    </div>
  );
};

export default CommonHome;
