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
  const { getConnectedMentors, getConnectedStudents } = useOrgAPI();
  const query = useQuery();

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
    document.documentElement.scrollTop = 0;
    document.title = `Org ${state.title} Directory | CatalysEd`;

    const getDetails = async () => {
      try {
        dispatch({ type: "loading", payload: true });
        dispatch({ type: "error", payload: "" });

        let response;

        if (state.title === "Mentors") {
          response = await getConnectedMentors();
        } else if (state.title === "Students") {
          response = await getConnectedStudents();
        }

        dispatch({ type: "responseData", payload: response?.data });
      } catch (error) {
        console.log(error);
        dispatch({ type: "error", payload: "Sorry!! No Data Found" });
      } finally {
        dispatch({ type: "loading", payload: false });
      }
    };

    getDetails();
  }, [getConnectedMentors, getConnectedStudents, state.title]);

  return state.title ? (
    <div className="OrgDirectoryPage Page">
      {state.loading && (
        <LoadingProgress
          loading={state.loading}
          emailSent={false}
          loadingMessage={`Getting ${state.title} Data...`}
        />
      )}

      <OrgDirectoryPageHeader state={state} dispatch={dispatch} />

      {state.title === "Mentors" && <OrgMentorDirectory state={state} />}

      {state.title === "Students" && <OrgStudentDirectory state={state} />}
    </div>
  ) : (
    <Redirect to="*" />
  );
};

export default OrgDirectoryPage;
