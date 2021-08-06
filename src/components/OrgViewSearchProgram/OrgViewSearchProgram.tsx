import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useOrgAPI } from "../../context/api_context/OrgAPIContext";
import { ORGANISATION_PROGRAM_CREATE } from "../../constants/Routes";
import {
  GetProgramMetaListData,
  OrgViewSearchProgramActionType,
  OrgViewSearchProgramState,
} from "../../types/OrgViewSearchProgram";
import ProgramCard from "../ProgramCard/ProgramCard";
import FilterBar from "./FilterBar";
import "./OrgViewSearchProgram.css";
import Error from "../Error/Error";

type OrgViewSearchProgramProps = {
  state: OrgViewSearchProgramState;
  dispatch: React.Dispatch<OrgViewSearchProgramActionType>;
};

/*
 * OrgViewSearchProgram: ({ state, dispatch, }: OrgViewSearchProgramProps) => JSX.Element
 *
 * Component accepts two props state, and dispatch
 */
const OrgViewSearchProgram = ({
  state,
  dispatch,
}: OrgViewSearchProgramProps) => {
  const {
    getProgramsMetaList,
    getOngoingPrograms,
    getProgramsStartingThisMonth,
  } = useOrgAPI();
  const [programsList, setProgramsList] = useState<GetProgramMetaListData[]>(
    []
  );

  const [filteredProgramsList, setFilteredProgramsList] = useState<
    GetProgramMetaListData[]
  >([]);

  const { filterBy } = useParams<{ filterBy: string }>();

  useEffect(() => {
    const getPrograms = async () => {
      try {
        const response = await getProgramsMetaList();
        setProgramsList([...response.data]);

        dispatch({
          type: "selectedRadioForFilter",
          payload: "All",
        });

        dispatch({
          type: "selectedRadioForFilterCategory",
          payload: "All",
        });

        if (filterBy === "in_progress") {
          const ongoingPrograms = await getOngoingPrograms();
          setFilteredProgramsList([...ongoingPrograms]);

          dispatch({
            type: "selectedRadioForFilterCategory",
            payload: "On Going",
          });

          dispatch({
            type: "selectedRadioForFilter",
            payload: "Published",
          });
        }

        if (filterBy === "this_month") {
          const programsStartingThisMonth =
            await getProgramsStartingThisMonth();
          setFilteredProgramsList([...programsStartingThisMonth]);

          dispatch({
            type: "selectedRadioForFilterCategory",
            payload: "Starting this Month",
          });

          dispatch({ type: "selectedRadioForFilter", payload: "Published" });
        }
      } catch (error) {
      } finally {
        dispatch({ type: "loading", payload: false });
      }
    };

    getPrograms();
  }, [
    dispatch,
    filterBy,
    getOngoingPrograms,
    getProgramsMetaList,
    getProgramsStartingThisMonth,
  ]);

  return (
    <div className="OrgViewSearchProgram">
      <FilterBar
        state={state}
        dispatch={dispatch}
        programsList={programsList}
        setFilteredProgramsList={setFilteredProgramsList}
      />
      <div className="CreateProgramTextContainer">
        <Alert variant="info" className="CreateProgramText">
          💡 Want to Create a new Program?&nbsp;Then&nbsp;
          <Link className="CRClickHereLink" to={ORGANISATION_PROGRAM_CREATE}>
            click here
          </Link>
        </Alert>
      </div>
      <div className="ProgramCardContainer">
        {programsList.length ? (
          <>
            {(state.searchedTitle ||
              ["Published", "In Draft"].includes(
                state.selectedRadioForFilter
              ) ||
              ["Virtual", "In Person"].includes(
                state.selectedRadioForFilterMode
              ) ||
              ["Starting this Month", "On Going"].includes(
                state.selectedRadioForFilterCategory
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
            !["Published", "In Draft"].includes(state.selectedRadioForFilter) &&
            !["Virtual", "In Person"].includes(
              state.selectedRadioForFilterMode
            ) &&
            !["Starting this Month", "On Going"].includes(
              state.selectedRadioForFilterCategory
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
            <Error message="You do not have any programs !!" />
          </div>
        )}
      </div>
    </div>
  );
};

export default OrgViewSearchProgram;
