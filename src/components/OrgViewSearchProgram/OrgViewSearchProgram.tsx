import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useOrgCreateProgram } from "../../context/api_context/OrgCreateProgramContext";
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

const OrgViewSearchProgram = ({
  state,
  dispatch,
}: OrgViewSearchProgramProps) => {
  const { getProgramsMetaList } = useOrgCreateProgram();
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
              [
                "Increasing Duration",
                "Decreasing Duration",
                "Newest to Oldest Date",
                "Oldest to Newest Date",
              ].includes(state.selectedRadioForSort)) &&
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
            ![
              "Increasing Duration",
              "Decreasing Duration",
              "Newest to Oldest Date",
              "Oldest to Newest Date",
            ].includes(state.selectedRadioForSort) &&
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
