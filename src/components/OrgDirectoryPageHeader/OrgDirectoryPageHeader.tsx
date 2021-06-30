import React from "react";
import { Alert, Form, InputGroup } from "react-bootstrap";
import { OrgDirectoryPage } from "../../assets/Illustrations/Illustrations";
import { FcSearch } from "react-icons/fc";
import "./OrgDirectoryPageHeader.css";

type OrgDirectoryPageHeaderProps = {
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  title: string;
  searchedName: string;
  setSearchedName: React.Dispatch<React.SetStateAction<string>>;
  setFilteredResponseData: React.Dispatch<
    React.SetStateAction<
      | []
      | {
          id: number;
          name: string;
          email: string;
          active_programs: string[];
        }[]
    >
  >;
  fakeMentorData: {
    id: number;
    name: string;
    email: string;
    active_programs: string[];
  }[];
  fakeStudentData: {
    id: number;
    name: string;
    email: string;
    active_programs: string[];
  }[];
  setSearchedNameNotFound: React.Dispatch<React.SetStateAction<boolean>>;
};

const OrgDirectoryPageHeader = ({
  setTitle,
  title,
  searchedName,
  setSearchedName,
  setFilteredResponseData,
  fakeMentorData,
  fakeStudentData,
  setSearchedNameNotFound,
}: OrgDirectoryPageHeaderProps) => {
  const handleOrgDirectorySearch: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setSearchedName(event.target.value);
    setSearchedNameNotFound(false);

    let tempFilteredData:
      | {
          id: number;
          name: string;
          email: string;
          active_programs: string[];
        }[]
      | [] = [];

    if (title === "Mentors") {
      tempFilteredData = fakeMentorData.filter((data) =>
        data.name.toLowerCase().includes(event.target.value.toLowerCase()) ||
        data.email.toLowerCase().includes(event.target.value.toLowerCase())
      );
    }

    if (title === "Students") {
      tempFilteredData = fakeStudentData.filter((data) =>
        data.name.toLowerCase().startsWith(event.target.value.toLowerCase())
      );
    }

    setFilteredResponseData(tempFilteredData);

    if (event.target.value !== "" && tempFilteredData.length === 0) {
      setSearchedNameNotFound(true);
    }
  };

  return (
    <div
      className="OrgDirectoryPageHeaderContainer"
      style={{ backgroundImage: `url(${OrgDirectoryPage})` }}
    >
      <div className="OrgDirectoryPageHeaderHeroText">
        <span>{title} Directory</span>
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
              value={searchedName}
              onChange={handleOrgDirectorySearch}
            />
          </InputGroup>
        </Form>
      </div>

      <div className="OrgDirectoryMentorOrStudentOptContainer">
        <Alert variant="warning" className="OrgDirectoryMentorOrStudentOpt">
          <div className={`${title === "Mentors" ? "BlankDiv" : "NoBlankDiv"}`}>
            &nbsp;
          </div>
          <div
            className={`${
              title === "Mentors"
                ? "CurrentSelectedTab"
                : "NotCurrentSelectedTab"
            }`}
          >
            <button
              className="MentorBtnOpt"
              type="button"
              onClick={() => {
                setSearchedNameNotFound(false);
                setSearchedName("");
                setTitle("Mentors");
              }}
            >
              Mentors
            </button>
          </div>
          <div
            className={`${
              title === "Mentors"
                ? "NotCurrentSelectedTab"
                : "CurrentSelectedTab"
            }`}
          >
            <button
              className="StudentBtnOpt"
              type="button"
              onClick={() => {
                setSearchedNameNotFound(false);
                setSearchedName("");
                setTitle("Students");
              }}
            >
              Students
            </button>
          </div>
          <div className={`${title !== "Mentors" ? "BlankDiv" : "NoBlankDiv"}`}>
            &nbsp;
          </div>
        </Alert>
      </div>
    </div>
  );
};

export default OrgDirectoryPageHeader;
