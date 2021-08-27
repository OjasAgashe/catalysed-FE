/*
 * This file is same as OrgProgramMentorParticipant page, the only difference
 * is that we are dealing with student data
 */

import React from "react";
import {
  OrgProgramParticipantData,
  OrgProgramParticipantState,
} from "../../types/OrgProgramDetails";
import Error from "../Error/Error";
import OrgNoProgramParticipantError from "../OrgNoProgramParticipantError/OrgNoProgramParticipantError";
import OrgProgramParticipantCard from "../OrgProgramParticipantCard/OrgProgramParticipantCard";
import "./OrgProgramStudentParticipant.css";

type OrgProgramStudentParticipantProps = {
  filteredParticipantData: OrgProgramParticipantData[];
  state: OrgProgramParticipantState;
  programId: string;
};

const OrgProgramStudentParticipant = ({
  filteredParticipantData,
  state,
  programId,
}: OrgProgramStudentParticipantProps) => {
  return (
    <div className="OrgProgramStudentCardContainer">
      {state.studentParticipantResponseData !== null &&
      state.studentParticipantResponseData.length ? (
        <>
          {state.searchedName && filteredParticipantData.length ? (
            filteredParticipantData.map((details) => (
              <OrgProgramParticipantCard
                details={details}
                key={details.id}
                state={state}
              />
            ))
          ) : (
            <div
              style={
                state.searchedNotPresentText === "" ? { display: "none" } : {}
              }
            >
              <Error message={state.searchedNotPresentText} />
            </div>
          )}
          {state.searchedName === "" &&
            state.studentParticipantResponseData.map((details) => (
              <OrgProgramParticipantCard
                details={details}
                key={details.id}
                state={state}
              />
            ))}
        </>
      ) : (
        <OrgNoProgramParticipantError programId={programId} />
      )}
    </div>
  );
};

export default OrgProgramStudentParticipant;
