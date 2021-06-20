import React from "react";
import { OrgDirectoryDetailsGirl } from "../../assets/Illustrations/Illustrations";

type SectionTwoProps = {
  fakeData: {
    full_name: string;
    age: number;
    gender: string;
    contact: {
      phone: string;
      email: string;
    };
    school_or_organisation: string;
    address: {
      city: string;
      country: string;
    };
    known_languages: string[];
    professionally_get_mentored: string;
    stable_connection: string;
    device_most_prefer: string;
  };
};

const SectionTwo = ({ fakeData }: SectionTwoProps) => {
  return (
    <div className="SectionTwo">
      <div className="SectionTwoFirstHalf">
        <div className="DataCard">
          <div className="DataCardSoO">
            <div className="CreateProgramFormText">
              School / Organisation&nbsp;:&nbsp;
            </div>
            <div className="Data">{fakeData.school_or_organisation}</div>
          </div>

          <div className="DataCardAddress">
            <div className="CreateProgramFormText">Address&nbsp;:&nbsp;</div>

            <div className="DataCardAddressCnC">
              <div className="DataCardAddressCity">
                <span className="CreateProgramFormText">city&nbsp;:&nbsp;</span>
                <span className="Data">{fakeData.address.city}</span>
                <span className="AddressComma">&nbsp;,</span>
              </div>

              <div className="DataCardAddressCountry">
                <span className="CreateProgramFormText">
                  country&nbsp;:&nbsp;
                </span>
                <span className="Data">{fakeData.address.country}</span>
              </div>
            </div>
          </div>

          <div className="DataCardKnownLanguage">
            <div className="CreateProgramFormText">
              Language Requirements&nbsp;:&nbsp;
            </div>

            <ul className="LanguagePreviewer">
              {fakeData.known_languages.map((language, index) => (
                <li key={index} className="LanguageLi">
                  {language}{" "}
                </li>
              ))}
            </ul>
          </div>

          <div className="DataCardProfessionallyMentor">
            <span className="CreateProgramFormText">
              Professionally Got Mentored&nbsp;:&nbsp;
            </span>
            <span className="Data">
              {fakeData.professionally_get_mentored}
            </span>
          </div>

          <div className="DataCardStableConnection">
            <span className="CreateProgramFormText">
              Has Stable Internet Connection&nbsp;:&nbsp;
            </span>
            <span className="Data">{fakeData.stable_connection}</span>
          </div>

          <div className="DataCardProfession">
            <span className="CreateProgramFormText">
              Device Most Prefer&nbsp;:&nbsp;
            </span>
            <span className="Data">{fakeData.device_most_prefer}</span>
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
