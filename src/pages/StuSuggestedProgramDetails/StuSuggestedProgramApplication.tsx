import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import StuSuggestedProgramApplicationForm from "../../components/StuSuggestedProgramApplicationForm/StuSuggestedProgramApplicationForm";
import StuSuggestedProgramDetailsCommon from "../../components/StuSuggestedProgramDetailsCommon/StuSuggestedProgramDetailsCommon";

const StuSuggestedProgramApplication = () => {
  const { programId } = useParams<{ programId: string }>();

  useEffect(() => {
    document.documentElement.scrollTop = 0;

    document.title = "Suggested Program Application | CatalysEd";
  }, []);

  return (
    <div className="StuSuggestedProgramApplicationPage Page">
      <StuSuggestedProgramDetailsCommon
        programTitle="Program Title"
        programId={parseInt(programId)}
      />

      <StuSuggestedProgramApplicationForm />
    </div>
  );
};

export default StuSuggestedProgramApplication;
