import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import MentorSuggestedProgramApplicationForm from "../../components/MentorSuggestedProgramApplicationForm/MentorSuggestedProgramApplicationForm";
import StuSuggestedProgramDetailsCommon from "../../components/StuSuggestedProgramDetailsCommon/StuSuggestedProgramDetailsCommon";

const MentorSuggestedProgramApplication = () => {
  const { programId } = useParams<{ programId: string }>();

  useEffect(() => {
    document.documentElement.scrollTop = 0;

    document.title = "Suggested Program Application | CatalysEd";
  }, []);

  return (
    <div className="MentorSuggestedProgramApplicationPage Page">
      <StuSuggestedProgramDetailsCommon
        programTitle="ProgramTitle"
        programId={parseInt(programId)}
        entity="MENTOR"
      />

      <MentorSuggestedProgramApplicationForm />
    </div>
  );
};

export default MentorSuggestedProgramApplication;
