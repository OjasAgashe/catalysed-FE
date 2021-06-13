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
          {["Active", "Inactive"].includes(state.selectedRadioForFilterState) &&
          filteredParticipantData.length ? (
            filteredParticipantData.map((details) => (
              <OrgProgramParticipantCard details={details} key={details.id} />
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
          {!["Active", "Inactive"].includes(
            state.selectedRadioForFilterState
          ) &&
            state.studentParticipantResponseData.map((details) => (
              <OrgProgramParticipantCard details={details} key={details.id} />
            ))}
        </>
      ) : (
        <OrgNoProgramParticipantError programId={programId} />
      )}
    </div>
  );
};

export default OrgProgramStudentParticipant;
