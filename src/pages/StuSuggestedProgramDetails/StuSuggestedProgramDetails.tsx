import React, { useEffect, useReducer } from "react";
import { useHistory, useParams } from "react-router-dom";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";
import OrgProgramDetails from "../../components/OrgProgramDetails/OrgProgramDetails";
import StuSuggestedProgramDetailsCommon from "../../components/StuSuggestedProgramDetailsCommon/StuSuggestedProgramDetailsCommon";
import { useStudentAPI } from "../../context/api_context/StudentAPIContext";
import { stuUpdatesProgramDetailsReducer } from "../../reducers/stuUpdatesProgramDetailsReducer";

const StuSuggestedProgramDetails = () => {
  const [state, dispatch] = useReducer(stuUpdatesProgramDetailsReducer, {
    loading: true,
    error: "",
    responseData: null,
  });

  const { programId } = useParams<{ programId: string }>();
  const history = useHistory();
  const { getSuggestedProgramDetails } = useStudentAPI();

  useEffect(() => {
    document.documentElement.scrollTop = 0;

    document.title = "Suggested Program Details | CatalysEd";

    const getDetails = async () => {
      try {
        dispatch({ type: "error", payload: "" });

        const response = await getSuggestedProgramDetails(parseInt(programId));

        dispatch({ type: "responseData", payload: response.data });
        dispatch({ type: "loading", payload: false });
      } catch (error) {
        if (error.response.status === 404) {
          history.push("*");
        } else {
          dispatch({ type: "loading", payload: false });
          dispatch({ type: "error", payload: "Sorry!! No Details Found" });
        }
      }
    };

    getDetails();
  }, [getSuggestedProgramDetails, history, programId]);

  return (
    <div className="StuSuggestedProgramDetailsPage Page">
      {state.loading && (
        <LoadingProgress
          loading={state.loading}
          emailSent={false}
          loadingMessage="Getting Details..."
        />
      )}

      <StuSuggestedProgramDetailsCommon
        programTitle={state.responseData?.title ?? ""}
        programId={parseInt(programId)}
        entity="STUDENT"
      />

      <OrgProgramDetails state={state} />
    </div>
  );
};

export default StuSuggestedProgramDetails;
