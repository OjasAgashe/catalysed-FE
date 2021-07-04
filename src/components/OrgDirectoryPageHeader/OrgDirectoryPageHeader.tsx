import React from "react";
import { Alert, Form, InputGroup } from "react-bootstrap";
import { OrgDirectoryPage } from "../../assets/Illustrations/Illustrations";
import { FcSearch } from "react-icons/fc";
import "./OrgDirectoryPageHeader.css";
import {
  OrganisationDirectoryCommonActionType,
  OrganisationDirectoryCommonResponse,
  OrganisationDirectoryCommonState,
} from "../../types/OrganisationDirectory";
import { useHistory } from "react-router-dom";
import { ORGANISATION_DIRECTORY } from "../../constants/Routes";

type OrgDirectoryPageHeaderProps = {
  state: OrganisationDirectoryCommonState;
  dispatch: React.Dispatch<OrganisationDirectoryCommonActionType>;
};

const OrgDirectoryPageHeader = ({
  state,
  dispatch,
}: OrgDirectoryPageHeaderProps) => {
  const history = useHistory();

  const handleOrgDirectorySearch: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({ type: "searchedName", payload: event.target.value });
    dispatch({ type: "searchedNameNotFound", payload: false });

    const responseData =
      state.responseData as OrganisationDirectoryCommonResponse[];
    const tempFilteredData = responseData.filter(
      (data: OrganisationDirectoryCommonResponse) =>
        data.name.toLowerCase().includes(event.target.value.toLowerCase()) ||
        data.email.toLowerCase().includes(event.target.value.toLowerCase())
    );

    dispatch({ type: "filteredResponseData", payload: tempFilteredData });

    if (event.target.value !== "" && tempFilteredData.length === 0) {
      dispatch({ type: "searchedNameNotFound", payload: true });
    }
  };

  return (
    <div
      className="OrgDirectoryPageHeaderContainer"
      style={{ backgroundImage: `url(${OrgDirectoryPage})` }}
    >
      <div className="OrgDirectoryPageHeaderHeroText">
        <span>{state.title} Directory</span>
      </div>

      <div className="SearchBarContainer">
        <Form className="SearchBarForm">
          <InputGroup>
            <InputGroup.Prepend className="InputGroupPrepend">
              <FcSearch className="SearchIcon" />
            </InputGroup.Prepend>
            <Form.Control
              className="DirectorySearchFormControl"
              type="search"
              placeholder="Search by Name or Email..."
              value={state.searchedName}
              onChange={handleOrgDirectorySearch}
            />
          </InputGroup>
        </Form>
      </div>

      <div className="OrgDirectoryMentorOrStudentOptContainer">
        <Alert variant="warning" className="OrgDirectoryMentorOrStudentOpt">
          <div
            className={`${
              state.title === "Mentors"
                ? "CurrentSelectedTab"
                : "NotCurrentSelectedTab"
            } OrgDirectoryMentorOpt`}
          >
            <button
              className="MentorBtnOpt"
              type="button"
              onClick={() => {
                dispatch({ type: "title", payload: "Mentors" });
                history.push(`${ORGANISATION_DIRECTORY}?type=MENTOR`);
              }}
            >
              Mentors
            </button>
          </div>
          <div
            className={`${
              state.title === "Mentors"
                ? "NotCurrentSelectedTab"
                : "CurrentSelectedTab"
            }`}
          >
            <button
              className="StudentBtnOpt"
              type="button"
              onClick={() => {
                dispatch({ type: "title", payload: "Students" });
                history.push(`${ORGANISATION_DIRECTORY}?type=STUDENT`);
              }}
            >
              Students
            </button>
          </div>
        </Alert>
      </div>
    </div>
  );
};

export default OrgDirectoryPageHeader;
