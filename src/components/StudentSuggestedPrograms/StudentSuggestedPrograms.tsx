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
  /*
   * To store meta list of all the filtered programs
   */
  const [filteredProgramsList, setFilteredProgramsList] = useState<
    GetProgramMetaListData[]
  >([]);

  return (
    <div className="OrgViewSearchProgram">
      {/* Show FilterBar component */}
      <FilterBar
        state={state}
        dispatch={dispatch}
        programsList={programsList}
        setFilteredProgramsList={setFilteredProgramsList}
      />

      <div className="ProgramCardContainer">
        {programsList.length ? (
          <>
            {/*
             * If the user has searched any Title, or has choosed any filter,
             * or has choosed any sorting option then show the programs list based
             * on that
             *
             * If we have any program
             */}
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
              /*
               * If we do not have any programs based on the searching, filtering
               * or sorting
               * Then show an Error
               */
              <div
                style={
                  state.searchedNotPresentText === "" ? { display: "none" } : {}
                }
              >
                <Error message={state.searchedNotPresentText} />
              </div>
            )}

            {/*
             * If the user has not searched any Title, or choosed any filtering or
             * sorting option, then Show it the whole Programs
             */}
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
          /*
           * If we do not get any programs meta list from the API
           * call than show an Error
           */
          <div>
            <Error message="Sorry !! No programs found" />
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentSuggestedPrograms;
