import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import OrgProgramDetailsCommon from "../../components/OrgProgramDetailsCommon/OrgProgramDetailsCommon";

const OrgProgramInvitationsPage = () => {
  const { programId } = useParams<{ programId: string }>();

  useEffect(() => {
    document.title = "Program Invitations | CatalysEd";
  }, []);

  return (
    <div className="OrgProgramInvitationsPage">
      <OrgProgramDetailsCommon programId={parseInt(programId)} />
      Org Invitaions DetailsCommon
    </div>
  );
};

export default OrgProgramInvitationsPage;
