import React, { useEffect, useReducer } from "react";
import { useHistory, useParams } from "react-router-dom";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";
import OrgDirectoryDetailsCommonHeader from "../../components/OrgDirectoryDetailsCommonHeader/OrgDirectoryDetailsCommonHeader";
import OrgDirectoryDetailsConnectedToPrograms from "../../components/OrgDirectoryDetailsConnectedToPrograms/OrgDirectoryDetailsConnectedToPrograms";
import OrgDirectoryDetailsPersonalInfo from "../../components/OrgDirectoryDetailsPersonalInfo/OrgDirectoryDetailsPersonalInfo";
import { useOrgAPI } from "../../context/api_context/OrgAPIContext";
import { orgDirectoryDetailsReducer } from "../../reducers/orgDirectoryDetailsReducer";

const OrgDirectoryMentorDetailsPage = () => {
  /*
   * state.choosedOption : will contain the current tab status, What the
   * Org currently seeing, Personal Info information Or Connected to Programs
   * information
   *
   * state.responseData : will store the response that we will get from successful
   * API call
   *
   * state.loading : has initial value as true because we will show loading progress
   * component till we don't get the response of our API call
   *
   * state.error : to show the error, we are getting from unsuccessful API call
   */
  const [state, dispatch] = useReducer(orgDirectoryDetailsReducer, {
    choosedOption: "PersonalInfo",
    responseData: null,
    loading: true,
    error: "",
  });

  /* Get mentorId value from the dynamic parameter of the URL */
  const { mentorId } = useParams<{ mentorId: string }>();

  /*
   * When API call is not successful, and we got 404 status
   * code in error response, then we will push the Org to PageNotFound
   * using history object
   */
  const history = useHistory();

  /*
   * getSpecificConnectedMentor : API to get the data of a specific mentor
   */
  const { getSpecificConnectedMentor } = useOrgAPI();

  useEffect(() => {
    /*
     * Whenever page renders, we want that the scroll bar should point to top
     */
    document.documentElement.scrollTop = 0;

    // Set the document title
    document.title = "Mentor Details | CatalysEd";

    /*
     * getDetails : () => Promise<void>
     * function to call API, to get a specific mentor data based on the
     * value of mentorId
     */
    const getDetails = async () => {
      try {
        /*
         * If we have shown any error message, then before calling to
         * API we are hiding that error message. So set error to ""
         */
        dispatch({ type: "error", payload: "" });

        /*
         * call to get data of specifc mentor, based on the mentorId value
         */
        const response = await getSpecificConnectedMentor(parseInt(mentorId));

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
  }, [getSpecificConnectedMentor, history, mentorId]);

  return (
    <div className="OrgDirectoryMentorPage Page">
      {/*
       * Till the value of state.loading is true, show
       * LoadingProgress component
       */}
      {state.loading && (
        <LoadingProgress
          loading={state.loading}
          emailSent={false}
          loadingMessage="Getting Details..."
        />
      )}

      {/* OrgDirectoryDetailsCommonHeader component */}
      <OrgDirectoryDetailsCommonHeader state={state} dispatch={dispatch} />

      {/*
       * If the value in state.choosedOption is "PersonalInfo" then
       * show OrgDirectoryDetailsPersonalInfo component
       */}
      {state.choosedOption === "PersonalInfo" && (
        <OrgDirectoryDetailsPersonalInfo state={state} />
      )}

      {/*
       * If the value in state.choosedOption is "ConnectedToPrograms" then
       * show OrgDirectoryDetailsConnectedToPrograms component
       */}
      {state.choosedOption === "ConnectedToPrograms" && (
        <OrgDirectoryDetailsConnectedToPrograms state={state} />
      )}
    </div>
  );
};

export default OrgDirectoryMentorDetailsPage;
