import React from "react";
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
      {state.error && (
        <Error message={state.error} className="OrgDetailsNotFound" />
      )}

      {state.responseData && (
        <section className="ProgramDetailsContainer">
          <div className="ProgramDetailsFirstSection">
            <GeneralProgramDetails state={state} />
            <div className="ProgramDetailsFirstSubSection">
              <CoordinatorDetails state={state} />
            </div>
          </div>
          <div className="ProgramDetailsSecondSection">
            <MentorProgramDetails state={state} />
            <StudentProgramDetails state={state} />
          </div>
        </section>
      )}
    </div>
  );
};

export default OrgProgramDetails;
