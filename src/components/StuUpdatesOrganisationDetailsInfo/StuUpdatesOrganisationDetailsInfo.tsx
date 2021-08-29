import React from "react";
import "./StuUpdatesOrganisationDetailsInfo.css";
import SectionOne from "./SectionOne";
import SectionTwo from "./SectionTwo";
import { StudentUpdatesOrgDetailsResponse } from "../../types/StudentUpdates";

type StuUpdatesOrganisationDetailsInfoProps = {
  orgDetails: StudentUpdatesOrgDetailsResponse["orgDetails"];
};

const StuUpdatesOrganisationDetailsInfo = ({
  orgDetails,
}: StuUpdatesOrganisationDetailsInfoProps) => {
  return (
    <div className="StuUpdatesOrganisationDetailsInfoContainer">
      {/* Show SectionOne */}
      <SectionOne orgDetails={orgDetails} />

      {/* Show SectionTwo */}
      <SectionTwo orgDetails={orgDetails} />
    </div>
  );
};

export default StuUpdatesOrganisationDetailsInfo;
