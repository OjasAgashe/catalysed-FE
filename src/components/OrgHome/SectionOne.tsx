import React from "react";
import { OrgHomeSectionOne } from "../../assets/Illustrations/Illustrations";

const SectionOne = () => {
  return (
    <section
      style={{
        backgroundImage: `url(${OrgHomeSectionOne})`,
      }}
      className="OrgHomeSectionOneContainer"
    >
      <div className="TextContainer">
        <span className="WelcomeSpan">Welcome OrgName !!</span>
        <span className="HelpTextSpanOne">
          You know that you can help and save
        </span>
        <span className="HelpTextSpanTwo">time for both, student and mentor, by connecting</span>
        <span className="HelpTextSpanThree">them through your programs</span>
      </div>
    </section>
  );
};

export default SectionOne;
