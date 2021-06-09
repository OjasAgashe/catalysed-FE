import React, { useEffect, useReducer } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";
import OrgProgramDetails from "../../components/OrgProgramDetails/OrgProgramDetails";
import OrgProgramDetailsCommon from "../../components/OrgProgramDetailsCommon/OrgProgramDetailsCommon";
import { ORGANISATION_PROGRAM_EDIT } from "../../constants/Routes";
import { useOrgAPI } from "../../context/api_context/OrgAPIContext";
import { orgProgramDetailsReducer } from "../../reducers/orgProgramDetailsReducer";
import "./OrgProgramDetailsPage.css";

const OrgProgramDetailsPage = () => {
  const [state, dispatch] = useReducer(orgProgramDetailsReducer, {
    loading: true,
    error: "",
    responseData: null,
  });

  const { programId } = useParams<{ programId: string }>();

  const { getProgramDetails } = useOrgAPI();

  useEffect(() => {
    document.documentElement.scrollTop = 0;

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

      {state.responseData && (
        <div className="EditLinkProgramDetails">
          <span>
            Want to Edit? Then&nbsp;
            <Link
              to={`${ORGANISATION_PROGRAM_EDIT}/${programId}`}
              className="EditLinkClickHere"
            >
              click here
            </Link>
          </span>
        </div>
      )}
    </div>
  );
};

export default OrgProgramDetailsPage;
