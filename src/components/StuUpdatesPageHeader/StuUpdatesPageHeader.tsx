import React from "react";
import { Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { StudentUpdatesHeader } from "../../assets/Illustrations/Illustrations";
import { MENTOR, STUDENT } from "../../constants/Entities";
import { MENTOR_UPDATES, STUDENT_UPDATES } from "../../constants/Routes";
import "./StuUpdatesPageHeader.css";

type StuUpdatesPageHeaderProps = {
  view: string;
  setView: React.Dispatch<React.SetStateAction<string>>;
  entity: string;
};

const StuUpdatesPageHeader = ({
  view,
  setView,
  entity,
}: StuUpdatesPageHeaderProps) => {
  const history = useHistory();

  const handleProgramsBtnClick = () => {
    setView("Programs");

    if (entity === STUDENT) history.push(`${STUDENT_UPDATES}?view=PROGRAMS`);
    else if (entity === MENTOR) history.push(`${MENTOR_UPDATES}?view=PROGRAMS`);
  };

  const handleOrganisationsBtnClick = () => {
    setView("Organisations");

    if (entity === STUDENT)
      history.push(`${STUDENT_UPDATES}?view=ORGANISATIONS`);
    else if (entity === MENTOR)
      history.push(`${MENTOR_UPDATES}?view=ORGANISATIONS`);
  };

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
            <button type="button" onClick={handleProgramsBtnClick}>
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
            <button type="button" onClick={handleOrganisationsBtnClick}>
              Organisations
            </button>
          </div>
        </Alert>
      </div>
    </div>
  );
};

export default StuUpdatesPageHeader;
