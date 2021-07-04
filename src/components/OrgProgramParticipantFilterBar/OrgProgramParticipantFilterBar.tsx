import React from "react";
import { Form } from "react-bootstrap";
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
          (firstName.toLowerCase() + " " + lastName.toLowerCase()).includes(
            event.target.value.toLowerCase()
          ) ||
          data.email.toLowerCase().includes(event.target.value.toLowerCase())
        );
      });

      setFilteredParticipantData(tempFilteredData);
      if (event.target.value && tempFilteredData.length === 0) {
        dispatch({
          type: "searchedNotPresentText",
          payload: "Sorry!! No Participant Found with This Name",
        });
      }
    };

  return (
    <div className="FilterBarContainer">
      <div>
        <Form>
          <Form.Control
            type="search"
            placeholder="Search By Name or Email..."
            className="OrgParticipantSearchFromControl"
            value={state.searchedName}
            onChange={handleSearchBarFormChange}
          />
        </Form>
      </div>
    </div>
  );
};

export default OrgProgramParticipantFilterBar;
