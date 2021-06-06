import React from "react";
import SectionHeadingDiv from "./SectionHeadingDiv";

const SectionThree = () => {
  return (
    <section className="OrgHomeSectionThreeContainer">
      <SectionHeadingDiv
        headingText={`Programs starting in this ${new Date(
          Date.now()
        ).toLocaleString("en-US", { month: "long" })} month`}
      />
    </section>
  );
};

export default SectionThree;
