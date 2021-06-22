import React from "react";
import "./OrgProfileCommonHeader.css";
import { OrgProfileCommonHeaderImg } from "../../assets/Illustrations/Illustrations";

type OrgProfileCommonHeaderProps = {
  textToShow: string;
};

const OrgProfileCommonHeader = ({
  textToShow,
}: OrgProfileCommonHeaderProps) => {
  return (
    <div className="OrgProfileCommonHeaderContainer" style={{ backgroundImage: `url(${OrgProfileCommonHeaderImg})` }}>
      <div className="TextToShowDivContainer">
        <span className="TextToShowSpan">{textToShow}</span>
      </div>
    </div>
  );
};

export default OrgProfileCommonHeader;
