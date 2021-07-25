import React, { useCallback, useMemo } from "react";
import {
  GetProgramMetaListData,
  OrgViewSearchProgramActionType,
  OrgViewSearchProgramState,
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
  const filterVirtualProgramList = useMemo(
    () => programsList.filter((program) => program.mode === "Virtual"),
    [programsList]
  );

  const filterVirtualTempFilteredList = useCallback(
    (tempFilteredList: GetProgramMetaListData[]) =>
      tempFilteredList.filter((program) => program.mode === "Virtual"),
    []
  );

  const filterInPersonProgramList = useMemo(
    () => programsList.filter((program) => program.mode === "InPerson"),
    [programsList]
  );

  const filterInPersonTempFilteredList = useCallback(
    (tempFilteredList: GetProgramMetaListData[]) =>
      tempFilteredList.filter((program) => program.mode === "InPerson"),
    []
  );

  const sortDurationInIncreasingByUsing = useCallback(
    (obj1: GetProgramMetaListData, obj2: GetProgramMetaListData) =>
      -(obj1.durationInMonths - obj2.durationInMonths),
    []
  );

  const sortDurationInDecreasingByUsing = useCallback(
    (obj1: GetProgramMetaListData, obj2: GetProgramMetaListData) =>
      obj1.durationInMonths - obj2.durationInMonths,
    []
  );

  const sortDateFromNewToOldByUsing = useCallback(
    (obj1: GetProgramMetaListData, obj2: GetProgramMetaListData) => {
      const [day1, month1, year1] = obj1.tentativeStartDate.split("/");
      const [day2, month2, year2] = obj2.tentativeStartDate.split("/");

      return new Date(parseInt(year1), parseInt(month1) - 1, parseInt(day1)) >
        new Date(parseInt(year2), parseInt(month2) - 1, parseInt(day2))
        ? 1
        : -1;
    },
    []
  );

  const sortDateFromOldToNewByUsing = useCallback(
    (obj1: GetProgramMetaListData, obj2: GetProgramMetaListData) => {
      const [day1, month1, year1] = obj1.tentativeStartDate.split("/");
      const [day2, month2, year2] = obj2.tentativeStartDate.split("/");

      return new Date(parseInt(year1), parseInt(month1) - 1, parseInt(day1)) >
        new Date(parseInt(year2), parseInt(month2) - 1, parseInt(day2))
        ? -1
        : 1;
    },
    []
  );

  const handleSearchedTitleChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      dispatch({ type: "searchedTitle", payload: event.target.value });
      dispatch({ type: "searchedNotPresentText", payload: "" });

      let tempFilteredList = programsList.filter((program) =>
        program.title.toLowerCase().includes(event.target.value.toLowerCase())
      );

      if (state.selectedRadioForFilterMode === "Virtual")
        tempFilteredList = filterVirtualTempFilteredList(tempFilteredList);

      if (state.selectedRadioForFilterMode === "In Person")
        tempFilteredList = filterInPersonTempFilteredList(tempFilteredList);

      if (event.target.value === "" && tempFilteredList.length === 0) {
        tempFilteredList = [...programsList];

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
      dispatch({ type: "searchedNotPresentText", payload: "" });
      dispatch({ type: "searchedTitle", payload: "" });

      if (event.target.value === "All") {
        dispatch({
          type: "selectedRadioForSort",
          payload: event.target.value,
        });
        dispatch({
          type: "selectedRadioForDateSort",
          payload: event.target.value,
        });
      }

      let tempFilteredList: GetProgramMetaListData[] = [...programsList];

      if (state.selectedRadioForFilterMode === "Virtual")
        tempFilteredList = filterVirtualTempFilteredList(tempFilteredList);

      if (state.selectedRadioForFilterMode === "In Person")
        tempFilteredList = filterInPersonTempFilteredList(tempFilteredList);

      if (event.target.value === "Increasing Duration") {
        dispatch({
          type: "selectedRadioForDateSort",
          payload: "All",
        });
        dispatch({
          type: "selectedRadioForSort",
          payload: event.target.value,
        });
        tempFilteredList.sort(sortDurationInIncreasingByUsing);
      }

      if (event.target.value === "Decreasing Duration") {
        dispatch({
          type: "selectedRadioForDateSort",
          payload: "All",
        });
        dispatch({
          type: "selectedRadioForSort",
          payload: event.target.value,
        });
        tempFilteredList.sort(sortDurationInDecreasingByUsing);
      }

      if (event.target.value === "Newest to Oldest Date") {
        dispatch({ type: "selectedRadioForSort", payload: "All" });
        dispatch({
          type: "selectedRadioForDateSort",
          payload: event.target.value,
        });
        tempFilteredList.sort(sortDateFromNewToOldByUsing);
      }

      if (event.target.value === "Oldest to Newest Date") {
        dispatch({ type: "selectedRadioForSort", payload: "All" });
        dispatch({
          type: "selectedRadioForDateSort",
          payload: event.target.value,
        });
        tempFilteredList.sort(sortDateFromOldToNewByUsing);
      }

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
      <div className="OrgFilterBarText">Suggested Programs</div>
      <FilterBarForm
        state={state}
        handleSearchedTitleChange={handleSearchedTitleChange}
        handleSelectChangeForFilterMode={handleSelectChangeForFilterMode}
        handleSelectChangeForSort={handleSelectChangeForSort}
      />
    </div>
  );
};

export default FilterBar;
