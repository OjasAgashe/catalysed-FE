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
    professionally_mentored_ever: string;
    experience: number;
    stable_connection: string;
    academic_qualification: string;
    profession: string;
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
              Professionally Mentored Ever&nbsp;:&nbsp;
            </span>
            <span className="Data">
              {fakeData.professionally_mentored_ever}
            </span>
          </div>

          <div className="DataCardExperience">
            <span className="CreateProgramFormText">
              Experience&nbsp;:&nbsp;
            </span>
            <span className="Data">{fakeData.experience}&nbsp;years</span>
          </div>

          <div className="DataCardStableConnection">
            <span className="CreateProgramFormText">
              Has Stable Internet Connection&nbsp;:&nbsp;
            </span>
            <span className="Data">{fakeData.stable_connection}</span>
          </div>

          <div className="DataCardAcademicQualification">
            <div className="CreateProgramFormText">
              Academic Qualification&nbsp;:&nbsp;
            </div>
            <div className="Data">{fakeData.academic_qualification}</div>
          </div>

          <div className="DataCardProfession">
            <span className="CreateProgramFormText">
              Profession&nbsp;:&nbsp;
            </span>
            <span className="Data">{fakeData.profession}</span>
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
