import React from "react";
import { OrgHomeSectionOne } from "../../assets/Illustrations/Illustrations";

const SectionOne = () => {
  return (
    <section
      style={{ backgroundImage: `url(${OrgHomeSectionOne})` }}
      className="OrgHomeSectionOneContainer"
    >
      <div className="TextContainer">
        <span className="WelcomeSpan">Welcome Name !!</span>
        <span className="HelpTextSpanOne">
          Thanks for believing on CatalysEd
        </span>
      </div>
    </section>
  );
};

export default SectionOne;
