import React from "react";
import { OrgDirectoryDetailsGirl } from "../../assets/Illustrations/Illustrations";
import { OrgDirectoryDetailsCommonState } from "../../types/OrganisationDirectory";

type SectionTwoProps = {
  state: OrgDirectoryDetailsCommonState;
};

const SectionTwo = ({ state }: SectionTwoProps) => {
  return (
    <div className="SectionTwo">
      <div className="SectionTwoFirstHalf">
        <div className="DataCard">
          <div className="DataCardSoO">
            <div className="CreateProgramFormText">
              School / Organisation&nbsp;:&nbsp;
            </div>
            <div className="Data">{state.responseData?.organization}</div>
          </div>

          <div className="DataCardAddress">
            <div className="CreateProgramFormText">Location&nbsp;:&nbsp;</div>

            <div className="DataCardAddressCnC">
              <div className="DataCardAddressCity">
                <span className="CreateProgramFormText">
                  region&nbsp;:&nbsp;
                </span>
                <span className="Data">
                  {state.responseData?.location.region}
                </span>
                <span className="AddressComma">&nbsp;,</span>
              </div>

              <div className="DataCardAddressCountry">
                <span className="CreateProgramFormText">
                  country&nbsp;:&nbsp;
                </span>
                <span className="Data">
                  {state.responseData?.location.country}
                </span>
              </div>
            </div>
          </div>

          <div className="DataCardKnownLanguage">
            <span className="CreateProgramFormText">
              Primary Language&nbsp;:&nbsp;
            </span>

            <span className="LanguageLi">
              {state.responseData?.primaryLanguage}
            </span>
          </div>

          <div className="DataCardProfessionallyMentor">
            <span className="CreateProgramFormText">
              Professionally Mentored Ever&nbsp;:&nbsp;
            </span>
            <span className="Data">
              {state.responseData?.previouslyMentored ? "Yes" : "No"}
            </span>
          </div>

          <div className="DataCardExperience">
            <span className="CreateProgramFormText">
              Experience&nbsp;:&nbsp;
            </span>
            <span className="Data">
              {state.responseData?.experience}&nbsp;years
            </span>
          </div>

          <div className="DataCardStableConnection">
            <span className="CreateProgramFormText">
              Has Stable Internet Connection&nbsp;:&nbsp;
            </span>
            <span className="Data">
              {state.responseData?.stableConnection ? "Yes" : "No"}
            </span>
          </div>

          <div className="DataCardAcademicQualification">
            <div className="CreateProgramFormText">
              Academic Qualification&nbsp;:&nbsp;
            </div>
            <div className="Data">{state.responseData?.qualification}</div>
          </div>

          <div className="DataCardProfession">
            <span className="CreateProgramFormText">
              Profession&nbsp;:&nbsp;
            </span>
            <span className="Data">{state.responseData?.profession}</span>
          </div>
        </div>
      </div>

      <div className="SectionTwoSecondHalf">
        <img src={`${OrgDirectoryDetailsGirl}`} alt="section two girl svg" />
      </div>
    </div>
  );
};

export default SectionTwo;
