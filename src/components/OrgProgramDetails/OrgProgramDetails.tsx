import React from "react";
import { OrgProgramDetailsDataIllustration } from "../../assets/Illustrations/Illustrations";
import { OrgProgramDetailsState } from "../../types/OrgProgramDetails";
import Error from "../Error/Error";
import CoordinatorDetails from "./CoordinatorDetails";
import GeneralProgramDetails from "./GeneralProgramDetails";
import MentorProgramDetails from "./MentorProgramDetails";
import "./OrgProgramDetails.css";
import StudentProgramDetails from "./StudentProgramDetails";

type OrgProgramDetailsProps = {
  state: OrgProgramDetailsState;
};

const OrgProgramDetails = ({ state }: OrgProgramDetailsProps) => {
  return (
    <div>
      {/* If state.error has any value then show it */}
      {state.error && (
        <Error message={state.error} className="OrgDetailsNotFound" />
      )}

      {/* If we get any data only then show the details */}
      {state.responseData && (
        <section className="ProgramDetailsContainer">
          <div className="ProgramDetailsFirstSection">

            {/* Show GeneralProgramDetails component */}
            <GeneralProgramDetails state={state} />
            <div className="ProgramDetailsFirstSubSection">
              <img
                src={OrgProgramDetailsDataIllustration}
                alt="org program details data illustration"
                className="OrgProgramDetailsDataIllustration"
              />
            
              {/* Show CoordinatorDetails component */}
              <CoordinatorDetails state={state} />
            </div>
          </div>
          <div className="ProgramDetailsSecondSection">

            {/* Show MentorProgramDetails component */}
            <MentorProgramDetails state={state} />

            {/* Show StudentProgramDetails component */}
            <StudentProgramDetails state={state} />
          </div>
        </section>
      )}
    </div>
  );
};

export default OrgProgramDetails;
