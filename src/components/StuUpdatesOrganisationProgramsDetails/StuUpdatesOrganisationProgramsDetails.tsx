import React, { useEffect, useState } from "react";
import { StudentUpdatesOrgDetailsResponse } from "../../types/StudentUpdates";
import "./StuUpdatesOrganisationProgramsDetails.css";

type StuUpdatesOrganisationProgramsDetialsProps = {
  programs: StudentUpdatesOrgDetailsResponse["programs"];
};

const StuUpdatesOrganisationProgramsDetails = ({
  programs,
}: StuUpdatesOrganisationProgramsDetialsProps) => {
  /*
   * To store the total number of programs
   */
  const [noOfPrograms, setNoOfPrograms] = useState<number>(0);

  useEffect(() => {
    // Set total number of programs
    setNoOfPrograms(programs === null ? 0 : programs.length);
  }, [programs]);

  return (
    <div className="StuUpdatesOrganisationProgramsDetails">
      <div className="StuUpdatesOrganisationProgramsDetailsContainer">
        <div className="ProgramRunningText">
          Programs running by Organisation
        </div>

        {programs && (
          <>
            {/* Show Programs only when we have something to show */}
            {programs.map((program, index) => {
              if (index !== noOfPrograms - 1) {
                return <div className="ProgramNameDiv">{program.title}</div>;
              }
              return (
                <div className="ProgramNameDiv LastProgramName">
                  {program.title}
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default StuUpdatesOrganisationProgramsDetails;
