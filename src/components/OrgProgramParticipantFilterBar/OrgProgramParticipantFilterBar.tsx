import React, { useCallback } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import {
  OrgProgramParticipantActionType,
  OrgProgramParticipantData,
  OrgProgramParticipantState,
} from "../../types/OrgProgramDetails";

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
  );
};

export default OrgProgramParticipantFilterBar;
