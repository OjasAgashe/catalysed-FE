import React from "react";
import {
  CommonHomeBoy,
  CommonHomeGirl,
} from "../../assets/Illustrations/Illustrations";

const SectionOne = () => {
  return (
    <section className="CommonHomeSectionOne">
      <div className="GirlContainer">
        <img
          className="GirlImg"
          src={CommonHomeGirl}
          alt="common home girl illustration"
        />
      </div>
      <div className="TextContainer">
        <h1>About Us</h1>
        <h4>Give every child's dream a better chance</h4>
        <p>
          We aim to help every child colour the world by facilitating easy and
          streamlined access to quality guidance and education by providing them
          with a platform that helps them unveil their potential and introduce
          them to phenomenal and unforeseen opportunities.
        </p>
      </div>
      <div className="BoyContainer">
        <img
          className="BoyImg"
          src={CommonHomeBoy}
          alt="common home boy illustration"
        />
      </div>
    </section>
  );
};

export default SectionOne;
