import React, { useCallback, useMemo } from "react";
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
  // Storing today's Date
  const todaysFullDate = useMemo(() => {
    const currDate = new Date(Date.now());
    return {
      todaysDay: currDate.getDate(),
      todaysMonth: currDate.getMonth(),
      todaysYear: currDate.getFullYear(),
    };
  }, []);

  // Filter Programs starting this month using this helper function
  const filterStartingThisMonthByUsing = useCallback(
    (program: GetProgramMetaListData) => {
      const [progDay, progMonth, progYear] =
        program.tentativeStartDate.split("/");

      if (
        program.status === "PUBLISHED" &&
        parseInt(progMonth) - 1 === todaysFullDate.todaysMonth
      )
        return (
          new Date(
            parseInt(progYear),
            parseInt(progMonth) - 1,
            parseInt(progDay)
          ) >
          new Date(
            todaysFullDate.todaysYear,
            todaysFullDate.todaysMonth,
            todaysFullDate.todaysDay
          )
        );

      return false;
    },
    [
      todaysFullDate.todaysDay,
      todaysFullDate.todaysMonth,
      todaysFullDate.todaysYear,
    ]
  );

  // Filter OnGoing programs using this helper function
  const filterOnGoingByUsing = useCallback(
    (program: GetProgramMetaListData) => {
      const [progDay, progMonth, progYear] =
        program.tentativeStartDate.split("/");

      if (program.status === "PUBLISHED")
        return (
          new Date(
            parseInt(progYear),
            parseInt(progMonth) - 1,
            parseInt(progDay)
          ) <
          new Date(
            todaysFullDate.todaysYear,
            todaysFullDate.todaysMonth,
            todaysFullDate.todaysDay
          )
        );

      return false;
    },
    [
      todaysFullDate.todaysDay,
      todaysFullDate.todaysMonth,
      todaysFullDate.todaysYear,
    ]
  );

  // Filter Programs starting this month from whole program list
  const filterStartingThisMonthProgramList = useMemo(
    () => programsList.filter(filterStartingThisMonthByUsing),
    [filterStartingThisMonthByUsing, programsList]
  );

  // Filter Programs starting this month from tempFilteredList
  const filterStartingThisMonthTempFilteredList = useCallback(
    (tempFilteredList: GetProgramMetaListData[]) =>
      tempFilteredList.filter(filterStartingThisMonthByUsing),
    [filterStartingThisMonthByUsing]
  );

  // Filter OnGoing programs from whole program list
  const filterOnGoingProgramList = useMemo(
    () => programsList.filter(filterOnGoingByUsing),
    [filterOnGoingByUsing, programsList]
  );

  // Filter onGoing programs from tempFilteredList
  const filterOnGoingTempFilteredList = useCallback(
    (tempFilteredList: GetProgramMetaListData[]) =>
      tempFilteredList.filter(filterOnGoingByUsing),
    [filterOnGoingByUsing]
  );

  // Filter Published programs from whole program list
  const filterPublishedProgramList = useMemo(
    () => programsList.filter((program) => program.status === "PUBLISHED"),
    [programsList]
  );

  // Filter Published programs from tempFilteredList
  const filterPublishedTempFilteredList = useCallback(
    (tempFilteredList: GetProgramMetaListData[]) =>
      tempFilteredList.filter((program) => program.status === "PUBLISHED"),
    []
  );

  // Filter Draft programs from whole program list
  const filterInDraftProgramList = useMemo(
    () => programsList.filter((program) => program.status === "SAVED_TO_DRAFT"),
    [programsList]
  );

  // Filter Draft programs from tempFilteredList
  const filterInDraftTempFilteredList = useCallback(
    (tempFilteredList: GetProgramMetaListData[]) =>
      tempFilteredList.filter((program) => program.status === "SAVED_TO_DRAFT"),
    []
  );

  // Filter Virtual mode programs from whole program list
  const filterVirtualProgramList = useMemo(
    () => programsList.filter((program) => program.mode === "Virtual"),
    [programsList]
  );

  // Filter Virtual mode programs from tempFilteredList
  const filterVirtualTempFilteredList = useCallback(
    (tempFilteredList: GetProgramMetaListData[]) =>
      tempFilteredList.filter((program) => program.mode === "Virtual"),
    []
  );

  // Filter InPerson mode programs from whole program list
  const filterInPersonProgramList = useMemo(
    () => programsList.filter((program) => program.mode === "InPerson"),
    [programsList]
  );

  // Filter InPerson mode programs from tempFilteredList
  const filterInPersonTempFilteredList = useCallback(
    (tempFilteredList: GetProgramMetaListData[]) =>
      tempFilteredList.filter((program) => program.mode === "InPerson"),
    []
  );

  // Function used to sort the Duration in Increasing Order
  const sortDurationInIncreasingByUsing = useCallback(
    (obj1: GetProgramMetaListData, obj2: GetProgramMetaListData) =>
      -(obj1.durationInMonths - obj2.durationInMonths),
    []
  );

  // Function used to sort the Duration in Decreasing Order
  const sortDurationInDecreasingByUsing = useCallback(
    (obj1: GetProgramMetaListData, obj2: GetProgramMetaListData) =>
      obj1.durationInMonths - obj2.durationInMonths,
    []
  );

  // Function used to sort the Date from New to Old
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

  // Function used to sort the Date from Old to New
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
      /*
       * Store the value of searched title in searchedTitle
       */
      dispatch({ type: "searchedTitle", payload: event.target.value });

      /*
       * If previously, we have shown any error then hide it
       */
      dispatch({ type: "searchedNotPresentText", payload: "" });

      /*
       * If there is any title for which user has searched then filter
       * according to that value. And store the filtered list in
       * tempFilteredList
       */
      let tempFilteredList = programsList.filter((program) =>
        program.title.toLowerCase().includes(event.target.value.toLowerCase())
      );

      /*
       * If the state.selectedRadioForFilter has "Published" or "In Draft"
       * value then filter according to that value
       */
      if (state.selectedRadioForFilter === "Published")
        tempFilteredList = filterPublishedTempFilteredList(tempFilteredList);

      if (state.selectedRadioForFilter === "In Draft")
        tempFilteredList = filterInDraftTempFilteredList(tempFilteredList);

      /*
       * If the state.selectedRadioForFilterMode has "Virtual" or "In Person"
       * value then filter according to that value
       */
      if (state.selectedRadioForFilterMode === "Virtual")
        tempFilteredList = filterVirtualTempFilteredList(tempFilteredList);

      if (state.selectedRadioForFilterMode === "In Person")
        tempFilteredList = filterInPersonTempFilteredList(tempFilteredList);

      /*
       * If the state.selectedRadioForFilterCategory has "Starting this Month" or
       * "On Going" value then filter according to the value
       */
      if (state.selectedRadioForFilterCategory === "Starting this Month")
        tempFilteredList =
          filterStartingThisMonthTempFilteredList(tempFilteredList);

      if (state.selectedRadioForFilterCategory === "On Going")
        tempFilteredList = filterOnGoingTempFilteredList(tempFilteredList);

      /*
       * If after searching for a title, user manually erase the value from the
       * search Input Bar, then filter according to all the previous choosed filter
       * option and If there are any choosed sort option then sort according to that
       */
      if (event.target.value === "" && tempFilteredList.length === 0) {
        // first store the whole program list in tempFilteredList
        tempFilteredList = [...programsList];

        /*
         * If the state.selectedRadioForFilter has "Published" or "In Draft"
         * value then filter according to that value
         */
        if (state.selectedRadioForFilter === "Published")
          tempFilteredList = filterPublishedTempFilteredList(tempFilteredList);

        if (state.selectedRadioForFilter === "In Draft")
          tempFilteredList = filterInDraftTempFilteredList(tempFilteredList);

        /*
         * If the state.selectedRadioForFilterMode has "Virtual" or "In Person"
         * value then filter according to that value
         */
        if (state.selectedRadioForFilterMode === "Virtual")
          tempFilteredList = filterVirtualTempFilteredList(tempFilteredList);

        if (state.selectedRadioForFilterMode === "In Person")
          tempFilteredList = filterInPersonTempFilteredList(tempFilteredList);

        /*
         * If the state.selectedRadioForFilterCategory has "Starting this Month" or
         * "On Going" value then filter according to the value
         */
        if (state.selectedRadioForFilterCategory === "Starting this Month")
          tempFilteredList =
            filterStartingThisMonthTempFilteredList(tempFilteredList);

        if (state.selectedRadioForFilterCategory === "On Going")
          tempFilteredList = filterOnGoingTempFilteredList(tempFilteredList);

        /*
         * If the state.selectedRadioForSort has "Increasing Duration", or
         * "Decreasing Duration", or "Newest to Oldest Date", or "Oldest to Newest Date"
         * value then sort according to the value
         */
        if (state.selectedRadioForSort === "Increasing Duration")
          tempFilteredList.sort(sortDurationInIncreasingByUsing);

        if (state.selectedRadioForSort === "Decreasing Duration")
          tempFilteredList.sort(sortDurationInDecreasingByUsing);

        if (state.selectedRadioForSort === "Newest to Oldest Date")
          tempFilteredList.sort(sortDateFromNewToOldByUsing);

        if (state.selectedRadioForSort === "Oldest to Newest Date")
          tempFilteredList.sort(sortDateFromOldToNewByUsing);
      }

      // Store the filtered list in filteredProgramsList
      setFilteredProgramsList(tempFilteredList);

      /*
       * If we do not get any programs in filtered list then
       * show an error message
       */
      if (event.target.value && tempFilteredList.length === 0) {
        dispatch({
          type: "searchedNotPresentText",
          payload: "Sorry!! Programs With This Title Not Found",
        });
      }
    };

  const handleSelectChangeForFilter: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      /*
       * store the selected option in selectedRadioForFilter
       */
      dispatch({ type: "selectedRadioForFilter", payload: event.target.value });

      /*
       * If already the user have selected an option to sort, then
       * set it to None
       */
      dispatch({ type: "selectedRadioForSort", payload: "All" });

      /*
       * If previously, we have shown any error then hide it
       */
      dispatch({ type: "searchedNotPresentText", payload: "" });

      /*
       * If there is any title value typed to search then erase it
       */
      dispatch({ type: "searchedTitle", payload: "" });

      // Store the whole programs list in tempFilteredList
      let tempFilteredList: GetProgramMetaListData[] = [...programsList];

      /*
       * If the selected option is "Published" or "In Draft" then
       * filter accordingly
       */
      if (event.target.value === "Published")
        tempFilteredList = filterPublishedProgramList;

      if (event.target.value === "In Draft")
        tempFilteredList = filterInDraftProgramList;

      /*
       * If the state.selectedRadioForFilterCategory has "Starting this Month" or
       * "On Going" value then filter according to that value
       */
      if (state.selectedRadioForFilterCategory === "Starting this Month")
        tempFilteredList =
          filterStartingThisMonthTempFilteredList(tempFilteredList);

      if (state.selectedRadioForFilterCategory === "On Going")
        tempFilteredList = filterOnGoingTempFilteredList(tempFilteredList);

      /*
       * If the state.selectedRadioForFilterMode has "Virtual" or "In Person"
       * value then filter according to that value
       */
      if (state.selectedRadioForFilterMode === "Virtual")
        tempFilteredList = filterVirtualTempFilteredList(tempFilteredList);

      if (state.selectedRadioForFilterMode === "In Person")
        tempFilteredList = filterInPersonTempFilteredList(tempFilteredList);

      // Store the filtered list in filteredProgramsList
      setFilteredProgramsList(tempFilteredList);

      /*
       * If we do not get any programs in filtered list then
       * show an error message
       */
      if (event.target.value && tempFilteredList.length === 0) {
        dispatch({
          type: "searchedNotPresentText",
          payload: "Sorry!! Programs For This Option Not Found",
        });
      }
    };

  /*
   * Function to handle filter By Mode option
   */
  const handleSelectChangeForFilterMode: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      /*
       * store the selected option in selectedRadioForFilterMode
       */
      dispatch({
        type: "selectedRadioForFilterMode",
        payload: event.target.value,
      });

      /*
       * If already the user have selected an option to sort, then
       * set it to None
       */
      dispatch({ type: "selectedRadioForSort", payload: "All" });

      /*
       * If previously, we have shown any error then hide it
       */
      dispatch({ type: "searchedNotPresentText", payload: "" });

      /*
       * If there is any title value typed to search then erase it
       */
      dispatch({ type: "searchedTitle", payload: "" });

      // Store the whole programs list in tempFilteredList
      let tempFilteredList: GetProgramMetaListData[] = [...programsList];

      /*
       * If the selected option is "Virtual" or "In Person" then filter
       * accordingly
       */
      if (event.target.value === "Virtual")
        tempFilteredList = filterVirtualProgramList;

      if (event.target.value === "In Person")
        tempFilteredList = filterInPersonProgramList;

      /*
       * If the state.selectedRadioForFilterCategory has "Starting this Month"
       * or "On Going" value then filter according to that value
       */
      if (state.selectedRadioForFilterCategory === "Starting this Month")
        tempFilteredList =
          filterStartingThisMonthTempFilteredList(tempFilteredList);

      if (state.selectedRadioForFilterCategory === "On Going")
        tempFilteredList = filterOnGoingTempFilteredList(tempFilteredList);

      /*
       * If the state.selectedRadioForFilter has "Published" or "In Draft"
       * value then filter according to that value
       */
      if (state.selectedRadioForFilter === "Published")
        tempFilteredList = filterPublishedTempFilteredList(tempFilteredList);

      if (state.selectedRadioForFilter === "In Draft")
        tempFilteredList = filterInDraftTempFilteredList(tempFilteredList);

      // Store the filtered list in filteredProgramsList
      setFilteredProgramsList(tempFilteredList);

      /*
       * If we do not get any programs in filtered list then
       * show an error message
       */
      if (event.target.value && tempFilteredList.length === 0) {
        dispatch({
          type: "searchedNotPresentText",
          payload: "Sorry!! Programs For This Option Not Found",
        });
      }
    };

  /*
   * Function to handle filter By Category option
   */
  const handleSelectChangeForFilterCategory: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      /*
       * store the selected option in selectedRadioForFilterCategory
       */
      dispatch({
        type: "selectedRadioForFilterCategory",
        payload: event.target.value,
      });

      /*
       * If already the user have selected an option to sort, then
       * set it to None
       */
      dispatch({ type: "selectedRadioForSort", payload: "All" });

      /*
       * If previously, we have shown any error then hide it
       */
      dispatch({ type: "searchedNotPresentText", payload: "" });

      /*
       * If there is any title value typed to search then erase it
       */
      dispatch({ type: "searchedTitle", payload: "" });

      // Store the whole programs list in tempFilteredList
      let tempFilteredList: GetProgramMetaListData[] = [...programsList];

      /*
       * If the selected option is "Starting this Month" or "On Going"
       * then filter accordingly
       */
      if (event.target.value === "Starting this Month")
        tempFilteredList = filterStartingThisMonthProgramList;

      if (event.target.value === "On Going")
        tempFilteredList = filterOnGoingProgramList;

      /*
       * If the state.selectedRadioForFilter has "Published" or "In Draft"
       * value then filter according to that value
       */
      if (state.selectedRadioForFilter === "Published")
        tempFilteredList = filterPublishedTempFilteredList(tempFilteredList);

      if (state.selectedRadioForFilter === "In Draft")
        tempFilteredList = filterInDraftTempFilteredList(tempFilteredList);

      /*
       * If the state.selectedRadioForFilterMode has "Virtual" or "In Person"
       * value then filter according to that value
       */
      if (state.selectedRadioForFilterMode === "Virtual")
        tempFilteredList = filterVirtualTempFilteredList(tempFilteredList);

      if (state.selectedRadioForFilterMode === "In Person")
        tempFilteredList = filterInPersonTempFilteredList(tempFilteredList);

      // Store the filtered list in filteredProgramsList
      setFilteredProgramsList(tempFilteredList);

      /*
       * If we do not get any programs in filtered list then
       * show an error message
       */
      if (event.target.value && tempFilteredList.length === 0) {
        dispatch({
          type: "searchedNotPresentText",
          payload: "Sorry!! Programs For This Option Not Found",
        });
      }
    };

  /*
   * Function to handle the sorting functionality, when an user
   * tries to sort based on the Duration or Date
   */
  const handleSelectChangeForSort: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      /*
       * If previously, we have shown any error then hide it
       */
      dispatch({ type: "searchedNotPresentText", payload: "" });

      /*
       * If there is any title value typed to search then erase it
       */
      dispatch({ type: "searchedTitle", payload: "" });

      /*
       * If user choosed the None option, then set the None value for the
       * respected sort select input
       */
      if (event.target.value === "All") {
        dispatch({ type: "selectedRadioForSort", payload: event.target.value });
        dispatch({
          type: "selectedRadioForDateSort",
          payload: event.target.value,
        });
      }

      // Store the whole programs list in tempFilteredList
      let tempFilteredList: GetProgramMetaListData[] = [...programsList];

      /*
       * If the state.selectedRadioForFilter has "Published" or "In Draft"
       * value then before sorting filter according to that value
       */
      if (state.selectedRadioForFilter === "Published")
        tempFilteredList = filterPublishedTempFilteredList(tempFilteredList);

      if (state.selectedRadioForFilter === "In Draft")
        tempFilteredList = filterInDraftTempFilteredList(tempFilteredList);

      /*
       * If the state.selectedRadioForFilterMode has "Virtual" or "In Person"
       * value then before sorting filter according to that value
       */
      if (state.selectedRadioForFilterMode === "Virtual")
        tempFilteredList = filterVirtualTempFilteredList(tempFilteredList);

      if (state.selectedRadioForFilterMode === "In Person")
        tempFilteredList = filterInPersonTempFilteredList(tempFilteredList);

      /*
       * If the state.selectedRadioForFilterCategory has "Starting this Month" or
       * "On Going" value then before sorting filter according to the value
       */
      if (state.selectedRadioForFilterCategory === "Starting this Month")
        tempFilteredList =
          filterStartingThisMonthTempFilteredList(tempFilteredList);

      if (state.selectedRadioForFilterCategory === "On Going")
        tempFilteredList = filterOnGoingTempFilteredList(tempFilteredList);

      // Then sort according to event.target.value
      if (event.target.value === "Increasing Duration") {
        dispatch({
          type: "selectedRadioForDateSort",
          payload: "All",
        });
        dispatch({ type: "selectedRadioForSort", payload: event.target.value });
        tempFilteredList.sort(sortDurationInIncreasingByUsing);
      }

      if (event.target.value === "Decreasing Duration") {
        dispatch({
          type: "selectedRadioForDateSort",
          payload: "All",
        });
        dispatch({ type: "selectedRadioForSort", payload: event.target.value });
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

      // Store the sorted list in filteredProgramsList
      setFilteredProgramsList(tempFilteredList);

      /*
       * If we do not get any programs in sorted list then
       * show an error message
       */
      if (event.target.value && tempFilteredList.length === 0) {
        dispatch({
          type: "searchedNotPresentText",
          payload: "Sorry!! Programs For This Option Not Found",
        });
      }
    };

  return (
    <div>
      <div className="OrgFilterBarText">View and Search Programs</div>
      {/* Show FilterBarForm component */}
      <FilterBarForm
        state={state}
        handleSearchedTitleChange={handleSearchedTitleChange}
        handleSelectChangeForFilter={handleSelectChangeForFilter}
        handleSelectChangeForFilterMode={handleSelectChangeForFilterMode}
        handleSelectChangeForFilterCategory={
          handleSelectChangeForFilterCategory
        }
        handleSelectChangeForSort={handleSelectChangeForSort}
      />
    </div>
  );
};

export default FilterBar;
