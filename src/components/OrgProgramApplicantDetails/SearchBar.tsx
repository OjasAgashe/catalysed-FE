import React from "react";
import { Form } from "react-bootstrap";

import {
  OrgProgramApplicantActionType,
  OrgProgramApplicantState,
  OrgProgramApplicantValues,
} from "../../types/OrgProgramDetails";

type SearchBarProps = {
  state: OrgProgramApplicantState;
  dispatch: React.Dispatch<OrgProgramApplicantActionType>;
  values: OrgProgramApplicantValues;
};

const SearchBar = ({ state, dispatch, values }: SearchBarProps) => {
  const handleSearchBarFormChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      dispatch({ type: "searchedName", payload: event.target.value });
      dispatch({ type: "searchedNotPresentText", payload: "" });

      let tempFilteredData = state.fakeData.filter((data) =>
        data.name.toLowerCase().startsWith(event.target.value.toLowerCase())
      );

      if (state.selectedDropdownForFilterStatus === "Accepted")
        tempFilteredData =
          values.filterAcceptedTempFilteredData(tempFilteredData);

      if (state.selectedDropdownForFilterStatus === "Pending")
        tempFilteredData =
          values.filterPendingTempFilteredData(tempFilteredData);

      if (state.selectedDropdownForFilterStatus === "Rejected")
        tempFilteredData =
          values.filterRejectedTempFilteredData(tempFilteredData);

      if (state.selectedDropdownForFilterViewed === "Yes")
        tempFilteredData =
          values.filterViewedTempFilteredData(tempFilteredData);

      if (state.selectedDropdownForFilterViewed === "No")
        tempFilteredData =
          values.filterNotViewedTempFilteredData(tempFilteredData);

      if (event.target.value === "" && tempFilteredData.length === 0) {
        tempFilteredData = [...state.fakeData];

        if (state.selectedDropdownForFilterStatus === "Accepted")
          tempFilteredData =
            values.filterAcceptedTempFilteredData(tempFilteredData);

        if (state.selectedDropdownForFilterStatus === "Pending")
          tempFilteredData =
            values.filterPendingTempFilteredData(tempFilteredData);

        if (state.selectedDropdownForFilterStatus === "Rejected")
          tempFilteredData =
            values.filterRejectedTempFilteredData(tempFilteredData);

        if (state.selectedDropdownForFilterViewed === "Yes")
          tempFilteredData =
            values.filterViewedTempFilteredData(tempFilteredData);

        if (state.selectedDropdownForFilterViewed === "No")
          tempFilteredData =
            values.filterNotViewedTempFilteredData(tempFilteredData);
      }

      values.setFilteredResponseData(tempFilteredData);

      if (event.target.value && tempFilteredData.length === 0) {
        dispatch({
          type: "searchedNotPresentText",
          payload: "Sorry!! No Applicant Found With This Name",
        });
      }
    };

  return (
    <div className="OrgProgramApplicantSearchBar">
      <Form>
        <Form.Control
          type="search"
          placeholder="Search By Name..."
          className="OrgProgramApplicantSearchFormControl"
          value={state.searchedName}
          onChange={handleSearchBarFormChange}
        />
      </Form>
    </div>
  );
};

export default SearchBar;
