import React, { useEffect } from "react";
import { BiCheck } from "react-icons/bi";
import "./OrgRegisterProgress.css";

type OrgRegisterProgressProps = {
  currentOrgRegister: string;
};

const OrgRegisterProgress = ({
  currentOrgRegister,
}: OrgRegisterProgressProps) => {
  useEffect(() => {
    console.log(currentOrgRegister);
  });

  return (
    <div className="ProgressStepContainer">
      <div className="ProgressStep">
        <span
          className={`Circle CurrentCircle ${
            currentOrgRegister === "details" && "VisitedCircle"
          }`}
        >
          {currentOrgRegister === "details" ? (
            <BiCheck className="BiCheckIcon" />
          ) : (
            1
          )}
        </span>
        <span
          className={`Line CurrentLine ${
            currentOrgRegister === "details" && "VisitedLine"
          }`}
        ></span>
        <span
          className={`Line ${
            currentOrgRegister === "details" && "CurrentLine"
          }`}
        ></span>
        <span
          className={`Circle ${
            currentOrgRegister === "details" && "CurrentCircle"
          }`}
        >
          2
        </span>
      </div>
      <div className="ProgressText">
        <div>User Details</div>
        <div>Org Details</div>
      </div>
    </div>
  );
};

export default OrgRegisterProgress;
