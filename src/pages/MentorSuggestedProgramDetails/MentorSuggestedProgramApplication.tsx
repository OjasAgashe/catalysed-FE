/*
 * This page is much same as StuSuggestedProgramApplication of StuSuggestedProgramDetails
 * page,
 *
 * the difference is in API call, and instead of StuSuggestedProgramApplicationForm
 * we are showing MentorSuggestedProgramApplicationForm
 */

import React, { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";
import MentorSuggestedProgramApplicationForm from "../../components/MentorSuggestedProgramApplicationForm/MentorSuggestedProgramApplicationForm";
import StuSuggestedProgramDetailsCommon from "../../components/StuSuggestedProgramDetailsCommon/StuSuggestedProgramDetailsCommon";
import { useMentorAPI } from "../../context/api_context/MentorAPIContext";
import { stuSuggestedProgramApplicationReducer } from "../../reducers/stuSuggestedProgramApplicationReducer";

const MentorSuggestedProgramApplication = () => {
  const [state, dispatch] = useReducer(stuSuggestedProgramApplicationReducer, {
    loading: false,
    error: "",
    validated: false,
    programTitle: "",
  });

  const { programId } = useParams<{ programId: string }>();
  const { getSuggestedProgramDetails } = useMentorAPI();

  useEffect(() => {
    document.documentElement.scrollTop = 0;

    document.title = "Suggested Program Application | CatalysEd";

    const getTitle = async () => {
      try {
        const response = await getSuggestedProgramDetails(parseInt(programId));

        dispatch({ type: "programTitle", payload: response.data.title });
      } catch (error) {}
    };

    getTitle();
  }, [getSuggestedProgramDetails, programId]);

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
        programTitle={state.programTitle}
        programId={parseInt(programId)}
        entity="MENTOR"
      />

      {/* Show MentorSuggestedProgramApplicationForm component */}
      <MentorSuggestedProgramApplicationForm
        state={state}
        dispatch={dispatch}
        programId={parseInt(programId)}
      />
    </div>
  );
};

export default MentorSuggestedProgramApplication;
