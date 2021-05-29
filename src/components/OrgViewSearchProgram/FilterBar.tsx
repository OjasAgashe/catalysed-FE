import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import { BiSearchAlt } from "react-icons/bi";
import { OrgViewAndSearchProgram } from "../../assets/Illustrations/Illustrations";
import {
  GetProgramMetaListData,
  OrgViewSearchProgramState,
  OrgViewSearchProgramActionType,
} from "../../types/OrgViewSearchProgram";

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

  const filterInDraftProgramList = programsList.filter(
    (program) => program.status === "SAVED_TO_DRAFT"
  );

  const filterVirtualProgramList = programsList.filter(
    (program) => program.mode === "Virtual"
  );

  const filterInPersonProgramList = programsList.filter(
    (program) => program.mode === "InPerson"
  );

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

      if (state.selectedRadioForFilter === "Published") {
        tempFilteredList = tempFilteredList.filter(
          (program) => program.status === "PUBLISHED"
        );
      }

      if (state.selectedRadioForFilter === "In Draft") {
        tempFilteredList = tempFilteredList.filter(
          (program) => program.status === "SAVED_TO_DRAFT"
        );
      }

      if (state.selectedRadioForFilter === "Virtual") {
        tempFilteredList = tempFilteredList.filter(
          (program) => program.mode === "Virtual"
        );
      }

      if (state.selectedRadioForFilter === "In Person") {
        tempFilteredList = tempFilteredList.filter(
          (program) => program.mode === "InPerson"
        );
      }

      if (event.target.value === "" && tempFilteredList.length === 0) {
        if (state.selectedRadioForFilter === "Published")
          tempFilteredList = filterPublishedProgramList;

        if (state.selectedRadioForFilter === "In Draft")
          tempFilteredList = filterInDraftProgramList;

        if (state.selectedRadioForFilter === "Virtual")
          tempFilteredList = filterVirtualProgramList;

        if (state.selectedRadioForFilter === "In Person")
          tempFilteredList = filterInPersonProgramList;

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

      if (event.target.value !== "All") {
        let tempFilteredList: GetProgramMetaListData[] = [];

        if (event.target.value === "Published")
          tempFilteredList = filterPublishedProgramList;

        if (event.target.value === "In Draft")
          tempFilteredList = filterInDraftProgramList;

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
      }
    };

  const handleSelectChangeForSort: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      dispatch({ type: "selectedRadioForSort", payload: event.target.value });
      dispatch({ type: "searchedNotPresentText", payload: "" });
      dispatch({ type: "searchedTitle", payload: "" });

      if (event.target.value !== "All") {
        let tempFilteredList: GetProgramMetaListData[] = [...programsList];

        if (state.selectedRadioForFilter === "Published")
          tempFilteredList = filterPublishedProgramList;

        if (state.selectedRadioForFilter === "In Draft")
          tempFilteredList = filterInDraftProgramList;

        if (state.selectedRadioForFilter === "Virtual")
          tempFilteredList = filterVirtualProgramList;

        if (state.selectedRadioForFilter === "In Person")
          tempFilteredList = filterInPersonProgramList;

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
      }
    };

  return (
    <div>
      <div className="OrgFilterBarText">View &amp; Search</div>
      <div className="FilterBarFormNImgContainer">
        <Form>
          <InputGroup className="OrgSearchFormInputGroup">
            <InputGroup.Prepend className="OrgSearchIconInput">
              <BiSearchAlt className="OrgSearchIcon" />
            </InputGroup.Prepend>
            <Form.Control
              className="SearchInputFormControl"
              type="search"
              placeholder="Search By Title"
              value={state.searchedTitle}
              onChange={handleSearchedTitleChange}
            />
          </InputGroup>

          <Form.Group className="FilterByVSGroup">
            <Form.Text className="FilterByText">filter By</Form.Text>
            <Form.Control
              className="FilterCategorySelectGroup"
              custom
              as="select"
              onChange={handleSelectChangeForFilter}
            >
              <option className="FilterCategorySelectOption" value="All">
                None
              </option>
              <option className="FilterCategorySelectOption" value="Published">
                Published Status
              </option>
              <option className="FilterCategorySelectOption" value="In Draft">
                In Draft Status
              </option>
              <option className="FilterCategorySelectOption" value="Virtual">
                Virtual Mode
              </option>
              <option className="FilterCategorySelectOption" value="In Person">
                In Person Mode
              </option>
            </Form.Control>
          </Form.Group>

          <Form.Group className="SortByVSGroup">
            <Form.Text className="SortByText">sort By&nbsp;</Form.Text>
            <Form.Control
              className="SortCategorySelectGroup"
              custom
              as="select"
              value={
                state.selectedRadioForSort === "All"
                  ? "None"
                  : state.selectedRadioForSort
              }
              onChange={handleSelectChangeForSort}
            >
              <option className="SortCategorySelectOption" value="All">
                None
              </option>
              <option
                className="SortCategorySelectOption"
                value="Increasing Duration"
              >
                Increasing Duration
              </option>
              <option
                className="SortCategorySelectOption"
                value="Decreasing Duration"
              >
                Decreasing Duration
              </option>
              <option
                className="SortCategorySelectOption"
                value="Newest to Oldest Date"
              >
                Newest to Oldest Date
              </option>
              <option
                className="SortCategorySelectOption"
                value="Oldest to Newest Date"
              >
                Oldest to Newest Date
              </option>
            </Form.Control>
          </Form.Group>
        </Form>

        <img
          className="ViewAndSearchProgramIllustration"
          src={OrgViewAndSearchProgram}
          alt="org view and search program illustration"
        />
      </div>
    </div>
  );
};

export default FilterBar;
