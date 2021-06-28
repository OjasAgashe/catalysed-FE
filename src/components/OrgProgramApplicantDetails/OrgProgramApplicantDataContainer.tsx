import React from "react";
import { Dropdown, DropdownButton, Table } from "react-bootstrap";
import {
  OrgProgramApplicantActionType,
  OrgProgramApplicantState,
  OrgProgramApplicantValues,
} from "../../types/OrgProgramDetails";
import ApplicantTableRow from "./ApplicantTableRow";
import Error from "../Error/Error";

type OrgProgramApplicantDataContainerProps = {
  state: OrgProgramApplicantState;
  dispatch: React.Dispatch<OrgProgramApplicantActionType>;
  values: OrgProgramApplicantValues;
};

const OrgProgramApplicantDataContainer = ({
  state,
  dispatch,
  values,
}: OrgProgramApplicantDataContainerProps) => {
  const handleProgramApplicantDoADropdownSelect = (
    eventKey: string | null
  ) => {};

  const handleProgramApplicantStatusDropdownSelect = (
    eventKey: string | null
  ) => {
    if (eventKey) {
      dispatch({ type: "selectedDropdownForFilterStatus", payload: eventKey });
      dispatch({ type: "searchedNotPresentText", payload: "" });
      dispatch({ type: "searchedName", payload: "" });

      let tempFilteredData = [...state.fakeData];

      if (eventKey === "Accepted")
        tempFilteredData = values.filterAcceptedResponseData;

      if (eventKey === "Pending")
        tempFilteredData = values.filterPendingResponseData;

      if (eventKey === "Rejected")
        tempFilteredData = values.filterRejectedResponseData;

      if (state.selectedDropdownForFilterViewed === "Yes")
        tempFilteredData =
          values.filterViewedTempFilteredData(tempFilteredData);

      if (state.selectedDropdownForFilterViewed === "No")
        tempFilteredData =
          values.filterNotViewedTempFilteredData(tempFilteredData);

      values.setFilteredResponseData(tempFilteredData);
      if (eventKey && tempFilteredData.length === 0) {
        dispatch({
          type: "searchedNotPresentText",
          payload: "Sorry!! No Applicants Found",
        });
      }
    }
  };

  const handleProgramApplicantViewedDropdownSelect = (
    eventKey: string | null
  ) => {
    if (eventKey) {
      dispatch({ type: "selectedDropdownForFilterViewed", payload: eventKey });
      dispatch({ type: "searchedNotPresentText", payload: "" });
      dispatch({ type: "searchedName", payload: "" });

      let tempFilteredData = [...state.fakeData];

      if (eventKey === "Yes")
        tempFilteredData = values.filterViewedResponseData;

      if (eventKey === "No")
        tempFilteredData = values.filterNotViewedResponseData;

      if (state.selectedDropdownForFilterStatus === "Accepted")
        tempFilteredData =
          values.filterAcceptedTempFilteredData(tempFilteredData);

      if (state.selectedDropdownForFilterStatus === "Pending")
        tempFilteredData =
          values.filterPendingTempFilteredData(tempFilteredData);

      if (state.selectedDropdownForFilterStatus === "Rejected")
        tempFilteredData =
          values.filterRejectedTempFilteredData(tempFilteredData);

      values.setFilteredResponseData(tempFilteredData);
      if (eventKey && tempFilteredData.length === 0) {
        dispatch({
          type: "searchedNotPresentText",
          payload: "Sorry!! No Applicants Found",
        });
      }
    }
  };

  return (
    <div className="OrgProgramApplicantDataContainer">
      <Table striped responsive="md">
        <thead>
          <tr className="ProgramApplicantTableRow">
            <th className="ProgramApplicantHeader">Name</th>
            <th className="ProgramApplicantHeader">Email</th>
            <th className="ProgramApplicantHeader">
              <DropdownButton
                title={`Date of application${
                  state.selectedDropdownForSortDoA !== "All"
                    ? `:${state.selectedDropdownForSortDoA}`
                    : ""
                }`}
                className="ProgramFilterSortDropdown"
              >
                <Dropdown.Item
                  eventKey="All"
                  onSelect={handleProgramApplicantDoADropdownSelect}
                >
                  None
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="Latest"
                  onSelect={handleProgramApplicantDoADropdownSelect}
                >
                  Latest
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="Oldest"
                  onSelect={handleProgramApplicantDoADropdownSelect}
                >
                  Oldest
                </Dropdown.Item>
              </DropdownButton>
            </th>

            <th className="ProgramApplicantHeader">
              <DropdownButton
                title={`Status${
                  state.selectedDropdownForFilterStatus !== "All"
                    ? `:${state.selectedDropdownForFilterStatus}`
                    : ""
                }`}
                className="ProgramFilterSortDropdown"
              >
                <Dropdown.Item
                  eventKey="All"
                  onSelect={handleProgramApplicantStatusDropdownSelect}
                >
                  None
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="Accepted"
                  onSelect={handleProgramApplicantStatusDropdownSelect}
                >
                  Accepted
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="Pending"
                  onSelect={handleProgramApplicantStatusDropdownSelect}
                >
                  Pending
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="Rejected"
                  onSelect={handleProgramApplicantStatusDropdownSelect}
                >
                  Rejected
                </Dropdown.Item>
              </DropdownButton>
            </th>

            <th className="ProgramApplicantHeader">
              <DropdownButton
                title={`Viewed${
                  state.selectedDropdownForFilterViewed !== "All"
                    ? `:${state.selectedDropdownForFilterViewed}`
                    : ""
                }`}
                className="ProgramFilterSortDropdown"
              >
                <Dropdown.Item
                  eventKey="All"
                  onSelect={handleProgramApplicantViewedDropdownSelect}
                >
                  None
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="Yes"
                  onSelect={handleProgramApplicantViewedDropdownSelect}
                >
                  Yes
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="No"
                  onSelect={handleProgramApplicantViewedDropdownSelect}
                >
                  No
                </Dropdown.Item>
              </DropdownButton>
            </th>
          </tr>
        </thead>
        <tbody>
          {(state.searchedName ||
            ["Latest", "Oldest"].includes(state.selectedDropdownForSortDoA) ||
            ["Accepted", "Pending", "Rejected"].includes(
              state.selectedDropdownForFilterStatus
            ) ||
            ["Yes", "No"].includes(state.selectedDropdownForFilterViewed)) &&
          values.filteredResponseData.length ? (
            values.filteredResponseData.map((data) => (
              <ApplicantTableRow data={data} key={data.id} />
            ))
          ) : (
            <tr
              style={
                state.searchedNotPresentText === "" ? { display: "none" } : {}
              }
            >
              <td colSpan={5}>
                <div className="ErrorCompContainer">
                  <Error message={state.searchedNotPresentText} />
                </div>
              </td>
            </tr>
          )}
          {state.searchedName === "" &&
            !["Latest", "Oldest"].includes(state.selectedDropdownForSortDoA) &&
            !["Accepted", "Pending", "Rejected"].includes(
              state.selectedDropdownForFilterStatus
            ) &&
            !["Yes", "No"].includes(state.selectedDropdownForFilterViewed) &&
            state.fakeData.map((data) => (
              <ApplicantTableRow data={data} key={data.id} />
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default OrgProgramApplicantDataContainer;
