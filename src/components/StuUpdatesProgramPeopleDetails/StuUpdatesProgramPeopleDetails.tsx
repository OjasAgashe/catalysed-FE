import React from "react";
import "./StuUpdatesProgramPeopleDetails.css";
import { FaUserCircle } from "react-icons/fa";

// @ts-ignore
import ReactCountryFlag from "react-country-flag";
import { getCode } from "country-list";

const StuUpdatesProgramPeopleDetails = () => {
  return (
    <div className="StuUpdatesProgramPeopleDetails">
      <div className="StuUpdatesProgramPeopleDetailsContainer">
        <div className="ProgramPeopleMentor">
          <div className="MentorTextDiv">Mentor</div>
          <div className="MentorUserDetailsContainer">
            <FaUserCircle className="UserIcon" />
            <div className="NameNContactDetailsContainer">
              <div>
                <span className="CreateProgramFormText">Oj</span>
              </div>
              <div>
                <div className="CreateProgramFormText">Contact</div>

                <div className="PhoneNEmailContactContainer">
                  <div>
                    <span className="CreateProgramFormText">
                      phone&nbsp;:&nbsp;
                    </span>
                    <span>
                      <ReactCountryFlag
                        countryCode={getCode("INDIA")}
                        svg
                        style={{
                          width: "1.5em",
                          height: "1.35em",
                          boxShadow: "2px 2px 8px var(--blue-gray-300",
                          padding: "0",
                        }}
                      />
                      &nbsp;&nbsp;
                      <span className="Data">+91</span>
                      &nbsp;
                      <span className="Data">0000099999</span>
                    </span>
                    <span className="PhoneComma">&nbsp;,</span>
                  </div>

                  <div>
                    <span className="CreateProgramFormText">
                      email&nbsp;:&nbsp;
                    </span>
                    <span className="Data">oj@gmail.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ProgramPeopleStudents">
          <div className="StudentTextNCountContainer">
            <div>Other Students</div>
            <div className="StudentCountDiv">2 Students</div>
          </div>
          <div className="StudentUserDetailsContainer StudentOne">
            <FaUserCircle className="UserIcon" />
            <div className="StudentNameDiv">
              <span className="CreateProgramFormText">Rahul Gautam</span>
            </div>
          </div>
          <div className="StudentUserDetailsContainer">
            <FaUserCircle className="UserIcon" />
            <div className="StudentNameDiv">
              <span className="CreateProgramFormText">John Deep</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StuUpdatesProgramPeopleDetails;
