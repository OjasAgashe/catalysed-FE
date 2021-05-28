import React from "react";
import { OrgProgramDetailsState } from "../../types/OrgProgramDetails";

type GeneralProgramDetailsProps = {
  state: OrgProgramDetailsState;
};

const GeneralProgramDetails = ({ state }: GeneralProgramDetailsProps) => {
  return (
    <div className="GeneralProgramDetailsContainer">
      <div className="FormDetailsText">Program Details</div>

      <div className="GeneralProgramDetailsDataContainer">
        <div className="TitleDataContainer">
          <div className="CreateProgramFormText">Title&nbsp;:&nbsp;</div>
          <div className="Data">{state.responseData?.title}</div>
        </div>

        <div className="DescriptionDataContainer">
          <div className="CreateProgramFormText">Description&nbsp;:&nbsp;</div>
          <div className="Data">{state.responseData?.description}</div>
        </div>

        <div className="TSDateDataContainer">
          <span className="CreateProgramFormText">
            Tentative Start Date&nbsp;:&nbsp;
          </span>
          <span className="Data">{state.responseData?.tentativeStartDate}</span>
        </div>

        <div className="DurationDataContainer">
          <span className="CreateProgramFormText">Duration&nbsp;:&nbsp;</span>
          <span className="Data">{state.responseData?.durationInMonths}</span>
          <span> months</span>
        </div>

        <div className="ModeDataContainer">
          <span className="CreateProgramFormText">Mode&nbsp;:&nbsp;</span>
          <span className="Data">{state.responseData?.mode}</span>
        </div>

        <div className="LangReqDataContainer">
          <div className="CreateProgramFormText">
            Language Requirements&nbsp;:&nbsp;
          </div>

          <ul className="LanguagePreviewer">
            {state.responseData?.languageRequirements
              .split(",")
              .map((language, index) => (
                <li key={index} className="LanguageLi">
                  {language}{" "}
                </li>
              ))}
          </ul>
        </div>

        <div className="AgeLimitDataContainer">
          <span className="CreateProgramFormText">Age Limit&nbsp;:&nbsp;</span>

          <span>
            <span className="CreateProgramFormText From">
              From&nbsp;-&nbsp;
            </span>
            <span className="Data">{state.responseData?.ageLimit.from}</span>
          </span>

          <span>
            <span className="CreateProgramFormText To">To&nbsp;-&nbsp;</span>{" "}
            <span className="Data">{state.responseData?.ageLimit.to}</span>
          </span>
        </div>

        <div className="ProgramLinkDataContainer">
          <span className="CreateProgramFormText">URL&nbsp;:&nbsp;</span>
          <a
            target="blank"
            href={state.responseData?.programLink}
            className="Data"
          >
            {state.responseData?.programLink}
          </a>
        </div>
      </div>
    </div>
  );
};

export default GeneralProgramDetails;
