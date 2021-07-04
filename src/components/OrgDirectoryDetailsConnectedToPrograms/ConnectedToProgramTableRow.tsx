import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { ORGANISATION_PROGRAM_DETAILS } from "../../constants/Routes";

type ConnectedToProgramTableRowProps = {
  data: { programId: number; status: string; title: string };
};

const ConnectedToProgramTableRow = ({
  data,
}: ConnectedToProgramTableRowProps) => {
  const history = useHistory();

  const handleProgramTableDataRow = () => {
    history.push(`${ORGANISATION_PROGRAM_DETAILS}/${data.programId}/details`);
  };

  return (
    <>
      <tr
        className="ProgramInvitationTableRow OrgConnectedToProgramTableDataRow"
        onClick={handleProgramTableDataRow}
      >
        <td className="ProgramInvitationTableData">
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip id="name-tooltip">{data.title}</Tooltip>}
          >
            <span>
              {data.title.length > 50
                ? `${data.title.substring(0, 50)}...`
                : data.title}
            </span>
          </OverlayTrigger>
        </td>
        <td className="ProgramInvitationTableData">
          {data.status === "PUBLISHED" ? "Published" : "In Draft"}
        </td>
      </tr>
    </>
  );
};

export default ConnectedToProgramTableRow;
