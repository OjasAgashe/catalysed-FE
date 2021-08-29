import React, { useEffect, useReducer } from "react";
import { Redirect } from "react-router-dom";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";
import StuUpdatesApplications from "../../components/StuUpdatesApplications/StuUpdatesApplications";
import StuUpdatesOrganisations from "../../components/StuUpdatesOrganisations/StuUpdatesOrganisations";
import StuUpdatesPageHeader from "../../components/StuUpdatesPageHeader/StuUpdatesPageHeader";
import StuUpdatesPrograms from "../../components/StuUpdatesPrograms/StuUpdatesPrograms";
import { useStudentAPI } from "../../context/api_context/StudentAPIContext";
import { useQuery } from "../../custom_hooks/useQuery";
import { stuUpdatesReducer } from "../../reducers/stuUpdatesReducer";

const StudentUpdatesPage = () => {
  const {
    getAllFilledApplicationsDetails,
    getConnectedOrganisations,
    getConnectedPrograms,
  } = useStudentAPI();
  const query = useQuery();

  /*
   * state.view: to store the current selected Tab on Updates page
   *
   * state.loading: to show the LoadingProgress component, till we are
   * getting the details
   *
   * state.searchedName: to store the name that user want to search on
   * Application Tab
   *
   * state.selectedRadioForSort, state.selectedRadioForFilter: is to store the
   * selected option for filter and sort
   *
   * state.searchedNameNotFound: to show the error, when there is no data
   * we found in respect of searched name
   *
   * state.error: to show the error, if we get any during API call
   *
   * state.responseData: to store the Applications data
   *
   * state.connectedOrgData: to store the Organisation data
   *
   * state.connectedProgramData: to store the Program data
   *
   * state.filteredResponseData: to store the filtered data
   */

  const [state, dispatch] = useReducer(stuUpdatesReducer, {
    view:
      query.get("view") === "PROGRAMS"
        ? "Programs"
        : query.get("view") === "ORGANISATIONS"
        ? "Organisations"
        : query.get("view") === "APPLICATIONS"
        ? "Applications"
        : "",
    loading: true,
    searchedName: "",
    selectedRadioForSort: "All",
    selectedRadioForFilter: "All",
    searchedNameNotFound: "",
    error: "",
    responseData: null,
    connectedOrgData: null,
    connectedProgramData: null,
    filteredResponseData: null,
  });

  useEffect(() => {
    /*
     * Whenever anyone visits this page first time, we want
     * the scroll position on Top
     */
    document.documentElement.scrollTop = 0;

    // set the document title
    document.title = `Connected ${state.view} | CatalysEd`;

    // Function to call API and get Data
    const getDetails = async () => {
      try {
        // Show LoadingProgress component before API call
        dispatch({ type: "loading", payload: true });

        // If previously, we have shown any error then hide it
        dispatch({ type: "error", payload: "" });

        let response;

        if (state.view === "Applications") {
          /*
           * If currently user selected Applications Tab, then
           * get Application Data
           */

          // Call API
          response = await getAllFilledApplicationsDetails();

          // Store Data
          dispatch({ type: "responseData", payload: response?.data });
        }

        if (state.view === "Organisations") {
          /*
           * If currently user selected Organisations Tab, then
           * get Organisation Data
           */

          // Call API
          response = await getConnectedOrganisations();

          // Store Data
          dispatch({ type: "connectedOrgData", payload: response?.data });
        }

        if (state.view === "Programs") {
          /*
           * If currently user selected Programs Tab, then
           * get Program Data
           */

          // Call API
          response = await getConnectedPrograms();

          // Store Data
          dispatch({
            type: "connectedProgramData",
            payload: response?.data,
          });
        }
      } catch (error) {
        // If while calling the API we got any error, then show it
        dispatch({ type: "error", payload: "Sorry!! No Data Found" });
      } finally {
        // After doing all the above stuff, hide LoadingProgress
        dispatch({ type: "loading", payload: false });
      }
    };

    // Call getDetails function
    getDetails();
  }, [
    getAllFilledApplicationsDetails,
    getConnectedOrganisations,
    getConnectedPrograms,
    state.view,
  ]);

  return state.view ? (
    <div className="StudentUpdatesPage Page">
      {/*
       * Till the value of state.loading is true, show
       * LoadingProgress component
       */}
      {state.loading && (
        <LoadingProgress
          loading={state.loading}
          emailSent={false}
          loadingMessage={`Getting ${state.view} Details...`}
        />
      )}

      {/* Show StuUpdatesPageHeader component */}
      <StuUpdatesPageHeader
        view={state.view}
        dispatch={dispatch}
        entity="STUDENT"
      />

      {/*
       * If currently Programs Tab is selected, then show StuUpdatesPrograms
       * component
       */}
      {state.view === "Programs" && (
        <StuUpdatesPrograms
          connectedProgramData={state.connectedProgramData}
          entity="STUDENT"
        />
      )}

      {/*
       * If currently Organisations Tab is selected, then show
       * StuUpdatesOrganisations component
       */}
      {state.view === "Organisations" && (
        <StuUpdatesOrganisations
          connectedOrgData={state.connectedOrgData}
          entity="STUDENT"
        />
      )}

      {/*
       * If currently Applications Tab is selected, then show
       * StuUpdatesApplications component
       */}
      {state.view === "Applications" && (
        <StuUpdatesApplications
          state={state}
          dispatch={dispatch}
          entity="STUDENT"
        />
      )}
    </div>
  ) : (
    /*
     * If currently state.view is empty (means user has not
     * selected any Tab), then redirect it to PageNotFound
     */
    <Redirect to="*" />
  );
};

export default StudentUpdatesPage;
