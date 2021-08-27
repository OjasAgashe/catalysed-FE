import React, { useEffect, useReducer, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";
import MentorOrStudentTab from "../../components/MentorOrStudentTab/MentorOrStudentTab";
import OrgProgramDetailsCommon from "../../components/OrgProgramDetailsCommon/OrgProgramDetailsCommon";
import OrgProgramMentorParticipant from "../../components/OrgProgramMentorParticipant/OrgProgramMentorParticipant";
import OrgProgramParticipantFilterBar from "../../components/OrgProgramParticipantFilterBar/OrgProgramParticipantFilterBar";
import OrgProgramStudentParticipant from "../../components/OrgProgramStudentParticipant/OrgProgramStudentParticipant";
import { useOrgAPI } from "../../context/api_context/OrgAPIContext";
import { orgProgramParticipantReducer } from "../../reducers/orgProgramParticipantReducer";
import { OrgProgramParticipantData } from "../../types/OrgProgramDetails";
import "./OrgProgramDetailsPage.css";

const OrgProgramParticipantsPage = () => {
  /*
   * state.showError: to show Error, if we do not get any Data
   *
   * state.loading: to show the LoadingProgress component, till we
   * are getting the Data
   *
   * state.programTitle: to store the Program Title, we will send it
   * in the header
   *
   * state.showMentorDetails, state.showStudentDetails: states to manage
   * which data to show currently, mentor or student
   *
   * state.studentParticipantResponseData: to store the Student Data
   *
   * state.mentorParticipantResponseData: to store the Mentor Data
   *
   * state.searchedNotPresentText: to store the error message, which we
   * will show when we will not get any filtered data (when the user will
   * try to filter by name)
   *
   * state.searchedName: to store the searchedName, by which user wants to
   * filter
   */
  const [state, dispatch] = useReducer(orgProgramParticipantReducer, {
    showError: false,
    loading: true,
    programTitle: "",
    showMentorDetails: true,
    showStudentDetails: false,
    studentParticipantResponseData: null,
    mentorParticipantResponseData: null,
    searchedNotPresentText: "",
    searchedName: "",
  });

  // To store the Filtered Data
  const [filteredParticipantData, setFilteredParticipantData] = useState<
    OrgProgramParticipantData[]
  >([]);

  const { programId } = useParams<{ programId: string }>();
  const history = useHistory();
  const { getProgramDetails, getProgramParticipants } = useOrgAPI();

  useEffect(() => {
    /*
     * Whenever anyone visits this page first time, we want to
     * show the scroll bar position on Top
     */
    document.documentElement.scrollTop = 0;

    // Set the document tile
    document.title = "Program Participants | CatalysEd";

    /*
     * Function to call the API, and get all the Data needed for
     * this page
     */
    const getTitleParticipantDetails = async () => {
      try {
        // If previously, we have shown any error then hide it
        dispatch({ type: "showError", payload: false });

        /*
         * Get the Program Details, so that we can get program title
         * from that
         */
        const programDetailsResponse = await getProgramDetails(
          parseInt(programId)
        );

        // Get the Participants Data
        const programParticipantsResponse = await getProgramParticipants(
          parseInt(programId)
        );

        // Store the Program Title
        dispatch({
          type: "programTitle",
          payload: programDetailsResponse.data.title,
        });

        // Store the Student Participant Data
        dispatch({
          type: "studentParticipantResponseData",
          payload: programParticipantsResponse.data.studentParticipants,
        });

        // Store the Mentor Participant Data
        dispatch({
          type: "mentorParticipantResponseData",
          payload: programParticipantsResponse.data.mentorParticipants,
        });

        // After storing everything, hide the LoadingProgress component
        dispatch({ type: "loading", payload: false });
      } catch (error) {
        if (error.response.status === 404) {
          /*
           * If while calling the API, we get 404 error then push the
           * Org to PageNotFound
           */
          history.push("*");
        } else {
          /*
           * If we get any other error, then first hide the LoadingProgress
           * component
           */
          dispatch({ type: "loading", payload: false });

          // And then show the error
          dispatch({ type: "showError", payload: true });
        }
      }
    };

    // Call the getTitleParticipantDetails function
    getTitleParticipantDetails();
  }, [getProgramDetails, getProgramParticipants, history, programId]);

  return (
    <div className="OrgProgramParticipantsPage Page">
      {/* Show LoadingProgress component */}
      {state.loading && (
        <LoadingProgress
          loading={state.loading}
          emailSent={false}
          loadingMessage="Getting Participants..."
        />
      )}

      {/* Show OrgProgramDetailsCommon component */}
      <OrgProgramDetailsCommon
        programTitle={state.programTitle}
        programId={parseInt(programId)}
      />

      {/* Show MentorOrStudentTab component */}
      <MentorOrStudentTab
        programParticipantState={state}
        programParticipantDispatch={dispatch}
      />

      {/*
       * If we have data for Mentor or Student only then show the
       * OrgProgramParticipantFilterBar component and respected
       * OrgProgramMentorParticipant or OrgProgramStudentParticipant
       * component
       */}
      <div className="OrgProgramParticipantsDetails">
        <div className="OrgProgramParticipantsDetailsContainer">
          {((state.showMentorDetails &&
            state.mentorParticipantResponseData !== null &&
            state.mentorParticipantResponseData.length !== 0) ||
            (state.showStudentDetails &&
              state.studentParticipantResponseData !== null &&
              state.studentParticipantResponseData.length !== 0)) && (
            <OrgProgramParticipantFilterBar
              state={state}
              dispatch={dispatch}
              setFilteredParticipantData={setFilteredParticipantData}
            />
          )}
          {state.showMentorDetails && (
            <OrgProgramMentorParticipant
              filteredParticipantData={filteredParticipantData}
              state={state}
              programId={programId}
            />
          )}
          {state.showStudentDetails && (
            <OrgProgramStudentParticipant
              filteredParticipantData={filteredParticipantData}
              state={state}
              programId={programId}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default OrgProgramParticipantsPage;
