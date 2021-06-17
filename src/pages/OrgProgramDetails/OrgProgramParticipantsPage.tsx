import React, { useEffect, useReducer, useState } from "react";
import { Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";
import OrgProgramDetailsCommon from "../../components/OrgProgramDetailsCommon/OrgProgramDetailsCommon";
import OrgProgramMentorParticipant from "../../components/OrgProgramMentorParticipant/OrgProgramMentorParticipant";
import OrgProgramParticipantFilterBar from "../../components/OrgProgramParticipantFilterBar/OrgProgramParticipantFilterBar";
import OrgProgramStudentParticipant from "../../components/OrgProgramStudentParticipant/OrgProgramStudentParticipant";
import { useOrgAPI } from "../../context/api_context/OrgAPIContext";
import { orgProgramParticipantReducer } from "../../reducers/orgProgramParticipantReducer";
import { OrgProgramParticipantData } from "../../types/OrgProgramDetails";
import "./OrgProgramDetailsPage.css";

const OrgProgramParticipantsPage = () => {
  const [state, dispatch] = useReducer(orgProgramParticipantReducer, {
    showError: false,
    loading: true,
    programTitle: "",
    showMentorDetails: true,
    showStudentDetails: false,
    studentParticipantResponseData: null,
    mentorParticipantResponseData: null,
    selectedRadioForFilterState: "All",
    searchedNotPresentText: "",
    searchedName: "",
  });

  const [filteredParticipantData, setFilteredParticipantData] = useState<
    OrgProgramParticipantData[]
  >([]);

  const { programId } = useParams<{ programId: string }>();

  const { getProgramDetails, getProgramParticipants } = useOrgAPI();

  useEffect(() => {
    document.documentElement.scrollTop = 0;

    document.title = "Program Participants | CatalysEd";

    const getTitleParticipantDetails = async () => {
      try {
        dispatch({ type: "showError", payload: false });

        const programDetailsResponse = await getProgramDetails(
          parseInt(programId)
        );
        const programParticipantsResponse = await getProgramParticipants(
          parseInt(programId)
        );

        dispatch({
          type: "programTitle",
          payload: programDetailsResponse.data.title,
        });
        dispatch({
          type: "studentParticipantResponseData",
          payload: programParticipantsResponse.data.studentParticipants,
        });
        dispatch({
          type: "mentorParticipantResponseData",
          payload: programParticipantsResponse.data.mentorParticipants,
        });
      } catch (error) {
        dispatch({ type: "showError", payload: true });
      } finally {
        dispatch({ type: "loading", payload: false });
      }
    };

    getTitleParticipantDetails();
  }, [getProgramDetails, getProgramParticipants, programId]);

  return (
    <div className="OrgProgramParticipantsPage">
      {state.loading && (
        <LoadingProgress
          loading={state.loading}
          emailSent={false}
          loadingMessage="Getting Participants..."
        />
      )}
      <OrgProgramDetailsCommon
        programTitle={state.programTitle}
        programId={parseInt(programId)}
      />

      <div className="ChooseMentorOrStudentDiv">
        <Alert variant="info" className="MentorOrStudentText">
          <button
            className="MentorOptionText Btn"
            onClick={() => {
              dispatch({ type: "showMentorDetails", payload: true });

              dispatch({ type: "searchedName", payload: "" });
              dispatch({ type: "searchedNotPresentText", payload: "" });

              dispatch({ type: "selectedRadioForFilterState", payload: "All" });

              if (state.showStudentDetails)
                dispatch({ type: "showStudentDetails", payload: false });
            }}
          >
            Mentor
          </button>
          <button
            className="StudentOptionText Btn"
            onClick={() => {
              dispatch({
                type: "selectedRadioForFilterState",
                payload: "All",
              });

              dispatch({ type: "searchedName", payload: "" });
              dispatch({ type: "searchedNotPresentText", payload: "" });

              if (state.showMentorDetails)
                dispatch({ type: "showMentorDetails", payload: false });

              dispatch({ type: "showStudentDetails", payload: true });
            }}
          >
            Student
          </button>
        </Alert>
      </div>

      <div className="OrgProgramParticipantsDetails">
        <div className="OrgProgramParticipantsDetailsContainer">
          <OrgProgramParticipantFilterBar
            state={state}
            dispatch={dispatch}
            setFilteredParticipantData={setFilteredParticipantData}
          />
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
