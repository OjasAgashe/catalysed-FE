import React, { useEffect, useReducer } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";
import OrgProgramDetails from "../../components/OrgProgramDetails/OrgProgramDetails";
import OrgProgramDetailsCommon from "../../components/OrgProgramDetailsCommon/OrgProgramDetailsCommon";
import { ORGANISATION_PROGRAM_DETAILS } from "../../constants/Routes";
import { useOrgAPI } from "../../context/api_context/OrgAPIContext";
import { orgProgramDetailsReducer } from "../../reducers/orgProgramDetailsReducer";
import "./OrgProgramDetailsPage.css";

const OrgProgramDetailsPage = () => {
  /*
   * state.loading: to show the LoadingProgress component till we are
   * getting the Program details
   *
   * state.error: to show any error
   *
   * state.responseData: to store the Program details
   */
  const [state, dispatch] = useReducer(orgProgramDetailsReducer, {
    loading: true,
    error: "",
    responseData: null,
  });

  const { programId } = useParams<{ programId: string }>();
  const history = useHistory();
  const { getProgramDetails } = useOrgAPI();

  useEffect(() => {
    /*
     * Whenever anyone visits this page first time, we want the scroll
     * bar position on Top
     */
    document.documentElement.scrollTop = 0;

    // Set the document title
    document.title = "Program Details | CatalysEd";

    // Function to call API, to get Program Details
    const getDetails = async () => {
      try {
        /*
         * If previously we have shown any error, then hide it
         */
        dispatch({ type: "error", payload: "" });

        // get the Program details
        const response = await getProgramDetails(parseInt(programId));

        // store the Program details
        dispatch({ type: "responseData", payload: response.data });

        /*
         * after successful getting the Program details, hide the
         * LoadingProgress component
         */
        dispatch({ type: "loading", payload: false });
      } catch (error) {
        if (error.response.status === 404) {
          /*
           * If we get 404 error, then push the Org to PageNotFound
           */
          history.push("*");
        } else {
          /*
           * If we get any other error, then 404, then first hide the
           * LoadingProgress
           */
          dispatch({ type: "loading", payload: false });

          // Then store the error
          dispatch({ type: "error", payload: "Sorry!! No Details Found" });
        }
      }
    };

    // Call the getDetails function
    getDetails();
  }, [dispatch, getProgramDetails, history, programId]);

  return (
    <div className="OrgProgramDetailsPage Page">
      {/* Show LoadingProgress component */}
      {state.loading && (
        <LoadingProgress
          loading={state.loading}
          emailSent={false}
          loadingMessage="Getting Details..."
        />
      )}

      {/* Show OrgProgramDetailsCommon component */}
      <OrgProgramDetailsCommon
        programTitle={state.responseData ? state.responseData.title : ""}
        programId={parseInt(programId)}
      />

      {/* Show OrgProgramDetails component */}
      <OrgProgramDetails state={state} />

      {/*
       * Give option to Edit the shown details
       */}
      {state.responseData && (
        <div className="EditLinkProgramDetails">
          <span>
            Want to Edit? Then&nbsp;
            <Link
              to={`${ORGANISATION_PROGRAM_DETAILS}/${programId}/edit`}
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
