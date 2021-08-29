import React, { useEffect, useReducer } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";
import StuUpdatesOrganisationDetailsCommon from "../../components/StuUpdatesOrganisationDetailsCommon/StuUpdatesOrganisationDetailsCommon";
import StuUpdatesOrganisationDetailsInfo from "../../components/StuUpdatesOrganisationDetailsInfo/StuUpdatesOrganisationDetailsInfo";
import StuUpdatesOrganisationProgramsDetails from "../../components/StuUpdatesOrganisationProgramsDetails/StuUpdatesOrganisationProgramsDetails";
import { STUDENT_UPDATES_DETAILS_ORGANISATION } from "../../constants/Routes";
import { useStudentAPI } from "../../context/api_context/StudentAPIContext";
import { stuUpdatesOrganisationDetailsReducer } from "../../reducers/stuUpdatesOrganisationDetailsReducer";
import Error from "../../components/Error/Error";
import "./StuUpdatesOrganisationDetails.css";

const StuUpdatesOrganisationDetails = () => {
  const location = useLocation();

  /*
   * state.choosedOption: to store the current selected Tab
   *
   * state.responseData: to store the Data that we will get from
   * API call
   *
   * state.loading: to show LoadingProgress, till we are getting Data
   *
   * state.error: to show Error, if we get any from API call
   */
  const [state, dispatch] = useReducer(stuUpdatesOrganisationDetailsReducer, {
    choosedOption:
      location.pathname.includes(STUDENT_UPDATES_DETAILS_ORGANISATION) &&
      location.pathname.includes("details")
        ? "Details"
        : location.pathname.includes(STUDENT_UPDATES_DETAILS_ORGANISATION) &&
          location.pathname.includes("programs")
        ? "Programs"
        : "",
    responseData: null,
    loading: true,
    error: "",
  });

  const { organisationId } = useParams<{ organisationId: string }>();
  const history = useHistory();
  const { getConnectedOrganisationDetails } = useStudentAPI();

  useEffect(() => {
    /*
     * Whenever anyone visits this page first time, we want the
     * scroll bar on Top
     */
    document.documentElement.scrollTop = 0;

    // Set the document title
    document.title = `Connected Organisation ${state.choosedOption} | CatalysEd`;

    // Function to call API, and get Data
    const getDetails = async () => {
      try {
        // Previously, if we have shown any error then hide it
        dispatch({ type: "error", payload: "" });

        // call API
        const response = await getConnectedOrganisationDetails(
          parseInt(organisationId)
        );

        // Store the Data that we get from API call
        dispatch({ type: "responseData", payload: response.data });

        // After storing, hide the LoadingProgress
        dispatch({ type: "loading", payload: false });
      } catch (error) {
        if (error.response.status === 404) {
          /*
           * If while calling API, we get 404 error then push the user to
           * PageNotFound
           */
          history.push("*");
        } else {
          /*
           * If we get any other error, then first hide LoadingProgress
           */
          dispatch({ type: "loading", payload: false });

          // And then show the Error
          dispatch({ type: "error", payload: "Sorry !! No Details Found" });
        }
      }
    };

    // Call getDetails function
    getDetails();
  }, [
    getConnectedOrganisationDetails,
    history,
    organisationId,
    state.choosedOption,
  ]);

  return (
    <div className="StuUpdatesOrganisationDetailsPage Page">
      {/* Show LoadingProgress component */}
      {state.loading && (
        <LoadingProgress
          loading={state.loading}
          emailSent={false}
          loadingMessage="Getting Details..."
        />
      )}

      {/* Show StuUpdatesOrganisationDetailsCommon component */}
      <StuUpdatesOrganisationDetailsCommon
        state={state}
        dispatch={dispatch}
        organisationId={parseInt(organisationId)}
        entity="STUDENT"
      />

      {state.error.length === 0 ? (
        <>
          {/* Show Data only when we do not have any error */}
          {state.choosedOption === "Details" && (
            /*
             * If current selected Tab is "Details", then show
             * StuUpdatesOrganisationDetailsInfo component
             */
            <StuUpdatesOrganisationDetailsInfo
              orgDetails={state.responseData?.orgDetails ?? null}
            />
          )}

          {state.choosedOption === "Programs" && (
            /*
             * If current selected Tab is "Programs", then show
             * StuUpdatesOrganisationProgramsDetails component
             */
            <StuUpdatesOrganisationProgramsDetails
              programs={state.responseData?.programs ?? null}
            />
          )}
        </>
      ) : (
        /*
         * If we have error, then in place of Data, show that error
         */
        <div className="ErrorDiv">
          <Error message={state.error} />
        </div>
      )}
    </div>
  );
};

export default StuUpdatesOrganisationDetails;
