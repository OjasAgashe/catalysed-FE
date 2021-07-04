import React, { useMemo, useReducer } from "react";
import { Dropdown, DropdownButton, Table } from "react-bootstrap";
import Error from "../Error/Error";
import ConnectedToProgramTableRow from "./ConnectedToProgramTableRow";
import { OrgDirectoryDetailsCommonState } from "../../types/OrganisationDirectory";
import { orgDirectoryDetailsCTPSectionReducer } from "../../reducers/orgDirectoryDetailsCTPSectionReducer";

type SectionProps = {
  state: OrgDirectoryDetailsCommonState;
};

const Section = ({ state }: SectionProps) => {
  const [sectionState, sectionDispatch] = useReducer(
    orgDirectoryDetailsCTPSectionReducer,
    {
      filteredResponseData: null,
      selectedRadioForFilterState: "All",
      noFilteredData: "",
    }
  );

  const filterActiveResponseData = useMemo(() => {
    return state.responseData?.connectPrograms
      ? state.responseData?.connectPrograms.filter(
          (data) => data.status === "PUBLISHED"
        )
      : null;
  }, [state.responseData?.connectPrograms]);

  const filterInactiveResponseData = useMemo(() => {
    return state.responseData?.connectPrograms
      ? state.responseData?.connectPrograms.filter(
          (data) => data.status === "SAVED_TO_DRAFT"
        )
      : null;
  }, [state.responseData?.connectPrograms]);

  const handleDirectoryDetailsStateDropdownSelect = (
    eventKey: string | null
  ) => {
    if (eventKey) {
      sectionDispatch({
        type: "selectedRadioForFilterState",
        payload: eventKey,
      });
      sectionDispatch({ type: "noFilteredData", payload: "" });

      if (state.responseData?.connectPrograms) {
        let tempFilteredData:
          | { programId: number; status: string; title: string }[]
          | null = [...state.responseData?.connectPrograms];

        if (eventKey === "Published")
          tempFilteredData = filterActiveResponseData;

        if (eventKey === "In Draft")
          tempFilteredData = filterInactiveResponseData;

        sectionDispatch({
          type: "filteredResponseData",
          payload: tempFilteredData,
        });

        if (eventKey && tempFilteredData && tempFilteredData.length === 0) {
          sectionDispatch({
            type: "noFilteredData",
            payload: "Sorry!! No Programs Found for This Option",
          });
        }
      }
    }
  };

  return (
    <div className="OrgProgramInvitationDataContainer">
      <Table striped responsive="md">
        <thead>
          <tr className="ProgramInvitationTableRow">
            <th className="ProgramInvitationHeader">Program Name</th>
            <th className="ProgramInvitationHeader">
              <DropdownButton
                title={`Program Status${
                  sectionState.selectedRadioForFilterState !== "All"
                    ? `:${sectionState.selectedRadioForFilterState}`
                    : ""
                }`}
                className="ProgramFilterSortDropdown"
              >
                <Dropdown.Item
                  eventKey="All"
                  onSelect={handleDirectoryDetailsStateDropdownSelect}
                >
                  None
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="Published"
                  onSelect={handleDirectoryDetailsStateDropdownSelect}
                >
                  Published
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="In Draft"
                  onSelect={handleDirectoryDetailsStateDropdownSelect}
                >
                  In Draft
                </Dropdown.Item>
              </DropdownButton>
            </th>
          </tr>
        </thead>
        <tbody>
          {["Published", "In Draft"].includes(
            sectionState.selectedRadioForFilterState
          ) &&
          sectionState.filteredResponseData &&
          sectionState.filteredResponseData.length ? (
            [...sectionState.filteredResponseData]
              .reverse()
              .map((data) => (
                <ConnectedToProgramTableRow data={data} key={data.programId} />
              ))
          ) : (
            <tr
              style={
                sectionState.noFilteredData === "" ? { display: "none" } : {}
              }
            >
              <td colSpan={2}>
                <div className="ErrorCompContainer">
                  <Error message={sectionState.noFilteredData} />
                </div>
              </td>
            </tr>
          )}

          {!["Published", "In Draft"].includes(
            sectionState.selectedRadioForFilterState
          ) && state.responseData?.connectPrograms &&
            [...state.responseData?.connectPrograms]
              .reverse()
              .map((data) => (
                <ConnectedToProgramTableRow data={data} key={data.programId} />
              ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Section;
