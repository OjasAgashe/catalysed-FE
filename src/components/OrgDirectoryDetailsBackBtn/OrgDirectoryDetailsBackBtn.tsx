import React from "react";
import { FiChevronsLeft } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import { ORGANISATION_DIRECTORY } from "../../constants/Routes";

import "./OrgDirectoryDetailsBackBtn.css";

const OrgDirectoryDetailsBackBtn = () => {
  const history = useHistory();

  const handleOrgDirectoryDetailsBackBtnClick = () => {
    history.push(ORGANISATION_DIRECTORY);
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
