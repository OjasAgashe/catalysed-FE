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
    document.documentElement.scrollTop = 0;
    document.title = `Connected ${state.view} | CatalysEd`;

    const getDetails = async () => {
      try {
        dispatch({ type: "loading", payload: true });
        dispatch({ type: "error", payload: "" });

        let response;

        if (state.view === "Applications") {
          response = await getAllFilledApplicationsDetails();
          dispatch({ type: "responseData", payload: response?.data });
        }

        if (state.view === "Organisations") {
          response = await getConnectedOrganisations();
          dispatch({ type: "connectedOrgData", payload: response?.data });
        }

        if (state.view === "Programs") {
          response = await getConnectedPrograms();
          dispatch({
            type: "connectedProgramData",
            payload: response?.data,
          });
        }
      } catch (error) {
        dispatch({ type: "error", payload: "Sorry!! No Data Found" });
      } finally {
        dispatch({ type: "loading", payload: false });
      }
    };

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

      <StuUpdatesPageHeader
        view={state.view}
        dispatch={dispatch}
        entity="STUDENT"
      />

      {state.view === "Programs" && (
        <StuUpdatesPrograms
          connectedProgramData={state.connectedProgramData}
          entity="STUDENT"
        />
      )}

      {state.view === "Organisations" && (
        <StuUpdatesOrganisations
          connectedOrgData={state.connectedOrgData}
          entity="STUDENT"
        />
      )}

      {state.view === "Applications" && (
        <StuUpdatesApplications
          state={state}
          dispatch={dispatch}
          entity="STUDENT"
        />
      )}
    </div>
  ) : (
    <Redirect to="*" />
  );
};

export default StudentUpdatesPage;
