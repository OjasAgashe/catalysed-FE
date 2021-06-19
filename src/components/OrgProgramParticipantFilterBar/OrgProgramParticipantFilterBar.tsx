import React, { useCallback } from "react";
import { Dropdown, DropdownButton, Form } from "react-bootstrap";
import {
  OrgProgramParticipantActionType,
  OrgProgramParticipantData,
  OrgProgramParticipantState,
} from "../../types/OrgProgramDetails";
import "./OrgProgramParticipantFilterBar.css";

type OrgProgramParticipantFilterBarProps = {
  state: OrgProgramParticipantState;
  dispatch: React.Dispatch<OrgProgramParticipantActionType>;
  setFilteredParticipantData: React.Dispatch<
    React.SetStateAction<OrgProgramParticipantData[]>
  >;
};

const OrgProgramParticipantFilterBar = ({
  state,
  dispatch,
  setFilteredParticipantData,
}: OrgProgramParticipantFilterBarProps) => {
  const filterActiveTempFilteredData = useCallback(
    (tempFilteredData: OrgProgramParticipantData[]) =>
      tempFilteredData.filter((data) => data.active === true),
    []
  );

  const filterInActiveTempFilteredData = useCallback(
    (tempFilteredData: OrgProgramParticipantData[]) =>
      tempFilteredData.filter((data) => data.active === false),
    []
  );

  const handleSearchBarFormChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      dispatch({ type: "searchedName", payload: event.target.value });
      dispatch({ type: "searchedNotPresentText", payload: "" });

      let responseData: OrgProgramParticipantData[] | [] = [];

      if (state.showMentorDetails)
        responseData =
          state.mentorParticipantResponseData as OrgProgramParticipantData[];

      if (state.showStudentDetails)
        responseData =
          state.studentParticipantResponseData as OrgProgramParticipantData[];

      let tempFilteredData = responseData.filter((data) => {
        const firstName = data.firstName === null ? "" : data.firstName;
        const lastName = data.lastName === null ? "" : data.lastName;

        return (
          firstName.toLowerCase() +
          " " +
          lastName.toLowerCase()
        ).startsWith(event.target.value.toLowerCase());
      });

      if (state.selectedRadioForFilterState === "Active")
        tempFilteredData = filterActiveTempFilteredData(tempFilteredData);

      if (state.selectedRadioForFilterState === "Inactive")
        tempFilteredData = filterInActiveTempFilteredData(tempFilteredData);

      if (event.target.value.trim() === "" && tempFilteredData.length === 0) {
        tempFilteredData = [...responseData];

        if (state.selectedRadioForFilterState === "Active")
          tempFilteredData = filterActiveTempFilteredData(tempFilteredData);

        if (state.selectedRadioForFilterState === "Inactive")
          tempFilteredData = filterInActiveTempFilteredData(tempFilteredData);
      }

      setFilteredParticipantData(tempFilteredData);
      if (event.target.value && tempFilteredData.length === 0) {
        dispatch({
          type: "searchedNotPresentText",
          payload: "Sorry!! No Participant Found with This Name",
        });
      }
    };

  const handleFilterBarStateOnSelect = (eventKey: string | null) => {
    if (eventKey) {
      dispatch({ type: "selectedRadioForFilterState", payload: eventKey });
      dispatch({ type: "searchedNotPresentText", payload: "" });

      let responseData: OrgProgramParticipantData[] | [] = [];

      if (state.showMentorDetails)
        responseData =
          state.mentorParticipantResponseData as OrgProgramParticipantData[];

      if (state.showStudentDetails)
        responseData =
          state.studentParticipantResponseData as OrgProgramParticipantData[];

      let tempFilteredData: OrgProgramParticipantData[] = [...responseData];

      if (eventKey === "Active")
        tempFilteredData = filterActiveTempFilteredData(tempFilteredData);

      if (eventKey === "Inactive")
        tempFilteredData = filterInActiveTempFilteredData(tempFilteredData);

      setFilteredParticipantData(tempFilteredData);
      if (eventKey && tempFilteredData.length === 0) {
        dispatch({
          type: "searchedNotPresentText",
          payload: "Sorry!! No Participants Found for This Option",
        });
      }
    }
  };

  return (
    <div className="FilterBarContainer">
      <div>
        <Form>
          <Form.Control
            type="search"
            placeholder="Search By Name..."
            className="OrgParticipantSearchFromControl"
            value={state.searchedName}
            onChange={handleSearchBarFormChange}
          />
        </Form>
      </div>
      <div>
        <span className="FilterByText">filter By</span>&nbsp;&nbsp;
        <DropdownButton
          title={`state${
            state.selectedRadioForFilterState !== "All"
              ? ` : ${state.selectedRadioForFilterState}`
              : ""
          }`}
          className="FilterBarStateDropdown"
        >
          <Dropdown.Item eventKey="All" onSelect={handleFilterBarStateOnSelect}>
            None
          </Dropdown.Item>
          <Dropdown.Item
            eventKey="Active"
            onSelect={handleFilterBarStateOnSelect}
          >
            Active
          </Dropdown.Item>
          <Dropdown.Item
            eventKey="Inactive"
            onSelect={handleFilterBarStateOnSelect}
          >
            In-active
          </Dropdown.Item>
        </DropdownButton>
      </div>
    </div>
  );
};

export default OrgProgramParticipantFilterBar;
