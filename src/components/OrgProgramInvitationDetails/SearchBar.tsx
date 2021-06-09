import React from "react";
import { Form } from "react-bootstrap";
import {
  OrgInvitationResponseData,
  OrgProgramInvitationActionType,
  OrgProgramInvitationState,
} from "../../types/OrgProgramDetails";

type SearchBarProps = {
  state: OrgProgramInvitationState;
  dispatch: React.Dispatch<OrgProgramInvitationActionType>;
  setFilteredResponseData: React.Dispatch<
    React.SetStateAction<OrgInvitationResponseData[]>
  >;
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

const SearchBar = ({
  state,
  dispatch,
  setFilteredResponseData,
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

      const responseData = state.responseData as OrgInvitationResponseData[];

      let tempFilteredData = responseData.filter(
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
        tempFilteredData = [...responseData];

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

      setFilteredResponseData(tempFilteredData);

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
