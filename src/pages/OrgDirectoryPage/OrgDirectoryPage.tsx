import React, { useEffect, useReducer } from "react";
import { Redirect } from "react-router-dom";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";
import OrgDirectoryPageHeader from "../../components/OrgDirectoryPageHeader/OrgDirectoryPageHeader";
import OrgMentorDirectory from "../../components/OrgMentorDirectory/OrgMentorDirectory";
import { useOrgAPI } from "../../context/api_context/OrgAPIContext";
import { useQuery } from "../../custom_hooks/useQuery";
import { orgDirectoryReducer } from "../../reducers/orgDirectoryReducer";
import OrgStudentDirectory from "../../components/OrgStudentDirectory/OrgStudentDirectory";

const OrgDirectoryPage = () => {
  /*
   * getConnectedMentors : API to get meta data of connected mentors,
   * for the mentor tab on Directory Page
   *
   * getConnectedStudents : API to get meta data of connected students,
   * for the student tab on Directory Page
   */
  const { getConnectedMentors, getConnectedStudents } = useOrgAPI();

  /*
   * query : URLSearchParams instance, to get the value of "type" query
   * parameter, we are using it to show the hero text on
   * OrgDirectoryPageHeader component
   */
  const query = useQuery();

  /*
   * state.title : will have the current value of "type" query parameter,
   * with the help of it we will show document title, hero text on
   * OrgDirectoryPageHeader Component, and will make the right API call to
   * get the meta data of mentor or student
   *
   * state.loading : will have initial value as true, as we will show
   * loading progress till we don't get the response of our API call.
   * we will make API call to get the meta data after just the page renders
   *
   * state.searchedName : will have "" as initial value, we have keep it on
   * Directory page because our search bar is on OrgDirectoryPageHeader
   * component and we are filtering the response on the same component.
   * But we are displaying the filtered response on OrgMentorDirectory or
   * OrgStudentDirectory component, based on the value of searchedName
   *
   * state.searchedNameNotFound : to show error message when we got our
   * searched result as an empty array
   *
   * state.error : to show the error, we are getting from unsuccessful API
   * call
   *
   * state.responseData : to store the response we are getting from successful
   * API call
   *
   * state.filteredResponseData : to store the filtered response that we will
   * get from filtering responseData based on state.searchedName value.
   */
  const [state, dispatch] = useReducer(orgDirectoryReducer, {
    title:
      query.get("type") === "MENTOR"
        ? "Mentors"
        : query.get("type") === "STUDENT"
        ? "Students"
        : "",
    loading: true,
    searchedName: "",
    searchedNameNotFound: false,
    error: "",
    responseData: null,
    filteredResponseData: null,
  });

  useEffect(() => {
    /*
     * Whenever page renders, we want that the scroll bar should point to top
     */
    document.documentElement.scrollTop = 0;

    /*
     * Set the document title, based on "type" query parameter value
     */
    document.title = `Org ${state.title} Directory | CatalysEd`;

    /*
     * getDetails :  () => Promise<void>
     * function to call API, to get meta data of connected mentors
     * and students
     */
    const getDetails = async () => {
      try {
        /*
         * Before calling to API, we want to show loading progress.
         * So set loading to true
         * 
         * And we are doing this because API will get called each time
         * the tab changes, and we will get all the current data that 
         * we will have in our system
         */
        dispatch({ type: "loading", payload: true });

        /*
         * If we have shown any error message, then before calling to
         * API we are hiding that error message. So set error to ""
         */
        dispatch({ type: "error", payload: "" });

        /*
         * to store the response of getConnectedMentors API call or
         * getConnectedStudents API call
         */
        let response;

        if (state.title === "Mentors") {
          // call to getConnectedMentors API
          response = await getConnectedMentors();
        } else if (state.title === "Students") {
          // call to getConnnectedStudents API
          response = await getConnectedStudents();
        }

        // storing response in state.responseData
        dispatch({ type: "responseData", payload: response?.data });
      } catch (error) {
        // storing error in state.error, In case of unsuccessful API call
        dispatch({ type: "error", payload: "Sorry!! No Data Found" });
      } finally {
        /*
         * setting loading to false, after both successful
         * or unsuccessful API call
         */
        dispatch({ type: "loading", payload: false });
      }
    };

    /*
     * Call to getDetails function
     */
    getDetails();
  }, [getConnectedMentors, getConnectedStudents, state.title]);

  return state.title ? (
    <div className="OrgDirectoryPage Page">
      {/*
       * Till the value of state.loading is true, show
       * LoadingProgress component
       */}
      {state.loading && (
        <LoadingProgress
          loading={state.loading}
          emailSent={false}
          loadingMessage={`Getting ${state.title} Data...`}
        />
      )}

      {/* OrgDirectoryPageHeader component */}
      <OrgDirectoryPageHeader state={state} dispatch={dispatch} />

      {/*
       * if "type" query parameter has "MENTOR" as a value,
       * then show OrgMentorDirectory component
       */}
      {state.title === "Mentors" && <OrgMentorDirectory state={state} />}

      {/*
       * if "type" query parameter has "STUDENT" as a value,
       * then show OrgStudentDirectory component
       */}
      {state.title === "Students" && <OrgStudentDirectory state={state} />}
    </div>
  ) : (
    /*
     * If "type" query parameter has value other than "MENTOR"
     * and "STUDENT", then redirect to Page Not Found
     */
    <Redirect to="*" />
  );
};

export default OrgDirectoryPage;
