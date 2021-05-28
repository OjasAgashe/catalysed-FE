import React, { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";
import OrgProgramDetails from "../../components/OrgProgramDetails/OrgProgramDetails";
import OrgProgramDetailsCommon from "../../components/OrgProgramDetailsCommon/OrgProgramDetailsCommon";
import { useOrgCreateProgram } from "../../context/api_context/OrgCreateProgramContext";
import { orgProgramDetailsReducer } from "../../reducers/orgProgramDetailsReducer";
import "./OrgProgramDetailsPage.css";

const OrgProgramDetailsPage = () => {
  const [state, dispatch] = useReducer(orgProgramDetailsReducer, {
    loading: true,
    error: "",
    responseData: null,
  });

  const { programId } = useParams<{ programId: string }>();

  const { getProgramDetails } = useOrgCreateProgram();

  useEffect(() => {
    document.title = "Program Details | CatalysEd";

    const getDetails = async () => {
      try {
        dispatch({ type: "error", payload: "" });
        const response = await getProgramDetails(parseInt(programId));
        dispatch({ type: "responseData", payload: response.data });
      } catch (error) {
        dispatch({ type: "error", payload: "Sorry!! No Details Found" });
      } finally {
        dispatch({ type: "loading", payload: false });
      }
    };

    getDetails();
  }, [dispatch, getProgramDetails, programId]);

  return (
    <div className="OrgProgramDetailsPage">
      {state.loading && (
        <LoadingProgress
          loading={state.loading}
          emailSent={false}
          loadingMessage="Getting Details..."
        />
      )}

      <OrgProgramDetailsCommon
        programTitle={state.responseData ? state.responseData.title : ""}
        programId={parseInt(programId)}
      />

      <OrgProgramDetails state={state} />
    </div>
  );
};

export default OrgProgramDetailsPage;
