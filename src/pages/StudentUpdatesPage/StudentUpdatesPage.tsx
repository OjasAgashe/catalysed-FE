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
  const { getAllFilledApplicationsDetails } = useStudentAPI();
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
    filteredResponseData: null,
  });

  const fakeProgramData = [
    {
      id: 1,
      name: "abc",
      duration: "3",
      mode: "VIRTUAL",
    },
    {
      id: 2,
      name: "HTML5 Language",
      duration: "5",
      mode: "IN_PERSON",
    },
    {
      id: 3,
      name: "ABC",
      duration: "7",
      mode: "VIRTUAL",
    },
    {
      id: 4,
      name: "CSS3 AND HTML5 AND JAVASCRIPT",
      duration: "2",
      mode: "IN_PERSON",
    },
  ];

  const fakeOrganisationData = [
    {
      id: 1,
      name: "CatalyseEd",
      description:
        "We aim to help every child colour the world by facilitating easy and streamlined access to quality guidance and education by providing them with a platform that helps them unveil their potential and introduce them to phenomenal and unforeseen opportunities.",
    },
    {
      id: 2,
      name: "CatalyseEdCatalyseEd",
      description:
        "We aim to help every child colour the world by facilitating easy and streamlined access to quality guidance and education by providing them with a platform that helps them unveil their potential and introduce them to phenomenal and unforeseen opportunities.",
    },
    {
      id: 3,
      name: "CatalyseEdCatalyseEdCatalyseEd",
      description:
        "We aim to help every child colour the world by facilitating easy and streamlined access to quality guidance and education by providing them with a platform that helps them unveil their potential and introduce them to phenomenal and unforeseen opportunities.",
    },
    {
      id: 4,
      name: "CatalyseEd CatalyseEd",
      description:
        "We aim to help every child colour the world by facilitating easy and streamlined access to quality guidance and education by providing them with a platform that helps them unveil their potential and introduce them to phenomenal and unforeseen opportunities.",
    },
  ];

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
        }

        dispatch({ type: "responseData", payload: response?.data });
      } catch (error) {
        dispatch({ type: "error", payload: "Sorry!! No Data Found" });
      } finally {
        dispatch({ type: "loading", payload: false });
      }
    };

    getDetails();
  }, [getAllFilledApplicationsDetails, state.view]);

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
          fakeProgramData={fakeProgramData}
          entity="STUDENT"
        />
      )}

      {state.view === "Organisations" && (
        <StuUpdatesOrganisations
          fakeOrganisationData={fakeOrganisationData}
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
