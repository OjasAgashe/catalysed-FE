import React from "react";
import { Dropdown, DropdownButton, Table } from "react-bootstrap";
import {
  StudentUpdatesCommonActionType,
  StudentUpdatesCommonResponse,
  StudentUpdatesCommonState,
  StudentUpdatesCommonValues,
} from "../../types/StudentUpdates";
import StuUpdatesApplicationsTableRow from "./StuUpdatesApplicationsTableRow";
import Error from "../Error/Error";

type StuUpdatesApplicationsDataContainerProps = {
  state: StudentUpdatesCommonState;
  dispatch: React.Dispatch<StudentUpdatesCommonActionType>;
  values: StudentUpdatesCommonValues;
  entity: string;
};

const StuUpdatesApplicationsDataContainer = ({
  state,
  dispatch,
  values,
  entity
}: StuUpdatesApplicationsDataContainerProps) => {
  const handleUpdatesApplicationsStatusDropdownSelect = (
    eventKey: string | null
  ) => {
    if (eventKey) {
      dispatch({ type: "selectedRadioForFilter", payload: eventKey });
      dispatch({ type: "searchedNameNotFound", payload: "" });
      dispatch({ type: "searchedName", payload: "" });

      const responseData = state.responseData as StudentUpdatesCommonResponse[];
      let tempFilteredData = [...responseData];

      if (eventKey === "Approved")
        tempFilteredData =
          values.filterApprovedResponseData as StudentUpdatesCommonResponse[];

      if (eventKey === "Pending")
        tempFilteredData =
          values.filterPendingResponseData as StudentUpdatesCommonResponse[];

      if (eventKey === "Rejected")
        tempFilteredData =
          values.filterRejectedResponseData as StudentUpdatesCommonResponse[];

      if (state.selectedRadioForSort === "Latest")
        tempFilteredData.sort(values.sortDateByLatestUsing);

      if (state.selectedRadioForSort === "Oldest")
        tempFilteredData.sort(values.sortDateByOldestUsing);

      dispatch({ type: "filteredResponseData", payload: tempFilteredData });
      if (eventKey && tempFilteredData.length === 0) {
        dispatch({
          type: "searchedNameNotFound",
          payload: "Sorry!! No Programs Found for this Option",
        });
      }
    }
  };

  const handleUpdatesApplicationsAppliedOnDropdownSelect = (
    eventKey: string | null
  ) => {
    if (eventKey) {
      dispatch({ type: "selectedRadioForSort", payload: eventKey });
      dispatch({ type: "searchedNameNotFound", payload: "" });
      dispatch({ type: "searchedName", payload: "" });

      const responseData = state.responseData as StudentUpdatesCommonResponse[];
      let tempFilteredData = [...responseData];

      if (state.selectedRadioForFilter === "Approved")
        tempFilteredData =
          values.filterApprovedTempFilteredData(tempFilteredData);

      if (state.selectedRadioForFilter === "Pending")
        tempFilteredData =
          values.filterPendingTempFilteredData(tempFilteredData);

      if (state.selectedRadioForFilter === "Rejected")
        tempFilteredData =
          values.filterRejectedTempFilteredData(tempFilteredData);

      if (eventKey === "Latest")
        tempFilteredData.sort(values.sortDateByLatestUsing);

      if (eventKey === "Oldest")
        tempFilteredData.sort(values.sortDateByOldestUsing);

      dispatch({ type: "filteredResponseData", payload: tempFilteredData });
      if (eventKey && tempFilteredData.length === 0) {
        dispatch({
          type: "searchedNameNotFound",
          payload: "Sorry!! No Programs Found for this Option",
        });
      }
    }
  };

  return (
    <div className="StuUpdatesApplicationsDataContainer">
      <Table striped responsive="md">
        <thead>
          <tr className="UpdatesApplicationsTableRow">
            <th className="UpdatesApplicationsHeader">Program Name</th>

            <th className="UpdatesApplicationsHeader NumericalHeaderColumn">
              <DropdownButton
                title={`Applied On${
                  state.selectedRadioForSort !== "All"
                    ? `:${state.selectedRadioForSort}`
                    : ""
                }`}
                className="UpdatesApplicationsFilterSortDropdown"
              >
                <Dropdown.Item
                  eventKey="All"
                  onSelect={handleUpdatesApplicationsAppliedOnDropdownSelect}
                >
                  None
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="Latest"
                  onSelect={handleUpdatesApplicationsAppliedOnDropdownSelect}
                >
                  Latest
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="Oldest"
                  onSelect={handleUpdatesApplicationsAppliedOnDropdownSelect}
                >
                  Oldest
                </Dropdown.Item>
              </DropdownButton>
            </th>

            <th className="UpdatesApplicationsHeader">
              <DropdownButton
                title={`Application Status${
                  state.selectedRadioForFilter !== "All"
                    ? `:${state.selectedRadioForFilter}`
                    : ""
                }`}
                className="UpdatesApplicationsFilterSortDropdown"
              >
                <Dropdown.Item
                  eventKey="All"
                  onSelect={handleUpdatesApplicationsStatusDropdownSelect}
                >
                  None
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="Approved"
                  onSelect={handleUpdatesApplicationsStatusDropdownSelect}
                >
                  Approved
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="Pending"
                  onSelect={handleUpdatesApplicationsStatusDropdownSelect}
                >
                  Pending
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="Rejected"
                  onSelect={handleUpdatesApplicationsStatusDropdownSelect}
                >
                  Rejected
                </Dropdown.Item>
              </DropdownButton>
            </th>
          </tr>
        </thead>
        <tbody>
          {(state.searchedName ||
            ["Latest", "Oldest"].includes(state.selectedRadioForSort) ||
            ["Approved", "Pending", "Rejected"].includes(
              state.selectedRadioForFilter
            )) &&
          state.filteredResponseData !== null &&
          state.filteredResponseData.length ? (
            [...state.filteredResponseData]
              .reverse()
              .map((data) => (
                <StuUpdatesApplicationsTableRow
                  data={data}
                  key={data.programId}
                  entity={entity}
                />
              ))
          ) : (
            <tr
              style={
                state.searchedNameNotFound === "" ? { display: "none" } : {}
              }
            >
              <td colSpan={5}>
                <div className="ErrorCompContainer">
                  <Error message={state.searchedNameNotFound} />
                </div>
              </td>
            </tr>
          )}

          {state.searchedName === "" &&
            !["Latest", "Oldest"].includes(state.selectedRadioForSort) &&
            !["Approved", "Pending", "Rejected"].includes(
              state.selectedRadioForFilter
            ) &&
            state.responseData !== null &&
            [...state.responseData]
              .reverse()
              .map((data) => (
                <StuUpdatesApplicationsTableRow
                  data={data}
                  key={data.programId}
                  entity={entity}
                />
              ))}
        </tbody>
      </Table>
    </div>
  );
};

export default StuUpdatesApplicationsDataContainer;
