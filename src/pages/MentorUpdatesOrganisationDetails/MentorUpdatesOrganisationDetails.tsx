import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import StuUpdatesOrganisationDetailsCommon from "../../components/StuUpdatesOrganisationDetailsCommon/StuUpdatesOrganisationDetailsCommon";
import StuUpdatesOrganisationDetailsInfo from "../../components/StuUpdatesOrganisationDetailsInfo/StuUpdatesOrganisationDetailsInfo";

const MentorUpdatesOrganisationDetails = () => {
  const { organisationId } = useParams<{ organisationId: string }>();

  useEffect(() => {
    document.documentElement.scrollTop = 0;

    document.title = "Connected Organisation Details | CatalysEd";
  });

  return (
    <div className="MentorUpdatesOrganisationDetailsPage Page">
      <StuUpdatesOrganisationDetailsCommon
        organisationName="CatalysEd"
        organisationId={parseInt(organisationId)}
        entity="MENTOR"
      />

      <StuUpdatesOrganisationDetailsInfo />
    </div>
  );
};

export default MentorUpdatesOrganisationDetails;
