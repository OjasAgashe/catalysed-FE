import React, { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import MentorDashboardSessionCardColumn from "../../components/MentorDashboardSessionCardColumn/MentorDashboardSessionCardColumn";
import MentorDashboardSessionDetailsForm from "../../components/MentorDashboardSessionDetailsForm/MentorDashboardSessionDetailsForm";
import MentorDashboardSessionEditFormModal from "../../components/MentorDashboardSessionEditFormModal/MentorDashboardSessionEditFormModal";
import StuUpdatesProgramDetailsCommon from "../../components/StuUpdatesProgramDetailsCommon/StuUpdatesProgramDetailsCommon";
import { mentorUpdatesProgramDashboardReducer } from "../../reducers/mentorUpdatesProgramDashboardReducer";
import "./MentorUpdatesProgramDashboard.css";

const MentorUpdatesProgramDashboard = () => {
  /*
   * state.noteCardArray: to store all Cards Data as array
   *
   * state.showModal: to store the Boolean value, that we want to show
   * modal or not
   *
   * state.selectedNoteCardData: to store the data of selected card, to
   * edit details
   */
  const [state, dispatch] = useReducer(mentorUpdatesProgramDashboardReducer, {
    noteCardArray: [],
    showModal: false,
    selectedNoteCardData: null,
  });

  const { programId } = useParams<{ programId: string }>();

  useEffect(() => {
    /*
     * Whenever anyone visits this page first time, we want
     * the scroll bar position on Top
     */
    document.documentElement.scrollTop = 0;

    // Set the document title
    document.title = "Connected Program Dashboard | CatalysEd";
  }, []);

  return (
    <div className="MentorUpdatesProgramDashboardPage Page">
      {/* Show StuUpdatesProgramDetailsCommon component */}
      <StuUpdatesProgramDetailsCommon
        programTitle={"Program Title"}
        programId={parseInt(programId)}
        entity="MENTOR"
      />

      <div className="MentorUpdatesProgramDashboardDetails">
        {state.showModal && (
          /*
           * If state.showModal has true value, then show
           * MentorDashboardSessionEditFormModal component
           */
          <MentorDashboardSessionEditFormModal
            dbState={state}
            dbDispatch={dispatch}
          />
        )}

        {/* Show MentorDashboardSessionDetailsForm component */}
        <MentorDashboardSessionDetailsForm
          dbState={state}
          dbDispatch={dispatch}
        />

        {/* Show MentorDashboardSessionCardColumn component */}
        <MentorDashboardSessionCardColumn
          dbState={state}
          dbDispatch={dispatch}
        />
      </div>
    </div>
  );
};

export default MentorUpdatesProgramDashboard;
