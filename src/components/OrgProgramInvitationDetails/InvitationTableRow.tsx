import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { OrgInvitationResponseData } from "../../types/OrgProgramDetails";

type InvitationTableRowProps = {
  data: OrgInvitationResponseData;
};

const InvitationTableRow = ({ data }: InvitationTableRowProps) => {
  return (
    <>
      <tr className="ProgramInvitationTableRow">
        <td className="ProgramInvitationTableData">
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
        <td className="ProgramInvitationTableData">
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip id="email-tooltip">{data.emailId}</Tooltip>}
          >
            <span>
              {data.emailId.length > 25
                ? `${data.emailId.substring(0, 25)}...`
                : data.emailId}
            </span>
          </OverlayTrigger>
        </td>
        <td className="ProgramInvitationTableData">
          {data.userType === "MENTOR" ? "Mentor" : "Student"}
        </td>
        <td className="ProgramInvitationTableData NumericalColumn">{`${new Date(
          data.sentAt
        ).getDate()}/${new Date(data.sentAt).getMonth() + 1}/${new Date(
          data.sentAt
        ).getFullYear()}`}</td>
        <td className="ProgramInvitationTableData">
          {data.responseStatus === "PENDING" ? "Pending" : "Accepted"}
        </td>
      </tr>
    </>
  );
};

export default InvitationTableRow;
