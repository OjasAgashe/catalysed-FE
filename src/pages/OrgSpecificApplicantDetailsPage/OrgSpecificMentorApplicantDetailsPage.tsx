import React, { useEffect, useReducer } from "react";
import { useHistory, useParams } from "react-router-dom";
import Error from "../../components/Error/Error";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";
import OrgDirectoryDetailsConnectedToPrograms from "../../components/OrgDirectoryDetailsConnectedToPrograms/OrgDirectoryDetailsConnectedToPrograms";
import OrgDirectoryDetailsPersonalInfo from "../../components/OrgDirectoryDetailsPersonalInfo/OrgDirectoryDetailsPersonalInfo";
import OrgSpecificApplicantApplicationDetails from "../../components/OrgSpecificApplicantApplicationDetails/OrgSpecificApplicantApplicationDetails";
import OrgSpecificApplicantDetailsHeader from "../../components/OrgSpecificApplicantDetailsHeader/OrgSpecificApplicantDetailsHeader";
import { useOrgAPI } from "../../context/api_context/OrgAPIContext";
import { orgSpecificApplicantDetailsReducer } from "../../reducers/orgSpecificApplicantDetailsReducer";
import "./OrgSpecificApplicantDetailsPage.css";

const OrgSpecificMentorApplicantDetailsPage = () => {
  /*
   * state.choosedOption : will contain the current tab status, What the Org
   * currently seeing, Application information, Or Personal Info information,
   * Or Connected to Programs information
   *
   * state.responseData : will store the response that we will get from successful
   * API call
   *
   * status.loading : has initial value as true because we will show loading progress
   * component till we don't get the response of our API call
   *
   * state.error : to show the error, we are getting from unsuccessful API call
   *
   * state.loadingMessage : will contain the message that we want to show on loading
   * progress component, as the loading progress component will also become visible when
   * the Org will accept or reject an application. And that time we will show different
   * message on loading progress component
   *
   * state.reRenderComponent : this state we are using to do the custom re-rendering, when
   * the Org will accept or reject an application, after that we want to change the style
   * of application UI according to its status. That's why we are re-rendering the component
   * (or page), so that the fetching data API got call again and state.responseData has
   * current status of the application (Pending, Accepted, Or Rejected)
   */
  const [state, dispatch] = useReducer(orgSpecificApplicantDetailsReducer, {
    choosedOption: "Application",
    responseData: null,
    loading: true,
    error: "",
    loadingMessage: "",
    reRenderComponent: false,
  });

  /*
   * Get applicationId, and programId value from the dynamic
   * parameter of the URL
   */
  const { applicationId, programId } =
    useParams<{ applicationId: string; programId: string }>();

  /*
   * When API call is not successful, and we got 404 status
   * code in error response, then we will push the Org to PageNotFound
   * using history object
   */
  const history = useHistory();

  /*
   * getSpecificMentorApplicantDetails : API to get the data of a
   * specific mentor applicant
   */
  const { getSpecificMentorApplicantDetails } = useOrgAPI();

  useEffect(() => {
    /*
     * Whenever page renders, we want that the scroll bar should point to top
     */
    document.documentElement.scrollTop = 0;

    // Set the document title
    document.title = "Mentor Applicant Details | CatalysEd";

    /*
     * Everytime before calling the API, to get data, we will check if
     * state.reRenderComponent is true or not. If it is true, we will set
     * its value to false, so that when we call API to accept or reject
     * application we can set its value to value to true, and the page got
     * re-render
     */
    if (state.reRenderComponent)
      dispatch({ type: "reRenderComponent", payload: false });

    /*
     * getDetails : () => Promise<void>
     * function to call API, to get a specific mentor applicant data based
     * on the value of programId and applicationId
     */
    const getDetails = async () => {
      try {
        /*
         * If we have shown any error message, then before calling to
         * API we are hiding that error message. So set error to ""
         */
        dispatch({ type: "error", payload: "" });

        /*
         * show loadingMessage of Getting Details
         */
        dispatch({ type: "loadingMessage", payload: "Getting Details..." });

        /*
         * call to get data of specific mentor applicant, based on the
         * value of programId, applicationId
         */
        const response = await getSpecificMentorApplicantDetails(
          parseInt(programId),
          parseInt(applicationId)
        );

        // storing the response data in state.responseData
        dispatch({ type: "responseData", payload: response.data });

        /*
         * then to hide the loading progress component, set state.loading
         * to false
         */
        dispatch({ type: "loading", payload: false });
      } catch (error) {
        if (error.response.status === 404) {
          /*
           * if we get 404 status code in error response, then
           * push the Org to PageNotFound
           */
          history.push("*");
        } else {
          /*
           * And we get something else in error, then hide the loading
           * Progress component and show the Error of "Details Not Found"
           */
          dispatch({ type: "loading", payload: false });
          dispatch({ type: "error", payload: "Sorry !! No Details Found" });
        }
      }
    };

    // Call to getDetails function
    getDetails();
  }, [
    applicationId,
    getSpecificMentorApplicantDetails,
    history,
    programId,
    state.reRenderComponent,
  ]);

  return (
    <div className="OrgSpecificMentorApplicantDetailsPage Page">
      {/*
       * Till the value of state.loading is true, show
       * LoadingProgress component, with the correct loadingMessage
       */}

      {state.loading && (
        <LoadingProgress
          loading={state.loading}
          emailSent={false}
          loadingMessage={state.loadingMessage}
        />
      )}

      {/* OrgSpecificApplicantDetailsHeader component */}
      <OrgSpecificApplicantDetailsHeader state={state} dispatch={dispatch} />

      {/*
       * If we do not have any error, only then show the details according to
       * the value of state.choosedOption
       */}
      {state.error.length === 0 ? (
        <>
          {/*
           * If the value in state.choosedOption is "Application" then show
           * OrgSpecificApplicantApplicationDetails component
           */}
          {state.choosedOption === "Application" && (
            <OrgSpecificApplicantApplicationDetails
              state={state}
              dispatch={dispatch}
            />
          )}

          {/*
           * If the value in state.choosedOption is "PersonalInfo" then
           * show OrgDirectoryDetailsPersonalInfo component
           */}
          {state.choosedOption === "PersonalInfo" && (
            <OrgDirectoryDetailsPersonalInfo applicantState={state} />
          )}

          {/*
           * If the value in state.choosedOption is "ConnectedToPrograms" then
           * show OrgDirectoryDetailsConnectedToPrograms component
           */}
          {state.choosedOption === "ConnectedToPrograms" && (
            <OrgDirectoryDetailsConnectedToPrograms applicantState={state} />
          )}
        </>
      ) : (
        /*
         * If there is something in state.error, then show the error
         */
        <div className="ErrorDiv">
          <Error message={state.error} />
        </div>
      )}
    </div>
  );
};

export default OrgSpecificMentorApplicantDetailsPage;
