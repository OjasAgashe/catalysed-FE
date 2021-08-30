import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { ORGANISATION_PROGRAM_DETAILS } from "../../constants/Routes";

type ConnectedToProgramTableRowProps = {
  data: { mode: string; programId: number; status: string; title: string };
};

/*
 * ConnectedToProgramTableRow : component accepts data as the props
 *
 * This component will render Row of programs to which the participant (or applicant) is
 * connected, and Each row will be clickable.
 *
 * When the Org will click on any row, then we will push it to the details page of that
 * particular program
 */
const ConnectedToProgramTableRow = ({
  data,
}: ConnectedToProgramTableRowProps) => {
  const history = useHistory();

  const handleProgramTableDataRow = () => {
    /*
     * When the Org will click on a row, then push the Org to the details page
     * of that particular program
     */
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
          {data.mode === "InPerson" ? "In Person" : data.mode}
        </td>
      </tr>
    </>
  );
};

export default ConnectedToProgramTableRow;
