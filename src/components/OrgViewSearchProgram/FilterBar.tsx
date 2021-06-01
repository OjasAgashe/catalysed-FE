import React from "react";
import {
  GetProgramMetaListData,
  OrgViewSearchProgramState,
  OrgViewSearchProgramActionType,
} from "../../types/OrgViewSearchProgram";
import FilterBarForm from "./FilterBarForm";

type FilterBarProps = {
  state: OrgViewSearchProgramState;
  dispatch: React.Dispatch<OrgViewSearchProgramActionType>;
  programsList: GetProgramMetaListData[];
  setFilteredProgramsList: React.Dispatch<
    React.SetStateAction<GetProgramMetaListData[]>
  >;
};

const FilterBar = ({
  state,
  dispatch,
  programsList,
  setFilteredProgramsList,
}: FilterBarProps) => {
  const filterPublishedProgramList = programsList.filter(
    (program) => program.status === "PUBLISHED"
  );

  const filterPublishedTempFilteredList = (
    tempFilteredList: GetProgramMetaListData[]
  ) => {
    return tempFilteredList.filter((program) => program.status === "PUBLISHED");
  };

  const filterInDraftProgramList = programsList.filter(
    (program) => program.status === "SAVED_TO_DRAFT"
  );

  const filterInDraftTempFilteredList = (
    tempFilteredList: GetProgramMetaListData[]
  ) => {
    return tempFilteredList.filter(
      (program) => program.status === "SAVED_TO_DRAFT"
    );
  };

  const filterVirtualProgramList = programsList.filter(
    (program) => program.mode === "Virtual"
  );

  const filterVirtualTempFilteredList = (
    tempFilteredList: GetProgramMetaListData[]
  ) => {
    return tempFilteredList.filter((program) => program.mode === "Virtual");
  };

  const filterInPersonProgramList = programsList.filter(
    (program) => program.mode === "InPerson"
  );

  const filterInPersonTempFilteredList = (
    tempFilteredList: GetProgramMetaListData[]
  ) => {
    return tempFilteredList.filter((program) => program.mode === "InPerson");
  };

  const sortDurationInIncreasingByUsing = (
    obj1: GetProgramMetaListData,
    obj2: GetProgramMetaListData
  ) => -(obj1.durationInMonths - obj2.durationInMonths);

  const sortDurationInDecreasingByUsing = (
    obj1: GetProgramMetaListData,
    obj2: GetProgramMetaListData
  ) => obj1.durationInMonths - obj2.durationInMonths;

  const sortDateFromNewToOldByUsing = (
    obj1: GetProgramMetaListData,
    obj2: GetProgramMetaListData
  ) => {
    const [day1, month1, year1] = obj1.tentativeStartDate.split("/");
    const [day2, month2, year2] = obj2.tentativeStartDate.split("/");

    return new Date(parseInt(year1), parseInt(month1) - 1, parseInt(day1)) >
      new Date(parseInt(year2), parseInt(month2) - 1, parseInt(day2))
      ? 1
      : -1;
  };

  const sortDateFromOldToNewByUsing = (
    obj1: GetProgramMetaListData,
    obj2: GetProgramMetaListData
  ) => {
    const [day1, month1, year1] = obj1.tentativeStartDate.split("/");
    const [day2, month2, year2] = obj2.tentativeStartDate.split("/");

    return new Date(parseInt(year1), parseInt(month1) - 1, parseInt(day1)) >
      new Date(parseInt(year2), parseInt(month2) - 1, parseInt(day2))
      ? -1
      : 1;
  };

  const handleSearchedTitleChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      dispatch({ type: "searchedTitle", payload: event.target.value });
      dispatch({ type: "searchedNotPresentText", payload: "" });

      let tempFilteredList = programsList.filter(
        (program) =>
          program.title.toLowerCase() === event.target.value.toLowerCase()
      );

      if (state.selectedRadioForFilter === "Published")
        tempFilteredList = filterPublishedTempFilteredList(tempFilteredList);

      if (state.selectedRadioForFilter === "In Draft")
        tempFilteredList = filterInDraftTempFilteredList(tempFilteredList);

      if (state.selectedRadioForFilterMode === "Virtual")
        tempFilteredList = filterVirtualTempFilteredList(tempFilteredList);

      if (state.selectedRadioForFilterMode === "In Person")
        tempFilteredList = filterInPersonTempFilteredList(tempFilteredList);

      if (event.target.value === "" && tempFilteredList.length === 0) {
        tempFilteredList = [...programsList];

        if (state.selectedRadioForFilter === "Published")
          tempFilteredList = filterPublishedTempFilteredList(tempFilteredList);

        if (state.selectedRadioForFilter === "In Draft")
          tempFilteredList = filterInDraftTempFilteredList(tempFilteredList);

        if (state.selectedRadioForFilterMode === "Virtual")
          tempFilteredList = filterVirtualTempFilteredList(tempFilteredList);

        if (state.selectedRadioForFilterMode === "In Person")
          tempFilteredList = filterInPersonTempFilteredList(tempFilteredList);

        if (state.selectedRadioForSort === "Increasing Duration")
          tempFilteredList.sort(sortDurationInIncreasingByUsing);

        if (state.selectedRadioForSort === "Decreasing Duration")
          tempFilteredList.sort(sortDurationInDecreasingByUsing);

        if (state.selectedRadioForSort === "Newest to Oldest Date")
          tempFilteredList.sort(sortDateFromNewToOldByUsing);

        if (state.selectedRadioForSort === "Oldest to Newest Date")
          tempFilteredList.sort(sortDateFromOldToNewByUsing);
      }

      setFilteredProgramsList(tempFilteredList);

      if (event.target.value && tempFilteredList.length === 0) {
        dispatch({
          type: "searchedNotPresentText",
          payload: "Sorry!! Programs With This Title Not Found",
        });
      }
    };

  const handleSelectChangeForFilter: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      dispatch({ type: "selectedRadioForFilter", payload: event.target.value });
      dispatch({ type: "selectedRadioForSort", payload: "All" });
      dispatch({ type: "searchedNotPresentText", payload: "" });
      dispatch({ type: "searchedTitle", payload: "" });

      let tempFilteredList: GetProgramMetaListData[] = [...programsList];

      if (event.target.value === "Published")
        tempFilteredList = filterPublishedProgramList;

      if (event.target.value === "In Draft")
        tempFilteredList = filterInDraftProgramList;

      if (state.selectedRadioForFilterMode === "Virtual")
        tempFilteredList = filterVirtualTempFilteredList(tempFilteredList);

      if (state.selectedRadioForFilterMode === "In Person")
        tempFilteredList = filterInPersonTempFilteredList(tempFilteredList);

      setFilteredProgramsList(tempFilteredList);
      if (event.target.value && tempFilteredList.length === 0) {
        dispatch({
          type: "searchedNotPresentText",
          payload: "Sorry!! Programs For This Option Not Found",
        });
      }
    };

  const handleSelectChangeForFilterMode: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      dispatch({
        type: "selectedRadioForFilterMode",
        payload: event.target.value,
      });
      dispatch({ type: "selectedRadioForSort", payload: "All" });
      dispatch({ type: "searchedNotPresentText", payload: "" });
      dispatch({ type: "searchedTitle", payload: "" });

      let tempFilteredList: GetProgramMetaListData[] = [...programsList];

      if (event.target.value === "Virtual")
        tempFilteredList = filterVirtualProgramList;

      if (event.target.value === "In Person")
        tempFilteredList = filterInPersonProgramList;

      if (state.selectedRadioForFilter === "Published")
        tempFilteredList = filterPublishedTempFilteredList(tempFilteredList);

      if (state.selectedRadioForFilter === "In Draft")
        tempFilteredList = filterInDraftTempFilteredList(tempFilteredList);

      setFilteredProgramsList(tempFilteredList);
      if (event.target.value && tempFilteredList.length === 0) {
        dispatch({
          type: "searchedNotPresentText",
          payload: "Sorry!! Programs For This Option Not Found",
        });
      }
    };

  const handleSelectChangeForSort: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      dispatch({ type: "selectedRadioForSort", payload: event.target.value });
      dispatch({ type: "searchedNotPresentText", payload: "" });
      dispatch({ type: "searchedTitle", payload: "" });

      let tempFilteredList: GetProgramMetaListData[] = [...programsList];

      if (state.selectedRadioForFilter === "Published")
        tempFilteredList = filterPublishedTempFilteredList(tempFilteredList);

      if (state.selectedRadioForFilter === "In Draft")
        tempFilteredList = filterInDraftTempFilteredList(tempFilteredList);

      if (state.selectedRadioForFilterMode === "Virtual")
        tempFilteredList = filterVirtualTempFilteredList(tempFilteredList);

      if (state.selectedRadioForFilterMode === "In Person")
        tempFilteredList = filterInPersonTempFilteredList(tempFilteredList);

      if (event.target.value === "Increasing Duration")
        tempFilteredList.sort(sortDurationInIncreasingByUsing);

      if (event.target.value === "Decreasing Duration")
        tempFilteredList.sort(sortDurationInDecreasingByUsing);

      if (event.target.value === "Newest to Oldest Date")
        tempFilteredList.sort(sortDateFromNewToOldByUsing);

      if (event.target.value === "Oldest to Newest Date")
        tempFilteredList.sort(sortDateFromOldToNewByUsing);

      setFilteredProgramsList(tempFilteredList);
      if (event.target.value && tempFilteredList.length === 0) {
        dispatch({
          type: "searchedNotPresentText",
          payload: "Sorry!! Programs For This Option Not Found",
        });
      }
    };

  return (
    <div>
      <div className="OrgFilterBarText">View &amp; Search</div>
      <FilterBarForm
        state={state}
        handleSearchedTitleChange={handleSearchedTitleChange}
        handleSelectChangeForFilter={handleSelectChangeForFilter}
        handleSelectChangeForFilterMode={handleSelectChangeForFilterMode}
        handleSelectChangeForSort={handleSelectChangeForSort}
      />
    </div>
  );
};

export default FilterBar;
