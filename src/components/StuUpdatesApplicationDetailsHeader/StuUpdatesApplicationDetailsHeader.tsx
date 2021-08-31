import React, { useEffect } from "react";
import { Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { OrgProfileCommonHeaderImg } from "../../assets/Illustrations/Illustrations";
// import { MENTOR, STUDENT } from "../../constants/Entities";
// import { MENTOR_UPDATES, STUDENT_UPDATES } from "../../constants/Routes";
import {
  StudentUpdatesApplicationDetailsActionType,
  StudentUpdatesApplicationDetailsState,
} from "../../types/StudentUpdates";
import NestedPageBackBtn from "../NestedPageBackBtn/NestedPageBackBtn";
import "../OrgSpecificApplicantDetailsHeader/OrgSpecificApplicantDetailsHeader.css";

type StuUpdatesApplicationDetailsHeaderProps = {
  state: StudentUpdatesApplicationDetailsState;
  dispatch: React.Dispatch<StudentUpdatesApplicationDetailsActionType>;
  entity: string;
};

const StuUpdatesApplicationDetailsHeader = ({
  state,
  dispatch,
  entity,
}: StuUpdatesApplicationDetailsHeaderProps) => {
  const history = useHistory();

  useEffect(() => {
    /*
     * Set the document title, based on the current selected Tab
     */
    document.title = `Connected Application ${
      state.choosedOption === "Application" ? "Details" : "Program Details"
    } | CatalysEd`;
  }, [state.choosedOption]);

  // Function to handle click on Back button
  const handleNestedPageBackBtnClick = () => {
    // if (entity === STUDENT)
    //   history.push(`${STUDENT_UPDATES}?view=APPLICATIONS`);
    // else if (entity === MENTOR)
    //   history.push(`${MENTOR_UPDATES}?view=APPLICATIONS`);

    history.goBack();
  };

  return (
    <div
      className="OrgSpecificApplicantDetailsHeaderContainer"
      style={{ backgroundImage: `url(${OrgProfileCommonHeaderImg})` }}
    >
      <NestedPageBackBtn onClick={handleNestedPageBackBtnClick} />

      <div className="OrgSpecificApplicantDetailsHeaderHeroText">
        <span>{state.responseData?.programDetails?.title}</span>
      </div>

      <div className="OrgSpecificApplicantDetailsOptionContainer">
        <Alert variant="warning" className="OrgSpecificApplicantDetailsOption">
          <div
            className={`${
              state.choosedOption === "Application"
                ? "CurrentSelectedTab"
                : "NotCurrentSelectedTab"
            } OrgSpecificApplicantApplicationOpt`}
          >
            <button
              className="ApplicationBtnOpt"
              type="button"
              onClick={() => {
                dispatch({ type: "choosedOption", payload: "Application" });
              }}
            >
              Application
            </button>
          </div>
          <div
            className={`${
              state.choosedOption === "Program Details"
                ? "CurrentSelectedTab"
                : "NotCurrentSelectedTab"
            }`}
          >
            <button
              className="CtPBtnOpt"
              type="button"
              onClick={() => {
                dispatch({ type: "choosedOption", payload: "Program Details" });
              }}
            >
              Program Details
            </button>
          </div>
        </Alert>
      </div>
    </div>
  );
};

export default StuUpdatesApplicationDetailsHeader;
