import React from "react";
import { Form } from "react-bootstrap";
import {
  OrgInvitationDetailsData,
  OrgProgramInvitationActionType,
  OrgProgramInvitationState,
} from "../../types/OrgProgramDetails";

type SearchBarProps = {
  fakeData: OrgInvitationDetailsData[];
  state: OrgProgramInvitationState;
  dispatch: React.Dispatch<OrgProgramInvitationActionType>;
  setFilteredFakeData: React.Dispatch<
    React.SetStateAction<OrgInvitationDetailsData[]>
  >;
  filterAcceptedTempFilteredData: (
    tempFilteredData: OrgInvitationDetailsData[]
  ) => OrgInvitationDetailsData[];
  filterPendingTempFilteredData: (
    tempFilteredData: OrgInvitationDetailsData[]
  ) => OrgInvitationDetailsData[];
  filterMentorTempFilteredData: (
    tempFilteredData: OrgInvitationDetailsData[]
  ) => OrgInvitationDetailsData[];
  filterStudentTempFilteredData: (
    tempFilteredData: OrgInvitationDetailsData[]
  ) => OrgInvitationDetailsData[];
  sortDateByLatestUsing: (
    obj1: OrgInvitationDetailsData,
    obj2: OrgInvitationDetailsData
  ) => 1 | -1;
  sortDateByOldestUsing: (
    obj1: OrgInvitationDetailsData,
    obj2: OrgInvitationDetailsData
  ) => 1 | -1;
};

const SearchBar = ({
  fakeData,
  state,
  dispatch,
  setFilteredFakeData,
  filterAcceptedTempFilteredData,
  filterPendingTempFilteredData,
  filterMentorTempFilteredData,
  filterStudentTempFilteredData,
  sortDateByLatestUsing,
  sortDateByOldestUsing,
}: SearchBarProps) => {
  const handleSearchBarFormChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      dispatch({ type: "searchedName", payload: event.target.value });
      dispatch({ type: "searchedNotPresentText", payload: "" });

      let tempFilteredData = fakeData.filter(
        (data) => data.name.toLowerCase() === event.target.value
      );

      if (state.selectedRadioForFilter === "Accepted")
        tempFilteredData = filterAcceptedTempFilteredData(tempFilteredData);

      if (state.selectedRadioForFilter === "Pending")
        tempFilteredData = filterPendingTempFilteredData(tempFilteredData);

      if (state.selectedRadioForFilterType === "Mentor")
        tempFilteredData = filterMentorTempFilteredData(tempFilteredData);

      if (state.selectedRadioForFilterType === "Student")
        tempFilteredData = filterStudentTempFilteredData(tempFilteredData);

      if (state.selectedRadioForSort === "Latest")
        tempFilteredData.sort(sortDateByLatestUsing);

      if (state.selectedRadioForSort === "Oldest")
        tempFilteredData.sort(sortDateByOldestUsing);

      if (event.target.value === "" && tempFilteredData.length === 0) {
        tempFilteredData = [...fakeData];

        if (state.selectedRadioForFilter === "Accepted")
          tempFilteredData = filterAcceptedTempFilteredData(tempFilteredData);

        if (state.selectedRadioForFilter === "Pending")
          tempFilteredData = filterPendingTempFilteredData(tempFilteredData);

        if (state.selectedRadioForFilterType === "Mentor")
          tempFilteredData = filterMentorTempFilteredData(tempFilteredData);

        if (state.selectedRadioForFilterType === "Student")
          tempFilteredData = filterStudentTempFilteredData(tempFilteredData);

        if (state.selectedRadioForSort === "Latest")
          tempFilteredData.sort(sortDateByLatestUsing);

        if (state.selectedRadioForSort === "Oldest")
          tempFilteredData.sort(sortDateByOldestUsing);
      }

      setFilteredFakeData(tempFilteredData);

      if (event.target.value && tempFilteredData.length === 0) {
        dispatch({
          type: "searchedNotPresentText",
          payload: "Sorry!! No Invitation Found With This Name",
        });
      }
    };

  return (
    <div className="OrgInvitationSearchBar">
      <Form>
        <Form.Control
          type="search"
          placeholder="Search By Name..."
          className="OrgInvitationSearchFromControl"
          value={state.searchedName}
          onChange={handleSearchBarFormChange}
        />
      </Form>
    </div>
  );
};

export default SearchBar;
