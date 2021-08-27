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
  /*
   * Function to handle the changes done in search input field
   */
  const handleSearchBarFormChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      // Store the searchedName in state.searchedName
      dispatch({ type: "searchedName", payload: event.target.value });

      // If previously, we have shown any error then hide it
      dispatch({ type: "searchedNotPresentText", payload: "" });

      let responseData: OrgProgramParticipantData[] | [] = [];

      if (state.showMentorDetails)
        /*
         * If currently we are showing Mentor Details, then store
         * mentor Data in responseData.
         *
         * From which we will filter
         */
        responseData =
          state.mentorParticipantResponseData as OrgProgramParticipantData[];

      if (state.showStudentDetails)
        /*
         * If currently we are showing Student Details, then store
         * student Data in responseData.
         *
         * And then we will filter
         */
        responseData =
          state.studentParticipantResponseData as OrgProgramParticipantData[];

      /*
       * Filter the data based on Name or Email
       */
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

      // Store the filteredData
      setFilteredParticipantData(tempFilteredData);

      // If there is nothing in filteredData then show the Error
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
