import React from "react";
import InvitationsInfoCard from "./InvitationsInfoCard";
import ApplicantInfoCard from "./ApplicantInfoCard";
import { OrgHomeState } from "../../types/OrgHome";

type SectionSixProps = {
  state: OrgHomeState;
};

const SectionSix = ({ state }: SectionSixProps) => {
  return (
    <section className="OrgHomeSectionSixContainer">
      <InvitationsInfoCard
        invitationsSummary={state.responseData?.invitationsSummary ?? null}
      />
      <ApplicantInfoCard
        applicationsSummary={state.responseData?.applicationsSummary ?? null}
      />
    </section>
  );
};

export default SectionSix;
