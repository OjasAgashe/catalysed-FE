import React, { useState } from "react";
import {
  GetProgramMetaListData,
  OrgViewSearchProgramActionType,
  OrgViewSearchProgramState,
} from "../../types/OrgViewSearchProgram";
import "../OrgViewSearchProgram/OrgViewSearchProgram.css";
import FilterBar from "./FilterBar";
import Error from "../Error/Error";
import ProgramCard from "../ProgramCard/ProgramCard";

type StudentSuggestedProgramsProps = {
  state: OrgViewSearchProgramState;
  dispatch: React.Dispatch<OrgViewSearchProgramActionType>;
  programsList: GetProgramMetaListData[];
};

/*
 * StudentSuggestedPrograms: ({ state, dispatch, }: StudentSuggestedProgramsProps) => JSX.Element
 *
 * Component accepts two props state, and dispatch
 */
const StudentSuggestedPrograms = ({
  state,
  dispatch,
  programsList,
}: StudentSuggestedProgramsProps) => {
  const [filteredProgramsList, setFilteredProgramsList] = useState<
    GetProgramMetaListData[]
  >([]);

  return (
    <div className="OrgViewSearchProgram">
      <FilterBar
        state={state}
        dispatch={dispatch}
        programsList={programsList}
        setFilteredProgramsList={setFilteredProgramsList}
      />

      <div className="ProgramCardContainer">
        {programsList.length ? (
          <>
            {(state.searchedTitle ||
              ["Virtual", "In Person"].includes(
                state.selectedRadioForFilterMode
              ) ||
              ["Increasing Duration", "Decreasing Duration"].includes(
                state.selectedRadioForSort
              ) ||
              ["Newest to Oldest Date", "Oldest to Newest Date"].includes(
                state.selectedRadioForDateSort
              )) &&
            filteredProgramsList.length ? (
              [...filteredProgramsList]
                .reverse()
                .map((program: GetProgramMetaListData) => (
                  <ProgramCard program={program} key={program.id} />
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
            {state.searchedTitle === "" &&
            !["Virtual", "In Person"].includes(
              state.selectedRadioForFilterMode
            ) &&
            !["Increasing Duration", "Decreasing Duration"].includes(
              state.selectedRadioForSort
            ) &&
            !["Newest to Oldest Date", "Oldest to Newest Date"].includes(
              state.selectedRadioForDateSort
            ) &&
            programsList.length
              ? [...programsList]
                  .reverse()
                  .map((program: GetProgramMetaListData) => (
                    <ProgramCard program={program} key={program.id} />
                  ))
              : ""}
          </>
        ) : (
          <div>
            <Error message="Sorry !! No programs found" />
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentSuggestedPrograms;
