import React from "react";
import "./StuSuggestedProgramApplicationForm.css";
import { GrSend } from "react-icons/gr";
import ApplicationForm from "./ApplicationForm";

const StuSuggestedProgramApplicationForm = () => {
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

export default StuSuggestedProgramApplicationForm;
