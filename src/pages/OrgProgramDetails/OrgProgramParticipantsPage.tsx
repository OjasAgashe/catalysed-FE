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

  const [filteredParticipantData, setFilteredParticipantData] = useState<
    OrgProgramParticipantData[]
  >([]);

  const { programId } = useParams<{ programId: string }>();
  const history = useHistory();
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

        dispatch({ type: "loading", payload: false });
      } catch (error) {
        if (error.response.status === 404) {
          history.push("*");
        } else {
          dispatch({ type: "loading", payload: false });
          dispatch({ type: "showError", payload: true });
        }
      }
    };

    getTitleParticipantDetails();
  }, [getProgramDetails, getProgramParticipants, history, programId]);

  return (
    <div className="OrgProgramParticipantsPage Page">
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

      <MentorOrStudentTab
        programParticipantState={state}
        programParticipantDispatch={dispatch}
      />

      <div className="OrgProgramParticipantsDetails">
        <div className="OrgProgramParticipantsDetailsContainer">
          {((state.showMentorDetails &&
            state.mentorParticipantResponseData !== null &&
            state.mentorParticipantResponseData.length) ||
            (state.showStudentDetails &&
              state.studentParticipantResponseData !== null &&
              state.studentParticipantResponseData.length)) && (
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
