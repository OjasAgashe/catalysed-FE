import React from "react";
import SectionHeadingDiv from "./SectionHeadingDiv";
import ErrorNoProgramsDiv from "./ErrorNoProgramsDiv";

const SectionThree = () => {
  return (
    <section className="OrgHomeSectionThreeContainer">
      <SectionHeadingDiv
        headingText={`Programs starting in this ${new Date(
          Date.now()
        ).toLocaleString("en-US", { month: "long" })} month`}
      />
      <ErrorNoProgramsDiv />
    </section>
  );
};

export default SectionThree;
