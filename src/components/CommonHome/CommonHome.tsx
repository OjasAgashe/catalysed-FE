import React from "react";
import SectionOne from "./SectionOne";
import "./CommonHome.css";
import SectionTwo from "./SectionTwo";
import SectionThree from "./SectionThree";
import SectionFour from "./SectionFour";

const CommonHome = () => {
  return (
    <div className="CommonHomeContainer">
      <SectionOne />
      <SectionTwo />
      <SectionThree />
      <SectionFour />
    </div>
  );
};

export default CommonHome;
