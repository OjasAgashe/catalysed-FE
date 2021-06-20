import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { OrgDirectoryDetailsBoy } from "../../assets/Illustrations/Illustrations";

type SectionOneProps = {
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

const SectionOne = ({ fakeData }: SectionOneProps) => {
  return (
    <div className="SectionOne">
      <div className="SectionOneFirstHalf">
        <img src={`${OrgDirectoryDetailsBoy}`} alt="section one boy svg" />
      </div>

      <div className="SectionOneSecondHalf">
        <div className="DataCard">
          <div className="FormDetailsText">Personal Info</div>

          <div className="DataCardFullName">
            <span className="CreateProgramFormText">
              Full Name&nbsp;:&nbsp;
            </span>
            <span className="Data">{fakeData.full_name}</span>
          </div>

          <div className="DataCardAge">
            <span className="CreateProgramFormText">Age&nbsp;:&nbsp;</span>
            <span className="Data">{fakeData.age}</span>
          </div>

          <div className="DataCardGender">
            <span className="CreateProgramFormText">Gender&nbsp;:&nbsp;</span>
            <span className="Data">{fakeData.gender}</span>
          </div>

          <div className="DataCardContact">
            <div className="CreateProgramFormText">Contact&nbsp;:&nbsp;</div>

            <div className="DataCardContactPnE">
              <div className="DataCardContactPhone">
                <span className="CreateProgramFormText">
                  phone&nbsp;:&nbsp;
                </span>
                <span className="Data">{fakeData.contact.phone}</span>
                <span className="PhoneComma">&nbsp;,</span>
              </div>

              <div className="DataCardContactEmail">
                <span className="CreateProgramFormText">
                  email&nbsp;:&nbsp;
                </span>
                <OverlayTrigger
                  placement="bottom"
                  overlay={
                    <Tooltip id="datacard-email-tooltip">
                      {fakeData.contact.email}
                    </Tooltip>
                  }
                >
                  <span className="Data">
                    {fakeData.contact.email.length > 18
                      ? `${fakeData.contact.email.substring(0, 18)}...`
                      : fakeData.contact.email}
                  </span>
                </OverlayTrigger>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionOne;
