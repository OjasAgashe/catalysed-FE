import React, { useEffect } from "react";
import { Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";
import OrgProgramDetailsCommon from "../../components/OrgProgramDetailsCommon/OrgProgramDetailsCommon";
import OrgProgramInvitationDetails from "../../components/OrgProgramInvitationDetails/OrgProgramInvitationDetails";
import "./OrgProgramDetailsPage.css";

const OrgProgramInvitationsPage = () => {
  const { programId } = useParams<{ programId: string }>();

  useEffect(() => {
    document.documentElement.scrollTop = 0;

    document.title = "Program Invitations | CatalysEd";
  }, []);

  return (
    <div className="OrgProgramInvitationsPage">
      <OrgProgramDetailsCommon
        programTitle="Temp Title"
        programId={parseInt(programId)}
      />

      <div className="SendNewInvitationTextContainer">
        <Alert variant="info" className="SendNewInvitationText">
          💡 Want to send a new invitation?&nbsp;Then&nbsp;
          <button className="SendNewInvitationClickHere">click here</button>
        </Alert>
      </div>

      <OrgProgramInvitationDetails />
    </div>
  );
};

export default OrgProgramInvitationsPage;
