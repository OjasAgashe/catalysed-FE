import React from "react";
import SectionHeadingDiv from "./SectionHeadingDiv";
import ErrorNoProgramsDiv from "./ErrorNoProgramsDiv";

const SectionFour = () => {
  return (
    <section className="OrgHomeSectionFourContainer">
      <SectionHeadingDiv headingText="Ongoing Programs" />
      <ErrorNoProgramsDiv />
    </section>
  );
};

export default SectionFour;
