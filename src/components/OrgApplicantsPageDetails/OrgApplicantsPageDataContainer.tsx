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
};

const OrgApplicantsPageDataContainer = ({
  searchedName,
  fakeData,
  filteredResponseData,
  searchedNameNotFound,
}: OrgApplicantsPageDataContainerProps) => {
  return (
    <div className="OrgApplicantsPageDataContainer">
      <Table striped responsive="md">
        <thead className="OrgApplicantsTableHeader">
          <tr className="TableHeaderFirstRow OrgApplicantsTableRow">
            <th rowSpan={2} className="ProgramHeading">
              Program name
            </th>
            <th colSpan={2} className="MentorHeading">
              Mentor
            </th>
            <th colSpan={2} className="StudentHeading">
              Student
            </th>
          </tr>
          <tr className="TableHeaderSecondRow OrgApplicantsTableRow">
            <th>Pending</th>
            <th>Not Viewed</th>
            <th>Pending</th>
            <th>Not Viewed</th>
          </tr>
        </thead>
        <tbody>
          {searchedName && filteredResponseData.length ? (
            [...filteredResponseData]
              .reverse()
              .map((data) => (
                <OrgApplicantsPageTableRow data={data} key={data.id} />
              ))
          ) : (
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
          {searchedName === "" &&
            fakeData.map((data) => (
              <OrgApplicantsPageTableRow data={data} key={data.id} />
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default OrgApplicantsPageDataContainer;
