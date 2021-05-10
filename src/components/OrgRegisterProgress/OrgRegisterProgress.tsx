import React from "react";
import "./OrgRegisterProgress.css";

type OrgRegisterProgressProps = {
  currentOrgRegister: String;
};

const OrgRegisterProgress = ({
  currentOrgRegister,
}: OrgRegisterProgressProps) => {
  return (
    <div className="ProgressStep">
      <span className="Line Line1"></span>
      <span className="Circle Circle1"></span>
      <span className="HalfLine Line2"></span>
      <span
        className={`HalfLine ${
          currentOrgRegister === "details" ? "Line3" : ""
        }`}
      ></span>
      <span
        className={`Circle ${
          currentOrgRegister === "details" ? "Circle2" : ""
        }`}
      ></span>
      <span
        className={`Line ${currentOrgRegister === "details" ? "Line4" : ""}`}
      ></span>
    </div>
  );
};

export default OrgRegisterProgress;
