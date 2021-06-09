import React from "react";
import { Dropdown, DropdownButton, Table } from "react-bootstrap";
import {
  OrgInvitationResponseData,
  OrgProgramInvitationActionType,
  OrgProgramInvitationState,
} from "../../types/OrgProgramDetails";
import Error from "../Error/Error";
import InvitationTableRow from "./InvitationTableRow";

type OrgProgramInvitationDataContainerProps = {
  filteredResponseData: OrgInvitationResponseData[];
  state: OrgProgramInvitationState;
  dispatch: React.Dispatch<OrgProgramInvitationActionType>;
  setFilteredResponseData: React.Dispatch<
    React.SetStateAction<OrgInvitationResponseData[]>
  >;
  filterAcceptedResponseData: false | OrgInvitationResponseData[];
  filterPendingResponseData: false | OrgInvitationResponseData[];
  filterMentorResponseData: false | OrgInvitationResponseData[];
  filterStudentResponseData: false | OrgInvitationResponseData[];
  filterAcceptedTempFilteredData: (
    tempFilteredData: OrgInvitationResponseData[]
  ) => OrgInvitationResponseData[];
  filterPendingTempFilteredData: (
    tempFilteredData: OrgInvitationResponseData[]
  ) => OrgInvitationResponseData[];
  filterMentorTempFilteredData: (
    tempFilteredData: OrgInvitationResponseData[]
  ) => OrgInvitationResponseData[];
  filterStudentTempFilteredData: (
    tempFilteredData: OrgInvitationResponseData[]
  ) => OrgInvitationResponseData[];
  sortDateByLatestUsing: (
    obj1: OrgInvitationResponseData,
    obj2: OrgInvitationResponseData
  ) => 1 | -1;
  sortDateByOldestUsing: (
    obj1: OrgInvitationResponseData,
    obj2: OrgInvitationResponseData
  ) => 1 | -1;
};

const OrgProgramInvitationDataContainer = ({
  filteredResponseData,
  state,
  dispatch,
  setFilteredResponseData,
  filterAcceptedResponseData,
  filterPendingResponseData,
  filterMentorResponseData,
  filterStudentResponseData,
  filterAcceptedTempFilteredData,
  filterPendingTempFilteredData,
  filterMentorTempFilteredData,
  filterStudentTempFilteredData,
  sortDateByLatestUsing,
  sortDateByOldestUsing,
}: OrgProgramInvitationDataContainerProps) => {
  const handleProgramInvitationSentDropdownSelect = (
    eventKey: string | null
  ) => {
    if (eventKey) {
      dispatch({ type: "selectedRadioForSort", payload: eventKey });
      dispatch({ type: "searchedNotPresentText", payload: "" });
      dispatch({ type: "searchedName", payload: "" });

      const responseData = state.responseData as OrgInvitationResponseData[];
      let tempFilteredData: OrgInvitationResponseData[] = [...responseData];

      if (state.selectedRadioForFilter === "Accepted")
        tempFilteredData = filterAcceptedTempFilteredData(tempFilteredData);

      if (state.selectedRadioForFilter === "Pending")
        tempFilteredData = filterPendingTempFilteredData(tempFilteredData);

      if (state.selectedRadioForFilterType === "Mentor")
        tempFilteredData = filterMentorTempFilteredData(tempFilteredData);

      if (state.selectedRadioForFilterType === "Student")
        tempFilteredData = filterStudentTempFilteredData(tempFilteredData);

      if (eventKey === "Latest") tempFilteredData.sort(sortDateByLatestUsing);

      if (eventKey === "Oldest") tempFilteredData.sort(sortDateByOldestUsing);

      setFilteredResponseData(tempFilteredData);
      if (eventKey && tempFilteredData.length === 0) {
        dispatch({
          type: "searchedNotPresentText",
          payload: "Sorry!! No Invitations Found",
        });
      }
    }
  };

  const handleProgramInvitationStatusDropdownSelect = (
    eventKey: string | null
  ) => {
    if (eventKey) {
      dispatch({ type: "selectedRadioForFilter", payload: eventKey });
      dispatch({ type: "searchedNotPresentText", payload: "" });
      dispatch({ type: "searchedName", payload: "" });

      const responseData = state.responseData as OrgInvitationResponseData[];
      let tempFilteredData: OrgInvitationResponseData[] = [...responseData];

      if (eventKey === "Accepted")
        tempFilteredData =
          filterAcceptedResponseData as OrgInvitationResponseData[];

      if (eventKey === "Pending")
        tempFilteredData =
          filterPendingResponseData as OrgInvitationResponseData[];

      if (state.selectedRadioForFilterType === "Mentor")
        tempFilteredData = filterMentorTempFilteredData(tempFilteredData);

      if (state.selectedRadioForFilterType === "Student")
        tempFilteredData = filterStudentTempFilteredData(tempFilteredData);

      if (state.selectedRadioForSort === "Latest")
        tempFilteredData.sort(sortDateByLatestUsing);

      if (state.selectedRadioForSort === "Oldest")
        tempFilteredData.sort(sortDateByOldestUsing);

      setFilteredResponseData(tempFilteredData);
      if (eventKey && tempFilteredData.length === 0) {
        dispatch({
          type: "searchedNotPresentText",
          payload: "Sorry!! No Invitations Found",
        });
      }
    }
  };

  const handleProgramInvitationTypeDropdownSelect = (
    eventKey: string | null
  ) => {
    if (eventKey) {
      dispatch({ type: "selectedRadioForFilterType", payload: eventKey });
      dispatch({ type: "searchedNotPresentText", payload: "" });
      dispatch({ type: "searchedName", payload: "" });

      const responseData = state.responseData as OrgInvitationResponseData[];
      let tempFilteredData: OrgInvitationResponseData[] = [...responseData];

      if (eventKey === "Mentor")
        tempFilteredData =
          filterMentorResponseData as OrgInvitationResponseData[];

      if (eventKey === "Student")
        tempFilteredData =
          filterStudentResponseData as OrgInvitationResponseData[];

      if (state.selectedRadioForFilter === "Accepted")
        tempFilteredData = filterAcceptedTempFilteredData(tempFilteredData);

      if (state.selectedRadioForFilter === "Pending")
        tempFilteredData = filterPendingTempFilteredData(tempFilteredData);

      if (state.selectedRadioForSort === "Latest")
        tempFilteredData.sort(sortDateByLatestUsing);

      if (state.selectedRadioForSort === "Oldest")
        tempFilteredData.sort(sortDateByOldestUsing);

      setFilteredResponseData(tempFilteredData);
      if (eventKey && tempFilteredData.length === 0) {
        dispatch({
          type: "searchedNotPresentText",
          payload: "Sorry!! No Invitations Found",
        });
      }
    }
  };

  return (
    <div className="OrgProgramInvitationDataContainer">
      <Table striped responsive="md">
        <thead>
          <tr className="ProgramInvitationTableRow">
            <th className="ProgramInvitationHeader">Name</th>
            <th className="ProgramInvitationHeader">Email</th>
            <th className="ProgramInvitationHeader">
              <DropdownButton
                title={`Type${
                  state.selectedRadioForFilterType !== "All"
                    ? `:${state.selectedRadioForFilterType}`
                    : ""
                }`}
                className="ProgramFilterSortDropdown"
              >
                <Dropdown.Item
                  eventKey="All"
                  onSelect={handleProgramInvitationTypeDropdownSelect}
                >
                  None
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="Mentor"
                  onSelect={handleProgramInvitationTypeDropdownSelect}
                >
                  Mentor
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="Student"
                  onSelect={handleProgramInvitationTypeDropdownSelect}
                >
                  Student
                </Dropdown.Item>
              </DropdownButton>
            </th>

            <th className="ProgramInvitationHeader">
              <DropdownButton
                title={`Sent On${
                  state.selectedRadioForSort !== "All"
                    ? `:${state.selectedRadioForSort}`
                    : ""
                }`}
                className="ProgramFilterSortDropdown"
              >
                <Dropdown.Item
                  eventKey="All"
                  onSelect={handleProgramInvitationSentDropdownSelect}
                >
                  None
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="Latest"
                  onSelect={handleProgramInvitationSentDropdownSelect}
                >
                  Latest
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="Oldest"
                  onSelect={handleProgramInvitationSentDropdownSelect}
                >
                  Oldest
                </Dropdown.Item>
              </DropdownButton>
            </th>
            <th className="ProgramInvitationHeader">
              <DropdownButton
                title={`Status${
                  state.selectedRadioForFilter !== "All"
                    ? `:${state.selectedRadioForFilter}`
                    : ""
                }`}
                className="ProgramFilterSortDropdown"
              >
                <Dropdown.Item
                  eventKey="All"
                  onSelect={handleProgramInvitationStatusDropdownSelect}
                >
                  None
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="Accepted"
                  onSelect={handleProgramInvitationStatusDropdownSelect}
                >
                  Accepted
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="Pending"
                  onSelect={handleProgramInvitationStatusDropdownSelect}
                >
                  Pending
                </Dropdown.Item>
              </DropdownButton>
            </th>
          </tr>
        </thead>
        <tbody>
          {(state.searchedName ||
            ["Latest", "Oldest"].includes(state.selectedRadioForSort) ||
            ["Accepted", "Pending"].includes(state.selectedRadioForFilter) ||
            ["Mentor", "Student"].includes(state.selectedRadioForFilterType)) &&
          filteredResponseData.length ? (
            [...filteredResponseData]
              .reverse()
              .map((data) => <InvitationTableRow data={data} key={data.id} />)
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
            !["Latest", "Oldest"].includes(state.selectedRadioForSort) &&
            !["Accepted", "Pending"].includes(state.selectedRadioForFilter) &&
            !["Mentor", "Student"].includes(state.selectedRadioForFilterType) &&
            state.responseData !== null &&
            [...state.responseData]
              .reverse()
              .map((data) => <InvitationTableRow data={data} key={data.id} />)}
        </tbody>
      </Table>
    </div>
  );
};

export default OrgProgramInvitationDataContainer;
