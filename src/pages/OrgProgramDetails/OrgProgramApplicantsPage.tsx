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
  /*
   * state.responseData: to store the Data
   *
   * state.loading: to Show the LoadingProgress component, till we
   * are getting the Data
   *
   * state.programTitle: to store the program title, we will send it in
   * Header
   *
   * state.showMentorDetails, state.showStudentDetails: states to manage
   * which data to show currently, mentor or student
   *
   * state.searchedName: to store the searchedName, by which user wants to
   * filter
   *
   * state.searchedNotPresentText: to store the error message, which we
   * will show when we will not get any filtered data (when the user will
   * try to filter by name)
   *
   * state.selectedDropdownForSortDoA, state.selectedDropdownForFilterStatus,
   * and state.selectedDropdownForFilterViewed: to store the selected option
   * for filter and sort
   */
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

  /*
   * When we will show the Program Applicants list then it should be visible
   * according to status in which it filtered in the following function
   */
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
    /*
     * Whenever anyone visits this page first time, we want to
     * show the scrollbar position on Top
     */
    document.documentElement.scrollTop = 0;

    // Set the document title
    document.title = "Program Applicants | CatalysEd";

    // Function to call API, and get all the data needed for this page
    const getTitleApplicantsDetails = async () => {
      try {
        // Show the LoadingProgress component
        dispatch({ type: "loading", payload: true });

        /*
         * Get program details, so that we can get program title from
         * that
         */
        const programDetailsResponse = await getProgramDetails(
          parseInt(programId)
        );

        let programApplicantResponse;

        if (state.showMentorDetails) {
          /*
           * If currently we are showing Mentor Details, then get
           * Mentor Applicants
           */
          programApplicantResponse = await getMentorApplicationForProgram(
            parseInt(programId)
          );
        } else if (state.showStudentDetails) {
          /*
           * If currently we are showing Student Details, then get
           * Student Applicants
           */
          programApplicantResponse = await getStudentApplicationForProgram(
            parseInt(programId)
          );
        }

        // Store the program title
        dispatch({
          type: "programTitle",
          payload: programDetailsResponse.data.title,
        });

        // Send the applicant data to sort in required order, and store
        sortInOrder(programApplicantResponse?.data);

        // After storing everything, hide the LoadingProgress
        dispatch({ type: "loading", payload: false });
      } catch (error) {
        if (error.response.status === 404) {
          /*
           * If while calling API, we get 404 error then push the user
           * to PageNotFound
           */
          history.push("*");
        } else {
          /*
           * If we get any other error, then first hide the LoadingProgress
           * and then show error of no data
           */
          dispatch({ type: "loading", payload: false });
        }
      }
    };

    // Call getTitleApplicantsDetails function
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
    <div className="OrgProgramApplicantsPage Page">
      {/* Show LoadingProgress component */}
      {state.loading && (
        <LoadingProgress
          loading={state.loading}
          emailSent={false}
          loadingMessage={`Getting ${
            state.showMentorDetails ? "Mentor" : "Student"
          } Details...`}
        />
      )}

      {/* Show OrgProgramDetailsCommon component */}
      <OrgProgramDetailsCommon
        programTitle={state.programTitle}
        programId={parseInt(programId)}
      />

      {/* Show MentorOrStudentTab component */}
      <MentorOrStudentTab
        programApplicantState={state}
        programApplicantDispatch={dispatch}
      />

      {/* Show OrgProgramApplicantDetails component */}
      <OrgProgramApplicantDetails state={state} dispatch={dispatch} />
    </div>
  );
};

export default OrgProgramApplicantsPage;
