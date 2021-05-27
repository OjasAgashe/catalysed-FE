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

      if (event.target.value === "" && tempFilteredList.length === 0) {
        if (state.selectedRadioForFilter === "Published") {
          tempFilteredList = programsList.filter(
            (program) => program.status === "PUBLISHED"
          );
        }

        if (state.selectedRadioForFilter === "In Draft") {
          tempFilteredList = programsList.filter(
            (program) => program.status === "SAVED_TO_DRAFT"
          );
        }
      }

      setFilteredProgramsList(tempFilteredList);

      if (event.target.value && tempFilteredList.length === 0) {
        dispatch({
          type: "searchedNotPresentText",
          payload: "Sorry!! Program With This Title Not Found",
        });
      }
    };

  const handleRadioSelectedForFilterChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      dispatch({ type: "selectedRadioForFilter", payload: event.target.value });
      dispatch({ type: "searchedNotPresentText", payload: "" });

      if (event.target.value !== "All") {
        let tempFilteredList: GetProgramMetaListData[] = [];

        if (event.target.value === "Published") {
          tempFilteredList = programsList.filter(
            (program) => program.status === "PUBLISHED"
          );
        }

        if (event.target.value === "In Draft") {
          tempFilteredList = programsList.filter(
            (program) => program.status === "SAVED_TO_DRAFT"
          );
        }

        setFilteredProgramsList(tempFilteredList);
        if (event.target.value && tempFilteredList.length === 0) {
          dispatch({
            type: "searchedNotPresentText",
            payload: "Sorry!! Program For This Option Not Found",
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

          <Form.Group className="FilterCategoryRadioGroup">
            <Form.Check
              className="FilterCategoryRadioBtn"
              type="radio"
              name="filter-category"
              inline
              label="All"
              checked={state.selectedRadioForFilter === "All"}
              value="All"
              onChange={handleRadioSelectedForFilterChange}
            />

            <Form.Check
              className="FilterCategoryRadioBtn"
              type="radio"
              name="filter-category"
              inline
              label="Published"
              checked={state.selectedRadioForFilter === "Published"}
              value="Published"
              onChange={handleRadioSelectedForFilterChange}
            />

            <Form.Check
              className="FilterCategoryRadioBtn"
              type="radio"
              name="filter-category"
              inline
              label="In Draft"
              checked={state.selectedRadioForFilter === "In Draft"}
              value="In Draft"
              onChange={handleRadioSelectedForFilterChange}
            />
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
