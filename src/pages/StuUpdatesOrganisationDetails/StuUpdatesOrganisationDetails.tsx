import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import StuUpdatesOrganisationDetailsCommon from "../../components/StuUpdatesOrganisationDetailsCommon/StuUpdatesOrganisationDetailsCommon";

const StuUpdatesOrganisationDetails = () => {
  const { organisationId } = useParams<{ organisationId: string }>();

  useEffect(() => {
    document.documentElement.scrollTop = 0;

    document.title = "Connected Organisation Details | CatalysEd";
  });

  return (
    <div className="StuUpdatesOrganisationDetailsPage Page">
      <StuUpdatesOrganisationDetailsCommon
        organisationName="CatalysEd"
        organisationId={parseInt(organisationId)}
      />
    </div>
  );
};

export default StuUpdatesOrganisationDetails;
