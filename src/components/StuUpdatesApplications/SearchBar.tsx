import React from "react";
import { Form } from "react-bootstrap";
import {
  StudentUpdatesCommonActionType,
  StudentUpdatesCommonResponse,
  StudentUpdatesCommonState,
  StudentUpdatesCommonValues,
} from "../../types/StudentUpdates";

type SearchBarProps = {
  state: StudentUpdatesCommonState;
  dispatch: React.Dispatch<StudentUpdatesCommonActionType>;
  values: StudentUpdatesCommonValues;
};

const SearchBar = ({ state, dispatch, values }: SearchBarProps) => {
  const handleSearchBarFormChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      dispatch({ type: "searchedName", payload: event.target.value });
      dispatch({ type: "searchedNameNotFound", payload: "" });

      const responseData = state.responseData as StudentUpdatesCommonResponse[];

      let tempFilteredData = responseData.filter((data) =>
        data.programName
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
      );

      if (state.selectedRadioForFilter === "Approved")
        tempFilteredData =
          values.filterApprovedTempFilteredData(tempFilteredData);

      if (state.selectedRadioForFilter === "Pending")
        tempFilteredData =
          values.filterPendingTempFilteredData(tempFilteredData);

      if (state.selectedRadioForFilter === "Rejected")
        tempFilteredData =
          values.filterRejectedTempFilteredData(tempFilteredData);

      if (state.selectedRadioForSort === "Latest")
        tempFilteredData.sort(values.sortDateByLatestUsing);

      if (state.selectedRadioForSort === "Oldest")
        tempFilteredData.sort(values.sortDateByOldestUsing);

      if (event.target.value === "" && tempFilteredData.length === 0) {
        tempFilteredData = [...responseData];

        if (state.selectedRadioForFilter === "Approved")
          tempFilteredData =
            values.filterApprovedTempFilteredData(tempFilteredData);

        if (state.selectedRadioForFilter === "Pending")
          tempFilteredData =
            values.filterPendingTempFilteredData(tempFilteredData);

        if (state.selectedRadioForFilter === "Rejected")
          tempFilteredData =
            values.filterRejectedTempFilteredData(tempFilteredData);

        if (state.selectedRadioForSort === "Latest")
          tempFilteredData.sort(values.sortDateByLatestUsing);

        if (state.selectedRadioForSort === "Oldest")
          tempFilteredData.sort(values.sortDateByOldestUsing);
      }

      dispatch({ type: "filteredResponseData", payload: tempFilteredData });

      if (event.target.value && tempFilteredData.length === 0) {
        dispatch({
          type: "searchedNameNotFound",
          payload: "Sorry!! No Program Found With This Name",
        });
      }
    };

  return (
    <div className="StuUpdatesApplicationsSearchBar">
      <Form>
        <Form.Control
          type="search"
          placeholder="Search By Program Name..."
          className="StuUpdatesApplicationsSearchFormControl"
          value={state.searchedName}
          onChange={handleSearchBarFormChange}
        />
      </Form>
    </div>
  );
};

export default SearchBar;
