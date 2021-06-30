import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

type OrgApplicantsPageTableRowProps = {
  data: {
    id: number;
    program_name: string;
    mentor_pending: number;
    mentor_not_viewed: number;
    student_pending: number;
    student_not_viewed: number;
  };
};

const OrgApplicantsPageTableRow = ({
  data,
}: OrgApplicantsPageTableRowProps) => {
  return (
    <>
      <tr
        className="OrgApplicantsTableRow OrgApplicantsTableDataRow"
        onClick={() => console.log("Row id: ", data.id)}
      >
        <td className="OrgApplicantsTableData">
          <OverlayTrigger
            placement="bottom"
            overlay={
              <Tooltip id="program-name-tooltip">{data.program_name}</Tooltip>
            }
          >
            <span>
              {data.program_name.length > 50
                ? `${data.program_name.substring(0, 50)}...`
                : data.program_name}
            </span>
          </OverlayTrigger>
        </td>
        <td className="OrgApplicantsTableData">{data.mentor_pending}</td>
        <td className="OrgApplicantsTableData">{data.mentor_not_viewed}</td>
        <td className="OrgApplicantsTableData">{data.student_pending}</td>
        <td className="OrgApplicantsTableData">{data.student_not_viewed}</td>
      </tr>
    </>
  );
};

export default OrgApplicantsPageTableRow;
