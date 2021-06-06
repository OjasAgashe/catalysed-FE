import React from "react";

type SectionHeadingDivProps = {
  headingText: string;
};

const SectionHeadingDiv = ({ headingText }: SectionHeadingDivProps) => {
  return <div className="SectionHeadingDiv">{headingText}</div>;
};

export default SectionHeadingDiv;
