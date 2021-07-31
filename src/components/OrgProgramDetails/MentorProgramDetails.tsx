import React from "react";
import { OrgProgramDetailsState } from "../../types/OrgProgramDetails";

type MentorProgramDetailsProps = {
  state: OrgProgramDetailsState;
};

const MentorProgramDetails = ({ state }: MentorProgramDetailsProps) => {
  return (
    <div className="MentorProgramDetailsContainer">
      <div className="FormDetailsText">Mentor Fields Details</div>

      <div className="MentorProgramDetailsDataContainer">
        <div className="SubReqDataContainer">
          <div className="CreateProgramFormText">
            Subject Requirements&nbsp;:&nbsp;
          </div>

          <ul className="LanguagePreviewer">
            {state.responseData?.mentorFields?.subjectRequirements
              .split(",")
              .map((subject, index) => (
                <li key={index} className="LanguageLi">
                  {subject}{" "}
                </li>
              ))}
          </ul>
        </div>

        <div className="MNoOfOpeningsDataContainer">
          <span className="CreateProgramFormText">
            Number of Openings&nbsp;:&nbsp;
          </span>
          <span className="Data">
            {state.responseData?.mentorFields?.openings}
          </span>
        </div>

        <div className="MApplyByDateDataContainer">
          <span className="CreateProgramFormText">
            Apply by Date&nbsp;:&nbsp;
          </span>
          <span className="Data">
            {state.responseData?.mentorFields?.applyBy}
          </span>
        </div>

        <div className="MGeneralInstDataContainer">
          <div className="CreateProgramFormText">
            General Instruction&nbsp;:&nbsp;
          </div>
          <div className="Data">
            {state.responseData?.mentorFields?.generalInstructions}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorProgramDetails;
