import React from "react";
import InvitationsInfoCard from "./InvitationsInfoCard";
import MentorInfoCard from "./MentorInfoCard";
import StudentInfoCard from "./StudentInfoCard";

const SectionFive = () => {
  return (
    <section className="OrgHomeSectionFiveContainer">
      <div className="OrgHomeSectionFiveSubsection">
        <MentorInfoCard />
        <InvitationsInfoCard />
      </div>
      <StudentInfoCard />
    </section>
  );
};

export default SectionFive;
