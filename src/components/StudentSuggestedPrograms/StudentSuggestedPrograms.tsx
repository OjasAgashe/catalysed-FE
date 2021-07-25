import React, { useEffect, useState } from "react";
import { useOrgAPI } from "../../context/api_context/OrgAPIContext";
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
};

/*
 * StudentSuggestedPrograms: ({ state, dispatch, }: StudentSuggestedProgramsProps) => JSX.Element
 *
 * Component accepts two props state, and dispatch
 */
const StudentSuggestedPrograms = ({
  state,
  dispatch,
}: StudentSuggestedProgramsProps) => {
  const { getProgramsMetaList } = useOrgAPI();

  const [programsList, setProgramsList] = useState<GetProgramMetaListData[]>(
    []
  );

  const [filteredProgramsList, setFilteredProgramsList] = useState<
    GetProgramMetaListData[]
  >([]);

  useEffect(() => {
    const getPrograms = async () => {
      try {
        const response = await getProgramsMetaList();
        setProgramsList([...response.data]);
      } catch (error) {
      } finally {
        dispatch({ type: "loading", payload: false });
      }
    };

    getPrograms();
  }, [dispatch, getProgramsMetaList]);

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
              ["Increasing Duration", "Descreasing Duration"].includes(
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
