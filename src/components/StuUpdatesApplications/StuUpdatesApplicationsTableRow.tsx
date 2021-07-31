import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { StudentUpdatesCommonResponse } from "../../types/StudentUpdates";

type StuUpdatesApplicationsTableRowProps = {
  data: StudentUpdatesCommonResponse;
};

const StuUpdatesApplicationsTableRow = ({
  data,
}: StuUpdatesApplicationsTableRowProps) => {
  return (
    <>
      <tr className="UpdatesApplicationsTableRow">
        <td className="UpdatesApplicationsTableData">
          <OverlayTrigger
            placement="bottom"
            overlay={
              <Tooltip id="program-name-tooltip">{data.programName}</Tooltip>
            }
          >
            <span>
              {data.programName.length > 40
                ? `${data.programName.substring(0, 40)}...`
                : data.programName}
            </span>
          </OverlayTrigger>
        </td>
        <td className="UpdatesApplicationsTableData NumericalColumn">{`${new Date(
          data.appliedOn
        ).getDate()}/${new Date(data.appliedOn).getMonth() + 1}/${new Date(
          data.appliedOn
        ).getFullYear()}`}</td>
        <td className="UpdatesApplicationsTableData">
          {data.status === "APPROVED"
            ? "Approved"
            : data.status === "PENDING"
            ? "Pending"
            : "Rejected"}
        </td>
      </tr>
    </>
  );
};

export default StuUpdatesApplicationsTableRow;
