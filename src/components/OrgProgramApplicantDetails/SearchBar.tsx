import React from "react";
import { Form } from "react-bootstrap";

import {
  OrgProgramApplicantActionType,
  OrgProgramApplicantData,
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

      const response = state.responseData as OrgProgramApplicantData[];
      let tempFilteredData = response.filter(
        (data) =>
          data.name.toLowerCase().includes(event.target.value.toLowerCase()) ||
          data.email.toLowerCase().includes(event.target.value.toLowerCase())
      );

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

      if (state.selectedDropdownForSortDoA === "Latest")
        tempFilteredData.sort(values.sortDateByLatestUsing);

      if (state.selectedDropdownForSortDoA === "Oldest")
        tempFilteredData.sort(values.sortDateByOldestUsing);

      if (event.target.value === "" && tempFilteredData.length === 0) {
        tempFilteredData = [...response];

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

        if (state.selectedDropdownForSortDoA === "Latest")
          tempFilteredData.sort(values.sortDateByLatestUsing);

        if (state.selectedDropdownForSortDoA === "Oldest")
          tempFilteredData.sort(values.sortDateByOldestUsing);
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
          placeholder="Search By Name or Email..."
          className="OrgProgramApplicantSearchFormControl"
          value={state.searchedName}
          onChange={handleSearchBarFormChange}
        />
      </Form>
    </div>
  );
};

export default SearchBar;
