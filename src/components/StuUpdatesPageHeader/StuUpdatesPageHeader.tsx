import React from "react";
import { Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { StudentUpdatesHeader } from "../../assets/Illustrations/Illustrations";
import { STUDENT_UPDATES } from "../../constants/Routes";
import "./StuUpdatesPageHeader.css";

type StuUpdatesPageHeaderProps = {
  view: string;
  setView: React.Dispatch<React.SetStateAction<string>>;
};

const StuUpdatesPageHeader = ({ view, setView }: StuUpdatesPageHeaderProps) => {
  const history = useHistory();

  return (
    <div
      className="StuUpdatesPageHeaderContainer"
      style={{ backgroundImage: `url(${StudentUpdatesHeader})` }}
    >
      <div className="ConnectedTextDiv">Connected</div>

      <div className="StuUpdatesProgramsOrOrganisationsOptContainer">
        <Alert
          variant="warning"
          className="StuUpdatesProgramsOrOrganisationsOpt"
        >
          <div
            className={`${
              view === "Programs"
                ? "CurrentSelectedTab"
                : "NotCurrentSelectedTab"
            } StuUpdatesProgramsOpt`}
          >
            <button
              type="button"
              onClick={() => {
                setView("Programs");
                history.push(`${STUDENT_UPDATES}?view=PROGRAMS`);
              }}
            >
              Programs
            </button>
          </div>
          <div
            className={`${
              view === "Organisations"
                ? "CurrentSelectedTab"
                : "NotCurrentSelectedTab"
            }`}
          >
            <button
              type="button"
              onClick={() => {
                setView("Organisations");
                history.push(`${STUDENT_UPDATES}?view=ORGANISATIONS`);
              }}
            >
              Organisations
            </button>
          </div>
        </Alert>
      </div>
    </div>
  );
};

export default StuUpdatesPageHeader;
