import React from "react";
import { FiChevronsLeft } from "react-icons/fi";
import { useHistory, useLocation } from "react-router-dom";
import {
  ORGANISATION_DIRECTORY,
  ORGANISATION_DIRECTORY_DETAILS_MENTOR,
} from "../../constants/Routes";

import "./OrgDirectoryDetailsBackBtn.css";

/*
 * This component will be visible on the Org pages, on which
 * we want to redirect back to the Org Directory Page
 */

const OrgDirectoryDetailsBackBtn = () => {
  const history = useHistory();
  const location = useLocation();

  const handleOrgDirectoryDetailsBackBtnClick = () => {
    history.push(
      location.pathname.includes(ORGANISATION_DIRECTORY_DETAILS_MENTOR)
        ? `${ORGANISATION_DIRECTORY}?type=MENTOR`
        : `${ORGANISATION_DIRECTORY}?type=STUDENT`
    );
  };

  return (
    <div className="OrgDirectoryDetailsBackBtnContainer">
      <button
        className="OrgDirectoryDetailsBackBtn"
        onClick={handleOrgDirectoryDetailsBackBtnClick}
      >
        <FiChevronsLeft className="LeftArrowBtn" /> Go back to Directory
      </button>
    </div>
  );
};

export default OrgDirectoryDetailsBackBtn;
