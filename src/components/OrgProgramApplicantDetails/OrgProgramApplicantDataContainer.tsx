import React from "react";
import { Dropdown, DropdownButton, Table } from "react-bootstrap";
import {
  OrgProgramApplicantActionType,
  OrgProgramApplicantData,
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
  const handleProgramApplicantDoADropdownSelect = (eventKey: string | null) => {
    if (eventKey) {
      dispatch({ type: "selectedDropdownForSortDoA", payload: eventKey });
      dispatch({ type: "searchedNotPresentText", payload: "" });
      dispatch({ type: "searchedName", payload: "" });

      const responseData = state.responseData as OrgProgramApplicantData[];
      let tempFilteredData = [...responseData];

      if (state.selectedDropdownForFilterStatus === "Approved")
        tempFilteredData =
          values.filterAcceptedTempFilteredData(tempFilteredData);

      if (state.selectedDropdownForFilterStatus === "Pending")
        tempFilteredData =
          values.filterPendingTempFilteredData(tempFilteredData);

      if (state.selectedDropdownForFilterStatus === "Rejected")
        tempFilteredData =
          values.filterRejectedTempFilteredData(tempFilteredData);

      if (state.selectedDropdownForFilterViewed === "Viewed")
        tempFilteredData =
          values.filterViewedTempFilteredData(tempFilteredData);

      if (state.selectedDropdownForFilterViewed === "Not Viewed")
        tempFilteredData =
          values.filterNotViewedTempFilteredData(tempFilteredData);

      if (eventKey === "Latest")
        tempFilteredData.sort(values.sortDateByLatestUsing);

      if (eventKey === "Oldest")
        tempFilteredData.sort(values.sortDateByOldestUsing);

      values.setFilteredResponseData(tempFilteredData);
      if (eventKey && tempFilteredData.length === 0) {
        dispatch({
          type: "searchedNotPresentText",
          payload: "Sorry!! No Invitations Found",
        });
      }
    }
  };

  const handleProgramApplicantStatusDropdownSelect = (
    eventKey: string | null
  ) => {
    if (eventKey) {
      dispatch({ type: "selectedDropdownForFilterStatus", payload: eventKey });
      dispatch({ type: "searchedNotPresentText", payload: "" });
      dispatch({ type: "searchedName", payload: "" });

      const response = state.responseData as OrgProgramApplicantData[];
      let tempFilteredData = [...response];

      if (eventKey === "Approved")
        tempFilteredData =
          values.filterAcceptedResponseData as OrgProgramApplicantData[];

      if (eventKey === "Pending")
        tempFilteredData =
          values.filterPendingResponseData as OrgProgramApplicantData[];

      if (eventKey === "Rejected")
        tempFilteredData =
          values.filterRejectedResponseData as OrgProgramApplicantData[];

      if (state.selectedDropdownForFilterViewed === "Viewed")
        tempFilteredData =
          values.filterViewedTempFilteredData(tempFilteredData);

      if (state.selectedDropdownForFilterViewed === "Not Viewed")
        tempFilteredData =
          values.filterNotViewedTempFilteredData(tempFilteredData);

      if (state.selectedDropdownForSortDoA === "Latest")
        tempFilteredData.sort(values.sortDateByLatestUsing);

      if (state.selectedDropdownForSortDoA === "Oldest")
        tempFilteredData.sort(values.sortDateByOldestUsing);

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

      const response = state.responseData as OrgProgramApplicantData[];
      let tempFilteredData = [...response];

      if (eventKey === "Viewed")
        tempFilteredData =
          values.filterViewedResponseData as OrgProgramApplicantData[];

      if (eventKey === "Not Viewed")
        tempFilteredData =
          values.filterNotViewedResponseData as OrgProgramApplicantData[];

      if (state.selectedDropdownForFilterStatus === "Approved")
        tempFilteredData =
          values.filterAcceptedTempFilteredData(tempFilteredData);

      if (state.selectedDropdownForFilterStatus === "Pending")
        tempFilteredData =
          values.filterPendingTempFilteredData(tempFilteredData);

      if (state.selectedDropdownForFilterStatus === "Rejected")
        tempFilteredData =
          values.filterRejectedTempFilteredData(tempFilteredData);

      if (state.selectedDropdownForSortDoA === "Latest")
        tempFilteredData.sort(values.sortDateByLatestUsing);

      if (state.selectedDropdownForSortDoA === "Oldest")
        tempFilteredData.sort(values.sortDateByOldestUsing);

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
            <th className="ProgramApplicantHeader NumericalHeaderColumn">
              <DropdownButton
                title={`Applied On${
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
                  eventKey="Approved"
                  onSelect={handleProgramApplicantStatusDropdownSelect}
                >
                  Approved
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
                  eventKey="Viewed"
                  onSelect={handleProgramApplicantViewedDropdownSelect}
                >
                  Viewed
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="Not Viewed"
                  onSelect={handleProgramApplicantViewedDropdownSelect}
                >
                  Not Viewed
                </Dropdown.Item>
              </DropdownButton>
            </th>
          </tr>
        </thead>
        <tbody>
          {(state.searchedName ||
            ["Latest", "Oldest"].includes(state.selectedDropdownForSortDoA) ||
            ["Approved", "Pending", "Rejected"].includes(
              state.selectedDropdownForFilterStatus
            ) ||
            ["Viewed", "Not Viewed"].includes(
              state.selectedDropdownForFilterViewed
            )) &&
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
            !["Approved", "Pending", "Rejected"].includes(
              state.selectedDropdownForFilterStatus
            ) &&
            !["Viewed", "Not Viewed"].includes(
              state.selectedDropdownForFilterViewed
            ) &&
            state.responseData &&
            state.responseData.length &&
            state.responseData.map((data) => (
              <ApplicantTableRow data={data} key={data.id} />
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default OrgProgramApplicantDataContainer;
