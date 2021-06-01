import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import OrgProgramDetailsCommon from "../../components/OrgProgramDetailsCommon/OrgProgramDetailsCommon";

const OrgProgramParticipantsPage = () => {
  const { programId } = useParams<{ programId: string }>();

  useEffect(() => {
    document.documentElement.scrollTop = 0;

    document.title = "Program Participants | CatalysEd";
  }, []);

  return (
    <div className="OrgProgramParticipantsPage">
      <OrgProgramDetailsCommon programId={parseInt(programId)} />
      Org Participants Details
    </div>
  );
};

export default OrgProgramParticipantsPage;
