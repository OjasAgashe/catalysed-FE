import React, { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";
import StuSuggestedProgramApplicationForm from "../../components/StuSuggestedProgramApplicationForm/StuSuggestedProgramApplicationForm";
import StuSuggestedProgramDetailsCommon from "../../components/StuSuggestedProgramDetailsCommon/StuSuggestedProgramDetailsCommon";
import { useStudentAPI } from "../../context/api_context/StudentAPIContext";
import { stuSuggestedProgramApplicationReducer } from "../../reducers/stuSuggestedProgramApplicationReducer";

const StuSuggestedProgramApplication = () => {
  const [state, dispatch] = useReducer(stuSuggestedProgramApplicationReducer, {
    loading: false,
    error: "",
    validated: false,
    programTitle: "",
  });

  const { programId } = useParams<{ programId: string }>();
  const { getSuggestedProgramDetails } = useStudentAPI();

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
    <div className="StuSuggestedProgramApplicationPage Page">
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
        entity="STUDENT"
      />

      <StuSuggestedProgramApplicationForm
        state={state}
        dispatch={dispatch}
        programId={parseInt(programId)}
      />
    </div>
  );
};

export default StuSuggestedProgramApplication;
