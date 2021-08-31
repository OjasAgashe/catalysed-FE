import React from "react";
import { ProgramsApplicantsSummaryHeader } from "../../assets/Illustrations/Illustrations";
import "./StuUpdatesOrganisationDetailsCommon.css";
import "../OrgProgramDetailsCommon/OrgProgramDetailsCommon.css";
import { Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import {
  // MENTOR_UPDATES,
  MENTOR_UPDATES_DETAILS_ORGANISATION,
  // STUDENT_UPDATES,
  STUDENT_UPDATES_DETAILS_ORGANISATION,
} from "../../constants/Routes";
import { MENTOR, STUDENT } from "../../constants/Entities";
import {
  StudentUpdatesOrganisationDetailsActionType,
  StudentUpdatesOrganisationDetailsState,
} from "../../types/StudentUpdates";
import NestedPageBackBtn from "../NestedPageBackBtn/NestedPageBackBtn";

type StuUpdatesOrganisationDetailsCommonProps = {
  state: StudentUpdatesOrganisationDetailsState;
  dispatch: React.Dispatch<StudentUpdatesOrganisationDetailsActionType>;
  organisationId: number;
  entity: string;
};

const StuUpdatesOrganisationDetailsCommon = ({
  state,
  dispatch,
  organisationId,
  entity,
}: StuUpdatesOrganisationDetailsCommonProps) => {
  const history = useHistory();

  // Function handling click on Details Tab
  const handleDetailsBtnClick = () => {
    dispatch({ type: "choosedOption", payload: "Details" });

    if (entity === STUDENT)
      history.push(
        `${STUDENT_UPDATES_DETAILS_ORGANISATION}/${organisationId}/details`
      );
    else if (entity === MENTOR)
      history.push(
        `${MENTOR_UPDATES_DETAILS_ORGANISATION}/${organisationId}/details`
      );
  };

  // Function handling click on Programs Tab
  const handleProgramsBtnClick = () => {
    dispatch({ type: "choosedOption", payload: "Programs" });

    if (entity === STUDENT)
      history.push(
        `${STUDENT_UPDATES_DETAILS_ORGANISATION}/${organisationId}/programs`
      );
    else if (entity === MENTOR)
      history.push(
        `${MENTOR_UPDATES_DETAILS_ORGANISATION}/${organisationId}/programs`
      );
  };

  // Function handling click on Back button
  const handleNestedPageBackBtnClick = () => {
    // if (entity === STUDENT)
    //   history.push(`${STUDENT_UPDATES}?view=ORGANISATIONS`);
    // else if (entity === MENTOR)
    //   history.push(`${MENTOR_UPDATES}?view=ORGANISATIONS`);

    history.goBack();
  };

  return (
    <div
      className="StuUpdatesOrganisationDetailsCommonContainer"
      style={{ backgroundImage: `url(${ProgramsApplicantsSummaryHeader})` }}
    >
      <NestedPageBackBtn onClick={handleNestedPageBackBtnClick} />

      <div className="CommonProgramDetailsHeroText">
        <span>{state.responseData?.orgDetails?.name ?? ""}</span>
      </div>

      <div className="PDViewAndRouteLinksContainer">
        <Alert variant="warning" className="ProgramDetailsRouteLinks">
          <div
            className={`${
              state.choosedOption === "Details"
                ? "CurrentSelectedTab"
                : "NotCurrentSelectedTab"
            } ProgramDetailsLinkDiv`}
          >
            <button
              className="ProgramDetailsLink Link"
              type="button"
              onClick={handleDetailsBtnClick}
            >
              {/* Only for Styling Purpose className is used Here */}
              Details
            </button>
          </div>

          <div
            className={`${
              state.choosedOption === "Programs"
                ? "CurrentSelectedTab"
                : "NotCurrentSelectedTab"
            }`}
          >
            <button
              className="ApplicantsLink Link"
              type="button"
              onClick={handleProgramsBtnClick}
            >
              {/* Only for Styling Purpose className is used Here */}
              Programs
            </button>
          </div>
        </Alert>
      </div>
    </div>
  );
};

export default StuUpdatesOrganisationDetailsCommon;
