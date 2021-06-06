import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { OrgInvitationDetailsData } from "../../types/OrgProgramDetails";

type InvitationTableRowProps = {
  data: OrgInvitationDetailsData;
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
            overlay={<Tooltip id="email-tooltip">{data.email}</Tooltip>}
          >
            <span>
              {data.email.length > 25
                ? `${data.email.substring(0, 25)}...`
                : data.email}
            </span>
          </OverlayTrigger>
        </td>
        <td className="ProgramInvitationTableData">{data.type}</td>
        <td className="ProgramInvitationTableData">{data.sent_on}</td>
        <td className="ProgramInvitationTableData">{data.status}</td>
      </tr>
    </>
  );
};

export default InvitationTableRow;
