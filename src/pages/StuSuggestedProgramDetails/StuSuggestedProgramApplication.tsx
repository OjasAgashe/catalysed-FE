import React, { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";
import StuSuggestedProgramApplicationForm from "../../components/StuSuggestedProgramApplicationForm/StuSuggestedProgramApplicationForm";
import StuSuggestedProgramDetailsCommon from "../../components/StuSuggestedProgramDetailsCommon/StuSuggestedProgramDetailsCommon";
import { useStudentAPI } from "../../context/api_context/StudentAPIContext";
import { stuSuggestedProgramApplicationReducer } from "../../reducers/stuSuggestedProgramApplicationReducer";

const StuSuggestedProgramApplication = () => {
  /*
   * state.loading: to show LoadingProgress component, When we are
   * making call of API, to create a new Application
   *
   * state.error: to show an error, if we get while making API call
   *
   * state.validated: to validate application form
   *
   * state.programTitle: to store the program title, we will send it
   * to the Header
   */
  const [state, dispatch] = useReducer(stuSuggestedProgramApplicationReducer, {
    loading: false,
    error: "",
    validated: false,
    programTitle: "",
  });

  const { programId } = useParams<{ programId: string }>();
  const { getSuggestedProgramDetails } = useStudentAPI();

  useEffect(() => {
    /*
     * Whenever anyone visits this page first time, we want the
     * scroll position on top
     */
    document.documentElement.scrollTop = 0;

    // Set the document title
    document.title = "Suggested Program Application | CatalysEd";

    // Function calling API to get program title
    const getTitle = async () => {
      try {
        // call API
        const response = await getSuggestedProgramDetails(parseInt(programId));

        // store program title
        dispatch({ type: "programTitle", payload: response.data.title });
      } catch (error) {}
    };

    // Call getTitle function
    getTitle();
  }, [getSuggestedProgramDetails, programId]);

  return (
    <div className="StuSuggestedProgramApplicationPage Page">
      {/* Show LoadingProgress component */}
      {state.loading && (
        <LoadingProgress
          loading={state.loading}
          emailSent={false}
          loadingMessage="Working On It..."
        />
      )}

      {/* Show StuSuggestedProgramDetailsCommon component */}
      <StuSuggestedProgramDetailsCommon
        programTitle={state.programTitle}
        programId={parseInt(programId)}
        entity="STUDENT"
      />

      {/* Show StuSuggestedProgramApplicationForm component */}
      <StuSuggestedProgramApplicationForm
        state={state}
        dispatch={dispatch}
        programId={parseInt(programId)}
      />
    </div>
  );
};

export default StuSuggestedProgramApplication;
