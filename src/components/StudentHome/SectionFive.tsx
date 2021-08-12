import React from "react";
import ProgramInfoCard from "./ProgramInfoCard";
import OrgInfoCard from "./OrgInfoCard";
import { StudentHomeState } from "../../types/StudentHome";

type SectionFiveProps = {
  state: StudentHomeState;
};

const SectionFive = ({ state }: SectionFiveProps) => {
  return (
    <section className="OrgHomeSectionFiveContainer">
      <ProgramInfoCard state={state} />
      <OrgInfoCard state={state} />
    </section>
  );
};

export default SectionFive;
