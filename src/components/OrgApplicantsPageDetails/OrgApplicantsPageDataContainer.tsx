import React from "react";
import { Table } from "react-bootstrap";
import OrgApplicantsPageTableRow from "./OrgApplicantsPageTableRow";
import Error from "../Error/Error";

type OrgApplicantsPageDataContainerProps = {
  searchedName: string;
  fakeData: {
    id: number;
    program_name: string;
    mentor_pending: number;
    mentor_not_viewed: number;
    student_pending: number;
    student_not_viewed: number;
  }[];
  filteredResponseData: {
    id: number;
    program_name: string;
    mentor_pending: number;
    mentor_not_viewed: number;
    student_pending: number;
    student_not_viewed: number;
  }[];
  searchedNameNotFound: boolean;
  pageHeaderText: string;
};

const OrgApplicantsPageDataContainer = ({
  searchedName,
  fakeData,
  filteredResponseData,
  searchedNameNotFound,
  pageHeaderText,
}: OrgApplicantsPageDataContainerProps) => {
  return (
    <div className="OrgApplicantsPageDataContainer">
      <Table striped responsive="md">
        <thead className="OrgApplicantsTableHeader">
          <tr className="TableHeaderFirstRow OrgApplicantsTableRow">
            <th rowSpan={2} className="ProgramHeading OrgApplicantsHeader">
              Program name
            </th>
            <th colSpan={2} className="MentorHeading OrgApplicantsHeader">
              Mentor
            </th>
            <th colSpan={2} className="StudentHeading OrgApplicantsHeader">
              Student
            </th>
          </tr>
          <tr className="TableHeaderSecondRow OrgApplicantsTableRow">
            <th className="OrgApplicantsHeader">Pending</th>
            <th className="OrgApplicantsHeader">
              {pageHeaderText === "Invitations" ? "Accepted" : "Not Viewed"}
            </th>
            <th className="OrgApplicantsHeader">Pending</th>
            <th className="OrgApplicantsHeader">
              {pageHeaderText === "Invitations" ? "Accepted" : "Not Viewed"}
            </th>
          </tr>
        </thead>
        <tbody>
          {searchedName && filteredResponseData.length ? (
            /*
             * If we have some filtered Data then show that Data
             */
            [...filteredResponseData]
              .reverse()
              .map((data) => (
                <OrgApplicantsPageTableRow data={data} key={data.id} />
              ))
          ) : (
            /*
             * else If we have no filtered Data then show an Error Message
             */
            <tr
              style={searchedNameNotFound === false ? { display: "none" } : {}}
            >
              <td colSpan={5}>
                <div className="ErrorCompContainer">
                  <Error message="No Program Found with this Name !!" />
                </div>
              </td>
            </tr>
          )}
          {
            /*
             * If user has not entered any thing to search, then show
             * whole data
             */
            searchedName === "" &&
              fakeData.map((data) => (
                <OrgApplicantsPageTableRow data={data} key={data.id} />
              ))
          }
        </tbody>
      </Table>
    </div>
  );
};

export default OrgApplicantsPageDataContainer;
