import React, { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";
import MentorSuggestedProgramApplicationForm from "../../components/MentorSuggestedProgramApplicationForm/MentorSuggestedProgramApplicationForm";
import StuSuggestedProgramDetailsCommon from "../../components/StuSuggestedProgramDetailsCommon/StuSuggestedProgramDetailsCommon";
import { stuSuggestedProgramApplicationReducer } from "../../reducers/stuSuggestedProgramApplicationReducer";

const MentorSuggestedProgramApplication = () => {
  const [state, dispatch] = useReducer(stuSuggestedProgramApplicationReducer, {
    loading: false,
    error: "",
    validated: false,
  });

  const { programId } = useParams<{ programId: string }>();

  useEffect(() => {
    document.documentElement.scrollTop = 0;

    document.title = "Suggested Program Application | CatalysEd";
  }, []);

  return (
    <div className="MentorSuggestedProgramApplicationPage Page">
      {state.loading && (
        <LoadingProgress
          loading={state.loading}
          emailSent={false}
          loadingMessage="Working On It..."
        />
      )}

      <StuSuggestedProgramDetailsCommon
        programTitle="ProgramTitle"
        programId={parseInt(programId)}
        entity="MENTOR"
      />

      <MentorSuggestedProgramApplicationForm
      state={state} dispatch={dispatch} programId={parseInt(programId)} />
    </div>
  );
};

export default MentorSuggestedProgramApplication;
