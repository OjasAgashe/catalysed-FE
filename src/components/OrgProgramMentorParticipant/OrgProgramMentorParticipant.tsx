import React from "react";
import {
  OrgProgramParticipantData,
  OrgProgramParticipantState,
} from "../../types/OrgProgramDetails";
import Error from "../Error/Error";
import OrgNoProgramParticipantError from "../OrgNoProgramParticipantError/OrgNoProgramParticipantError";
import OrgProgramParticipantCard from "../OrgProgramParticipantCard/OrgProgramParticipantCard";
import "./OrgProgramMentorParticipant.css";

type OrgProgramMentorParticipantProps = {
  filteredParticipantData: OrgProgramParticipantData[];
  state: OrgProgramParticipantState;
  programId: string;
};

const OrgProgramMentorParticipant = ({
  filteredParticipantData,
  state,
  programId,
}: OrgProgramMentorParticipantProps) => {
  return (
    <div className="OrgProgramMentorCardContainer">
      {state.mentorParticipantResponseData !== null &&
      state.mentorParticipantResponseData.length ? (
        <>
          {(state.searchedName ||
            ["Active", "Inactive"].includes(
              state.selectedRadioForFilterState
            )) &&
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
          {state.searchedName === "" &&
            !["Active", "Inactive"].includes(
              state.selectedRadioForFilterState
            ) &&
            state.mentorParticipantResponseData.map((details) => (
              <OrgProgramParticipantCard details={details} key={details.id} />
            ))}
        </>
      ) : (
        <OrgNoProgramParticipantError programId={programId} />
      )}
    </div>
  );
};

export default OrgProgramMentorParticipant;
