import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import StuUpdatesOrganisationDetailsCommon from "../../components/StuUpdatesOrganisationDetailsCommon/StuUpdatesOrganisationDetailsCommon";
import StuUpdatesOrganisationProgramsDetails from "../../components/StuUpdatesOrganisationProgramsDetails/StuUpdatesOrganisationProgramsDetails";

const StuUpdatesOrganisationPrograms = () => {
  const { organisationId } = useParams<{ organisationId: string }>();

  useEffect(() => {
    document.documentElement.scrollTop = 0;

    document.title = "Connected Organisation Programs | CatalysEd";
  });

  return (
    <div className="StuUpdatesOrganisationProgramsPage Page">
      <StuUpdatesOrganisationDetailsCommon
        organisationName="CatalysEd"
        organisationId={parseInt(organisationId)}
      />

      <StuUpdatesOrganisationProgramsDetails />
    </div>
  );
};

export default StuUpdatesOrganisationPrograms;
