import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import { FcSearch } from "react-icons/fc";
import { ProgramsApplicantsSummaryHeader } from "../../assets/Illustrations/Illustrations";
import "./OrgApplicantsPageHeader.css";

type OrgApplicantsPageHeaderProps = {
  searchedName: string;
  setSearchedName: React.Dispatch<React.SetStateAction<string>>;
  setFilteredResponseData: React.Dispatch<
    React.SetStateAction<
      {
        id: number;
        program_name: string;
        mentor_pending: number;
        mentor_not_viewed: number;
        student_pending: number;
        student_not_viewed: number;
      }[]
    >
  >;
  fakeData: {
    id: number;
    program_name: string;
    mentor_pending: number;
    mentor_not_viewed: number;
    student_pending: number;
    student_not_viewed: number;
  }[];

  setSearchedNameNotFound: React.Dispatch<React.SetStateAction<boolean>>;
  pageHeaderText: string;
};

const OrgApplicantsPageHeader = ({
  searchedName,
  setSearchedName,
  setFilteredResponseData,
  fakeData,
  setSearchedNameNotFound,
  pageHeaderText,
}: OrgApplicantsPageHeaderProps) => {
  /*
   * Function to handle the Searched Name input
   */
  const handleOrgApplicantsSearch: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      // set the value that the use entered in input to searchedName
      setSearchedName(event.target.value);

      /*
       * If we have shown any error message before, then hide it
       */
      setSearchedNameNotFound(false);

      /*
       * filter the response data based on the entered value
       */
      let tempFilteredData = fakeData.filter((data) =>
        data.program_name
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
      );

      // set the result after filtering to filteredResponseData
      setFilteredResponseData(tempFilteredData);

      /*
       * If we do not get any data after filtering then set the value
       * of searchedNameNotFound to true
       */
      if (event.target.value !== "" && tempFilteredData.length === 0) {
        setSearchedNameNotFound(true);
      }
    };

  return (
    <div
      className="OrgApplicantsPageHeaderContainer"
      style={{ backgroundImage: `url(${ProgramsApplicantsSummaryHeader})` }}
    >
      <div className="OrgApplicantsPageHeaderHeroText">
        <span className="TextToSpan">Programs {pageHeaderText} Summary</span>
      </div>

      <div className="SearchBarOuterDiv">
        <div className="SearchBarContainer">
          <Form className="SearchBarForm">
            <InputGroup>
              <InputGroup.Prepend className="InputGroupPrepend">
                <FcSearch className="SearchIcon" />
              </InputGroup.Prepend>
              <Form.Control
                className="ApplicantsSearchFormControl"
                type="search"
                placeholder="Search by Program name"
                value={searchedName}
                onChange={handleOrgApplicantsSearch}
              />
            </InputGroup>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default OrgApplicantsPageHeader;
