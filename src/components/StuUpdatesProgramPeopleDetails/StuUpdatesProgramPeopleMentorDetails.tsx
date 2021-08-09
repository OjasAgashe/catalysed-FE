import React from "react";
// @ts-ignore
import ReactCountryFlag from "react-country-flag";
import { getCode } from "country-list";
import { FaUserCircle } from "react-icons/fa";
import { StuUpdatesProgramPeopleMentorResponse } from "../../types/StuUpdatesProgramDetails";

type StuUpdatesProgramPeopleMentorDetailsProps = {
  mentor: StuUpdatesProgramPeopleMentorResponse;
  classNames?: string;
};

const StuUpdatesProgramPeopleMentorDetails = ({
  mentor,
  classNames = "",
}: StuUpdatesProgramPeopleMentorDetailsProps) => {
  return (
    <div className={`MentorUserDetailsContainer ${classNames}`}>
      <FaUserCircle className="UserIcon MentorUserIcon" />
      <div className="NameNContactDetailsContainer">
        <div>
          <span className="CreateProgramFormText">
            {mentor.firstName} {mentor.lastName}
          </span>
        </div>
        <div>
          <div className="CreateProgramFormText">Contact</div>

          <div className="PhoneNEmailContactContainer">
            <div>
              <span className="CreateProgramFormText">phone&nbsp;:&nbsp;</span>
              <span className="PhoneNumberDataContainer">
                <ReactCountryFlag
                  countryCode={getCode(mentor.phone.countryName)}
                  svg
                  style={{
                    width: "1.5em",
                    height: "1.35em",
                    boxShadow: "2px 2px 8px var(--blue-gray-300",
                    padding: "0",
                  }}
                />
                &nbsp;&nbsp;
                <span className="Data">{mentor.phone.countryCode}</span>
                &nbsp;
                <span className="Data">{mentor.phone.number}</span>
              </span>
              <span className="PhoneComma">&nbsp;,</span>
            </div>

            <div>
              <span className="CreateProgramFormText">email&nbsp;:&nbsp;</span>
              <span className="Data EmailData">{mentor.email}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StuUpdatesProgramPeopleMentorDetails;
