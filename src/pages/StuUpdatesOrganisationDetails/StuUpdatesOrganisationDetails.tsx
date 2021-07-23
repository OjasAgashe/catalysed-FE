import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import StuUpdatesOrganisationDetailsCommon from "../../components/StuUpdatesOrganisationDetailsCommon/StuUpdatesOrganisationDetailsCommon";
import StuUpdatesOrganisationDetailsInfo from "../../components/StuUpdatesOrganisationDetailsInfo/StuUpdatesOrganisationDetailsInfo";

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
        entity="STUDENT"
      />

      <StuUpdatesOrganisationDetailsInfo />
    </div>
  );
};

export default StuUpdatesOrganisationDetails;
