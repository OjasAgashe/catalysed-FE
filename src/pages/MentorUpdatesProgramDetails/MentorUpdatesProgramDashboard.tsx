import React, { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import MentorDashboardSessionCardColumn from "../../components/MentorDashboardSessionCardColumn/MentorDashboardSessionCardColumn";
import MentorDashboardSessionDetailsForm from "../../components/MentorDashboardSessionDetailsForm/MentorDashboardSessionDetailsForm";
import MentorDashboardSessionEditFormModal from "../../components/MentorDashboardSessionEditFormModal/MentorDashboardSessionEditFormModal";
import StuUpdatesProgramDetailsCommon from "../../components/StuUpdatesProgramDetailsCommon/StuUpdatesProgramDetailsCommon";
import { mentorUpdatesProgramDashboardReducer } from "../../reducers/mentorUpdatesProgramDashboardReducer";
import "./MentorUpdatesProgramDashboard.css";

const MentorUpdatesProgramDashboard = () => {
  const [state, dispatch] = useReducer(mentorUpdatesProgramDashboardReducer, {
    noteCardArray: [],
    showModal: false,
    selectedNoteCardData: null,
  });

  const { programId } = useParams<{ programId: string }>();

  useEffect(() => {
    document.documentElement.scrollTop = 0;

    document.title = "Connected Program Dashboard | CatalysEd";
  }, []);

  return (
    <div className="MentorUpdatesProgramDashboardPage Page">
      <StuUpdatesProgramDetailsCommon
        programTitle={"Program Title"}
        programId={parseInt(programId)}
        entity="MENTOR"
      />

      <div className="MentorUpdatesProgramDashboardDetails">
        {state.showModal && (
          <MentorDashboardSessionEditFormModal
            dbState={state}
            dbDispatch={dispatch}
          />
        )}

        <MentorDashboardSessionDetailsForm
          dbState={state}
          dbDispatch={dispatch}
        />

        <MentorDashboardSessionCardColumn
          dbState={state}
          dbDispatch={dispatch}
        />
      </div>
    </div>
  );
};

export default MentorUpdatesProgramDashboard;
