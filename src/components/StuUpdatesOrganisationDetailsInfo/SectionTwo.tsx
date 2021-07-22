import React from "react";
import { StudentUpdatesOrganisationSurvey } from "../../assets/Illustrations/Illustrations";

const SectionTwo = () => {
  return (
    <div className="SectionTwo">
      <div className="SectionTwoFirstHalf">
        <div className="DataCard">
          <div>
            <span className="CreateProgramFormText">
              Area of Work&nbsp;:&nbsp;
            </span>
            <span className="Data">Education</span>
          </div>
        </div>
      </div>

      <div className="SectionTwoSecondHalf">
        <img
          src={`${StudentUpdatesOrganisationSurvey}`}
          alt="section two survey svg"
        />
      </div>
    </div>
  );
};

export default SectionTwo;
