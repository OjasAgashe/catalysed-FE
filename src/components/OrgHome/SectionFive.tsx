import React from "react";
import { OrgHomeState } from "../../types/OrgHome";
import MentorInfoCard from "./MentorInfoCard";
import StudentInfoCard from "./StudentInfoCard";

type SectionFiveProps = {
  state: OrgHomeState;
};

const SectionFive = ({ state }: SectionFiveProps) => {
  return (
    <section className="OrgHomeSectionFiveContainer">
      <MentorInfoCard
        mentorSummary={state.responseData?.mentorSummary ?? null}
      />
      <StudentInfoCard
        studentSummary={state.responseData?.studentSummary ?? null}
      />
    </section>
  );
};

export default SectionFive;
