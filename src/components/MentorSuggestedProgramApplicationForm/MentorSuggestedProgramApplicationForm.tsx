import React from "react";
import { GrSend } from "react-icons/gr";
import "../StuSuggestedProgramApplicationForm/StuSuggestedProgramApplicationForm.css";
import ApplicationForm from "../StuSuggestedProgramApplicationForm/ApplicationForm";

const MentorSuggestedProgramApplicationForm = () => {
  return (
    <div className="StuSuggestedProgramApplicationComp">
      <ApplicationForm />
      <div className="ApplyBtnContainer">
        <button className="ApplyBtn">
          Apply&nbsp;
          <GrSend className="GrIcon" />
        </button>
      </div>
    </div>
  );
};

export default MentorSuggestedProgramApplicationForm;
