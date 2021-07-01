import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { OrgProgramApplicantData } from "../../types/OrgProgramDetails";

type ApplicantTableRowProps = {
  data: OrgProgramApplicantData;
};

const ApplicantTableRow = ({ data }: ApplicantTableRowProps) => {
  return (
    <>
      <tr className="ProgramApplicantTableRow">
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
          {data.date_of_application}
        </td>
        <td className="ProgramApplicantTableData">{data.status}</td>
        <td className="ProgramApplicantTableData">{data.viewed}</td>
      </tr>
    </>
  );
};

export default ApplicantTableRow;
