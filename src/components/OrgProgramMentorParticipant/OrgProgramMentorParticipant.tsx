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
        /*
         * If we have something in state.mentorParticipantResponseData
         * only then show the PariticpantCard
         */
        <>
          {state.searchedName && filteredParticipantData.length ? (
            /*
             * If user has searched a name or an email, and we have some data
             * to show then show it
             */
            filteredParticipantData.map((details) => (
              <OrgProgramParticipantCard
                details={details}
                key={details.id}
                state={state}
                programId={programId}
              />
            ))
          ) : (
            /*
             * And if we have nothing to show in filteredData, then show an
             * Error
             */
            <div
              style={
                state.searchedNotPresentText === "" ? { display: "none" } : {}
              }
            >
              <Error message={state.searchedNotPresentText} />
            </div>
          )}

          {/* If the user has not searched any name or email then show the whole Data */}
          {state.searchedName === "" &&
            state.mentorParticipantResponseData.map((details) => (
              <OrgProgramParticipantCard
                details={details}
                key={details.id}
                state={state}
                programId={programId}
              />
            ))}
        </>
      ) : (
        /*
         * If we have nothing in state.mentorParticipantResponseData
         * then show an Error
         */
        <OrgNoProgramParticipantError programId={programId} />
      )}
    </div>
  );
};

export default OrgProgramMentorParticipant;
