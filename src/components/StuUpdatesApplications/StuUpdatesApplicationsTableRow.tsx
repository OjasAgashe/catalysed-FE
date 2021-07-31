import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { MENTOR, STUDENT } from "../../constants/Entities";
import {
  MENTOR_UPDATES_DETAILS_APPLICATION,
  STUDENT_UPDATES_DETAILS_APPLICATION,
} from "../../constants/Routes";
import { StudentUpdatesCommonResponse } from "../../types/StudentUpdates";

type StuUpdatesApplicationsTableRowProps = {
  data: StudentUpdatesCommonResponse;
  entity: string;
};

const StuUpdatesApplicationsTableRow = ({
  data,
  entity,
}: StuUpdatesApplicationsTableRowProps) => {
  const history = useHistory();

  const handleUpdatesApplicationsTableDataRow = () => {
    if (entity === STUDENT) {
      history.push(
        `${STUDENT_UPDATES_DETAILS_APPLICATION}/${data.applicationId}/details`
      );
    } else if (entity === MENTOR) {
      history.push(
        `${MENTOR_UPDATES_DETAILS_APPLICATION}/${data.applicationId}/details`
      );
    }
  };

  return (
    <>
      <tr
        className="UpdatesApplicationsTableRow UpdatesApplicationsTableDataRow"
        onClick={handleUpdatesApplicationsTableDataRow}
      >
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
