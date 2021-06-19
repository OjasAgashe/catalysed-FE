import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

type ConnectedToProgramTableRowProps = {
  data: {
    name: string;
    state: string;
  };
};

const ConnectedToProgramTableRow = ({
  data,
}: ConnectedToProgramTableRowProps) => {
  return (
    <>
      <tr className="ProgramInvitationTableRow">
        <td className="ProgramInvitationTableData">
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip id="name-tooltip">{data.name}</Tooltip>}
          >
            <span>
              {data.name.length > 50
                ? `${data.name.substring(0, 50)}...`
                : data.name}
            </span>
          </OverlayTrigger>
        </td>
        <td className="ProgramInvitationTableData">{data.state}</td>
      </tr>
    </>
  );
};

export default ConnectedToProgramTableRow;
