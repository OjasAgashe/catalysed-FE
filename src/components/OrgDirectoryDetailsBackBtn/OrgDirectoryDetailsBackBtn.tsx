import React from "react";
import { FiChevronsLeft } from "react-icons/fi";
import { useHistory, useLocation, useParams } from "react-router-dom";
import {
  ORGANISATION_DIRECTORY,
  ORGANISATION_DIRECTORY_DETAILS_MENTOR,
  ORGANISATION_DIRECTORY_DETAILS_STUDENT,
  ORGANISATION_PROGRAM_DETAILS,
} from "../../constants/Routes";

import "./OrgDirectoryDetailsBackBtn.css";

/*
 * This component will be visible on the Org pages, on which
 * we want to redirect back to the Org Directory Page
 */

const OrgDirectoryDetailsBackBtn = () => {
  const history = useHistory();
  const location = useLocation();
  const { programId } = useParams<{ programId: string }>();

  const handleOrgDirectoryDetailsBackBtnClick = () => {
    if (location.pathname.includes(ORGANISATION_DIRECTORY_DETAILS_MENTOR))
      history.push(`${ORGANISATION_DIRECTORY}?type=MENTOR`);

    if (location.pathname.includes(ORGANISATION_DIRECTORY_DETAILS_STUDENT))
      history.push(`${ORGANISATION_DIRECTORY}?type=STUDENT`);

    if (location.pathname.includes(ORGANISATION_PROGRAM_DETAILS))
      history.push(`${ORGANISATION_PROGRAM_DETAILS}/${programId}/participants`);
  };

  return (
    <div className="OrgDirectoryDetailsBackBtnContainer">
      <button
        className="OrgDirectoryDetailsBackBtn"
        onClick={handleOrgDirectoryDetailsBackBtnClick}
      >
        <FiChevronsLeft className="LeftArrowBtn" /> Go back
      </button>
    </div>
  );
};

export default OrgDirectoryDetailsBackBtn;
