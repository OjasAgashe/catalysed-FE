import React from "react";
import { OrgProgramDetailsState } from "../../types/OrgProgramDetails";

type StudentProgramDetailsProps = {
  state: OrgProgramDetailsState;
};

const StudentProgramDetails = ({ state }: StudentProgramDetailsProps) => {
  return (
    <div className="StudentProgramDetailsContainer">
      <div className="FormDetailsText">Student Fields Detials</div>
      <div className="StudentProgramDetailsDataContainer">
        <div className="SubReqDataContainer">
          <div className="CreateProgramFormText">
            Subject Requirements&nbsp;:&nbsp;
          </div>

          <ul className="LanguagePreviewer">
            {state.responseData?.studentFields?.subjectRequirements
              .split(",")
              .map((subject, index) => (
                <li key={index} className="LanguageLi">
                  {subject}{" "}
                </li>
              ))}
          </ul>
        </div>

        <div className="SNoOfOpeningsDataContainer">
          <span className="CreateProgramFormText">
            Number of Openings&nbsp;:&nbsp;
          </span>
          <span className="Data">
            {state.responseData?.studentFields?.openings}
          </span>

          <span className="SProgramFeesDataContainer">
            <span className="CreateProgramFormText FeesText">Fees&nbsp;:&nbsp;</span>
            <span className="Data">
              {state.responseData?.studentFields?.programFees}
            </span>
          </span>
        </div>

        <div className="SApplyByDateDataContainer">
          <span className="CreateProgramFormText">
            Apply by Date&nbsp;:&nbsp;
          </span>
          <span className="Data">
            {state.responseData?.studentFields?.applyBy}
          </span>
        </div>

        <div className="SGeneralInstDataContainer">
          <div className="CreateProgramFormText">
            General Instruction&nbsp;:&nbsp;
          </div>
          <div className="Data">
            {state.responseData?.studentFields?.generalInstructions}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProgramDetails;
