import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { OrgProgramApplicantData } from "../../types/OrgProgramDetails";

type ApplicantTableRowProps = {
  data: OrgProgramApplicantData;
};

const ApplicantTableRow = ({ data }: ApplicantTableRowProps) => {
  return (
    <>
      <tr className="ProgramApplicantTableRow ProgramApplicantDataTableRow">
        <td className="ProgramApplicantTableData">
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip id="name-tooltip">{data.name}</Tooltip>}
          >
            <span>
              {data.name.length > 20
                ? `${data.name.substring(0, 20)}...`
                : data.name}
            </span>
          </OverlayTrigger>
        </td>
        <td className="ProgramApplicantTableData">
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip id="email-tooltip">{data.email}</Tooltip>}
          >
            <span>
              {data.email.length > 25
                ? `${data.email.substring(0, 25)}...`
                : data.email}
            </span>
          </OverlayTrigger>
        </td>
        <td className="ProgramApplicantTableData NumericalColumn">
          {`${new Date(data.appliedOn).getDate()}/${
            new Date(data.appliedOn).getMonth() + 1
          }/${new Date(data.appliedOn).getFullYear()}`}
        </td>
        <td className="ProgramApplicantTableData">
          {data.status === "PENDING"
            ? "Pending"
            : data.status === "APPROVED"
            ? "Approved"
            : "Rejected"}
        </td>
        <td className="ProgramApplicantTableData">
          {data.viewedByOrg ? "Viewed" : "Not Viewed"}
        </td>
      </tr>
    </>
  );
};

export default ApplicantTableRow;
