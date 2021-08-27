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

  /*
   * To store meta list of all the programs
   */
  const [programsList, setProgramsList] = useState<GetProgramMetaListData[]>(
    []
  );

  /*
   * To store meta list of all the filtered programs
   */
  const [filteredProgramsList, setFilteredProgramsList] = useState<
    GetProgramMetaListData[]
  >([]);

  const { filterBy } = useParams<{ filterBy: string }>();

  useEffect(() => {
    // Function to get meta list of the Programs
    const getPrograms = async () => {
      try {
        // get the list
        const response = await getProgramsMetaList();

        // store the list
        setProgramsList([...response.data]);

        // keep the filter By Status option (on the page) to None
        dispatch({
          type: "selectedRadioForFilter",
          payload: "All",
        });

        // keep the filter By Category option (on the page) to None
        dispatch({
          type: "selectedRadioForFilterCategory",
          payload: "All",
        });

        /*
         * If we are coming on this page from Org Home On going section, then
         */
        if (filterBy === "in_progress") {
          // Get the Ongoing programs
          const ongoingPrograms = await getOngoingPrograms();

          // set the Filtered Program List to ongoingPrograms
          setFilteredProgramsList([...ongoingPrograms]);

          // set the filter By Category option (on the page) to On Going
          dispatch({
            type: "selectedRadioForFilterCategory",
            payload: "On Going",
          });

          // set the filter By Status option (on the page) to Published
          dispatch({
            type: "selectedRadioForFilter",
            payload: "Published",
          });
        }

        /*
         * If we are coming on this page from Org Home Program Starting this
         * Month section, then
         */
        if (filterBy === "this_month") {
          // get the programs Starting this Month
          const programsStartingThisMonth =
            await getProgramsStartingThisMonth();

          // set the filtered program list to programsStartingThisMonth
          setFilteredProgramsList([...programsStartingThisMonth]);

          /*
           * set the filter By Category option (on the page) to Starting
           * this Month
           */
          dispatch({
            type: "selectedRadioForFilterCategory",
            payload: "Starting this Month",
          });

          // set the filter By Status option (on the page) to Published
          dispatch({ type: "selectedRadioForFilter", payload: "Published" });
        }
      } catch (error) {
      } finally {
        // after getting the data, hide LoadingProgress component
        dispatch({ type: "loading", payload: false });
      }
    };

    // call the getPrograms function
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
      {/* Show FilterBar component */}
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
            {/*
             * If the user has searched any Title, or has choosed any filter,
             * or has choosed any sorting option then show the programs list based
             * on that
             *
             * If we have any program
             */}
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
          /*
           * If we do not get any programs meta list from the API
           * call than show an Error
           */
          <div>
            <Error message="You do not have any programs !!" />
          </div>
        )}
      </div>
    </div>
  );
};

export default OrgViewSearchProgram;
