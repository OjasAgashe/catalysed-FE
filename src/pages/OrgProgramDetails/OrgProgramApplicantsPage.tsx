import React, { useCallback, useEffect, useReducer } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";
import MentorOrStudentTab from "../../components/MentorOrStudentTab/MentorOrStudentTab";
import OrgProgramApplicantDetails from "../../components/OrgProgramApplicantDetails/OrgProgramApplicantDetails";
import OrgProgramDetailsCommon from "../../components/OrgProgramDetailsCommon/OrgProgramDetailsCommon";
import { useOrgAPI } from "../../context/api_context/OrgAPIContext";
import { orgProgramApplicantReducer } from "../../reducers/orgProgramApplicantReducer";
import { OrgProgramApplicantData } from "../../types/OrgProgramDetails";

const OrgProgramApplicantsPage = () => {
  const [state, dispatch] = useReducer(orgProgramApplicantReducer, {
    responseData: null,
    loading: true,
    programTitle: "",
    showMentorDetails: true,
    showStudentDetails: false,
    searchedName: "",
    searchedNotPresentText: "",
    selectedDropdownForSortDoA: "All",
    selectedDropdownForFilterStatus: "All",
    selectedDropdownForFilterViewed: "All",
  });

  const { programId } = useParams<{ programId: string }>();
  const history = useHistory();
  const {
    getProgramDetails,
    getStudentApplicationForProgram,
    getMentorApplicationForProgram,
  } = useOrgAPI();

  const sortInOrder = useCallback((response) => {
    if (response) {
      let tempData = [...response];

      // status: pending && viewed: no
      tempData = response.filter(
        (data: OrgProgramApplicantData) =>
          data.status === "PENDING" && data.viewedByOrg === false
      );

      // status: pending && viewed: yes
      tempData.push.apply(
        tempData,
        response.filter(
          (data: OrgProgramApplicantData) =>
            data.status === "PENDING" && data.viewedByOrg
        )
      );

      // status: accepted && viewed: no
      tempData.push.apply(
        tempData,
        response.filter(
          (data: OrgProgramApplicantData) =>
            data.status === "APPROVED" && data.viewedByOrg === false
        )
      );

      // status: accepted && viewed: yes
      tempData.push.apply(
        tempData,
        response.filter(
          (data: OrgProgramApplicantData) =>
            data.status === "APPROVED" && data.viewedByOrg
        )
      );

      // status: rejected && viewed: no
      tempData.push.apply(
        tempData,
        response.filter(
          (data: OrgProgramApplicantData) =>
            data.status === "REJECTED" && data.viewedByOrg === false
        )
      );

      // status: rejected && viewed: yes
      tempData.push.apply(
        tempData,
        response.filter(
          (data: OrgProgramApplicantData) =>
            data.status === "REJECTED" && data.viewedByOrg
        )
      );

      dispatch({ type: "responseData", payload: tempData });
    }
  }, []);

  useEffect(() => {
    document.documentElement.scrollTop = 0;

    document.title = "Program Applicants | CatalysEd";

    const getTitleApplicantsDetails = async () => {
      try {
        dispatch({ type: "loading", payload: true });

        const programDetailsResponse = await getProgramDetails(
          parseInt(programId)
        );

        let programApplicantResponse;

        if (state.showMentorDetails) {
          programApplicantResponse = await getMentorApplicationForProgram(
            parseInt(programId)
          );
        } else if (state.showStudentDetails) {
          programApplicantResponse = await getStudentApplicationForProgram(
            parseInt(programId)
          );
        }

        dispatch({
          type: "programTitle",
          payload: programDetailsResponse.data.title,
        });

        sortInOrder(programApplicantResponse?.data);

        dispatch({ type: "loading", payload: false });
      } catch (error) {
        if (error.response.status === 404) {
          history.push("*");
        } else {
          dispatch({ type: "loading", payload: false });
        }
      }
    };

    getTitleApplicantsDetails();
  }, [
    getMentorApplicationForProgram,
    getProgramDetails,
    getStudentApplicationForProgram,
    history,
    programId,
    sortInOrder,
    state.showMentorDetails,
    state.showStudentDetails,
  ]);

  return (
    <div className="OrgProgramApplicantsPage">
      {state.loading && (
        <LoadingProgress
          loading={state.loading}
          emailSent={false}
          loadingMessage={`Getting ${state.showMentorDetails ? "Mentor" : "Student"} Details...`}
        />
      )}

      <OrgProgramDetailsCommon
        programTitle={state.programTitle}
        programId={parseInt(programId)}
      />

      <MentorOrStudentTab
        programApplicantState={state}
        programApplicantDispatch={dispatch}
      />

      <OrgProgramApplicantDetails state={state} dispatch={dispatch} />
    </div>
  );
};

export default OrgProgramApplicantsPage;
