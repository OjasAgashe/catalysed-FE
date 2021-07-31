import React from "react";
import { Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { StudentUpdatesHeader } from "../../assets/Illustrations/Illustrations";
import { MENTOR, STUDENT } from "../../constants/Entities";
import { MENTOR_UPDATES, STUDENT_UPDATES } from "../../constants/Routes";
import { StudentUpdatesCommonActionType } from "../../types/StudentUpdates";
import "./StuUpdatesPageHeader.css";

type StuUpdatesPageHeaderProps = {
  view: string;
  dispatch: React.Dispatch<StudentUpdatesCommonActionType>;
  entity: string;
};

const StuUpdatesPageHeader = ({
  view,
  dispatch,
  entity,
}: StuUpdatesPageHeaderProps) => {
  const history = useHistory();

  const handleProgramsBtnClick = () => {
    dispatch({ type: "view", payload: "Programs" });

    if (entity === STUDENT) history.push(`${STUDENT_UPDATES}?view=PROGRAMS`);
    else if (entity === MENTOR) history.push(`${MENTOR_UPDATES}?view=PROGRAMS`);
  };

  const handleOrganisationsBtnClick = () => {
    dispatch({ type: "view", payload: "Organisations" });

    if (entity === STUDENT)
      history.push(`${STUDENT_UPDATES}?view=ORGANISATIONS`);
    else if (entity === MENTOR)
      history.push(`${MENTOR_UPDATES}?view=ORGANISATIONS`);
  };

  const handleApplicationsBtnClick = () => {
    dispatch({ type: "view", payload: "Applications" });

    if (entity === STUDENT)
      history.push(`${STUDENT_UPDATES}?view=APPLICATIONS`);
    else if (entity === MENTOR)
      history.push(`${MENTOR_UPDATES}?view=APPLICATIONS`);
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
            } StuUpdatesOrganisationsOpt`}
          >
            <button type="button" onClick={handleOrganisationsBtnClick}>
              Organisations
            </button>
          </div>
          <div
            className={`${
              view === "Applications"
                ? "CurrentSelectedTab"
                : "NotCurrentSelectedTab"
            }`}
          >
            <button type="button" onClick={handleApplicationsBtnClick}>
              Applications
            </button>
          </div>
        </Alert>
      </div>
    </div>
  );
};

export default StuUpdatesPageHeader;
