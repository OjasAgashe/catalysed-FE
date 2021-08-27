import React from "react";
import { Alert } from "react-bootstrap";

import {
  OrgProgramApplicantActionType,
  OrgProgramApplicantState,
  OrgProgramParticipantActionType,
  OrgProgramParticipantState,
} from "../../types/OrgProgramDetails";
import "./MentorOrStudentTab.css";

type MentorOrStudentTabProps = {
  programParticipantState?: OrgProgramParticipantState | null;
  programParticipantDispatch?: React.Dispatch<OrgProgramParticipantActionType> | null;

  programApplicantState?: OrgProgramApplicantState | null;
  programApplicantDispatch?: React.Dispatch<OrgProgramApplicantActionType> | null;
};

/*
 * This component will be visible on the pages, on which we want to show
 * the Tab to select Mentor or Student
 */

const MentorOrStudentTab = ({
  programParticipantState = null,
  programParticipantDispatch = null,

  programApplicantState = null,
  programApplicantDispatch = null,
}: MentorOrStudentTabProps) => {
  /*
   * Function to handle click on Mentor according to
   * Partcipant and Applicant of a Program for an Org
   */
  const handleMentorClick = () => {
    if (programParticipantDispatch !== null) {
      programParticipantDispatch({
        type: "showMentorDetails",
        payload: true,
      });

      programParticipantDispatch({
        type: "searchedName",
        payload: "",
      });
      programParticipantDispatch({
        type: "searchedNotPresentText",
        payload: "",
      });

      if (
        programParticipantState !== null &&
        programParticipantState.showStudentDetails
      ) {
        programParticipantDispatch({
          type: "showStudentDetails",
          payload: false,
        });
      }
    }

    if (programApplicantDispatch !== null) {
      programApplicantDispatch({
        type: "showMentorDetails",
        payload: true,
      });

      programApplicantDispatch({
        type: "searchedName",
        payload: "",
      });
      programApplicantDispatch({
        type: "searchedNotPresentText",
        payload: "",
      });
      programApplicantDispatch({
        type: "selectedDropdownForSortDoA",
        payload: "All",
      });
      programApplicantDispatch({
        type: "selectedDropdownForFilterStatus",
        payload: "All",
      });
      programApplicantDispatch({
        type: "selectedDropdownForFilterViewed",
        payload: "All",
      });

      if (
        programApplicantState !== null &&
        programApplicantState.showStudentDetails
      ) {
        programApplicantDispatch({
          type: "showStudentDetails",
          payload: false,
        });
      }
    }
  };

  /*
   * Function to handle click on Student according to
   * Partcipant and Applicant of a Program for an Org
   */
  const handleStudentClick = () => {
    if (programParticipantDispatch !== null) {
      programParticipantDispatch({
        type: "searchedName",
        payload: "",
      });
      programParticipantDispatch({
        type: "searchedNotPresentText",
        payload: "",
      });

      if (
        programParticipantState !== null &&
        programParticipantState.showMentorDetails
      )
        programParticipantDispatch({
          type: "showMentorDetails",
          payload: false,
        });

      programParticipantDispatch({
        type: "showStudentDetails",
        payload: true,
      });
    }

    if (programApplicantDispatch !== null) {
      programApplicantDispatch({
        type: "showStudentDetails",
        payload: true,
      });

      programApplicantDispatch({
        type: "searchedName",
        payload: "",
      });
      programApplicantDispatch({
        type: "searchedNotPresentText",
        payload: "",
      });
      programApplicantDispatch({
        type: "selectedDropdownForSortDoA",
        payload: "All",
      });
      programApplicantDispatch({
        type: "selectedDropdownForFilterStatus",
        payload: "All",
      });
      programApplicantDispatch({
        type: "selectedDropdownForFilterViewed",
        payload: "All",
      });

      if (
        programApplicantState !== null &&
        programApplicantState.showMentorDetails
      ) {
        programApplicantDispatch({
          type: "showMentorDetails",
          payload: false,
        });
      }
    }
  };

  return (
    <div className="ChooseMentorOrStudentDiv">
      <Alert variant="info" className="MentorOrStudentText">
        <div
          className={`${
            (programParticipantState !== null &&
              programParticipantState.showMentorDetails) ||
            (programApplicantState !== null &&
              programApplicantState.showMentorDetails)
              ? "CurrentSelectedTab"
              : "NotCurrentSelectedTab"
          } MentorOptDiv`}
        >
          <button className="MentorOptionText Btn" onClick={handleMentorClick}>
            Mentor
          </button>
        </div>
        <div
          className={`${
            (programParticipantState !== null &&
              programParticipantState.showStudentDetails) ||
            (programApplicantState !== null &&
              programApplicantState.showStudentDetails)
              ? "CurrentSelectedTab"
              : "NotCurrentSelectedTab"
          }`}
        >
          <button
            className="StudentOptionText Btn"
            onClick={handleStudentClick}
          >
            Student
          </button>
        </div>
      </Alert>
    </div>
  );
};

export default MentorOrStudentTab;
