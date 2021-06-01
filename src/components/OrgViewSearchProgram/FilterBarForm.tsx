import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import { BiSearchAlt } from "react-icons/bi";
import { OrgViewAndSearchProgram } from "../../assets/Illustrations/Illustrations";
import { OrgViewSearchProgramState } from "../../types/OrgViewSearchProgram";

type FilterBarFormProps = {
  state: OrgViewSearchProgramState;
  handleSearchedTitleChange: React.ChangeEventHandler<HTMLInputElement>;
  handleSelectChangeForFilter: React.ChangeEventHandler<HTMLInputElement>;
  handleSelectChangeForFilterMode: React.ChangeEventHandler<HTMLInputElement>;
  handleSelectChangeForSort: React.ChangeEventHandler<HTMLInputElement>;
};

const FilterBarForm = ({
  state,
  handleSearchedTitleChange,
  handleSelectChangeForFilter,
  handleSelectChangeForFilterMode,
  handleSelectChangeForSort,
}: FilterBarFormProps) => {
  return (
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
          <Form.Text className="FilterByText">filter by Status</Form.Text>
          <Form.Control
            className="FilterCategorySelectGroup"
            custom
            as="select"
            value={
              state.selectedRadioForFilter === "All"
                ? "None"
                : state.selectedRadioForFilter
            }
            onChange={handleSelectChangeForFilter}
          >
            <option className="FilterCategorySelectOption" value="All">
              None
            </option>
            <option className="FilterCategorySelectOption" value="Published">
              Published
            </option>
            <option className="FilterCategorySelectOption" value="In Draft">
              In Draft
            </option>
          </Form.Control>
        </Form.Group>

        <Form.Group className="FilterByVSGroup">
          <Form.Text className="FilterByText">filter by Mode</Form.Text>
          <Form.Control
            className="FilterCategorySelectGroup"
            custom
            as="select"
            value={
              state.selectedRadioForFilterMode === "All"
                ? "None"
                : state.selectedRadioForFilterMode
            }
            onChange={handleSelectChangeForFilterMode}
          >
            <option className="FilterCategorySelectOption" value="All">
              None
            </option>
            <option className="FilterCategorySelectOption" value="Virtual">
              Virtual
            </option>
            <option className="FilterCategorySelectOption" value="In Person">
              In Person
            </option>
          </Form.Control>
        </Form.Group>

        <Form.Group className="SortByVSGroup">
          <Form.Text className="SortByText">sort by Duration</Form.Text>
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
              Increasing
            </option>
            <option
              className="SortCategorySelectOption"
              value="Decreasing Duration"
            >
              Decreasing
            </option>
          </Form.Control>
        </Form.Group>

        <Form.Group className="SortByVSGroup">
          <Form.Text className="SortByText">sort by Date</Form.Text>
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
              value="Newest to Oldest Date"
            >
              Newest to Oldest
            </option>
            <option
              className="SortCategorySelectOption"
              value="Oldest to Newest Date"
            >
              Oldest to Newest
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
  );
};

export default FilterBarForm;
