import React, { useEffect, useState } from "react";
import "./StuUpdatesProgramPeopleDetails.css";
import { FaUserCircle } from "react-icons/fa";

import { StuUpdatesProgramPeopleResponse } from "../../types/StuUpdatesProgramDetails";
import StuUpdatesProgramPeopleMentorDetails from "./StuUpdatesProgramPeopleMentorDetails";

type StuUpdatesProgramPeopleDetailsProps = {
  responseData: StuUpdatesProgramPeopleResponse | null;
};

const StuUpdatesProgramPeopleDetails = ({
  responseData,
}: StuUpdatesProgramPeopleDetailsProps) => {
  /*
   * To store the total number of Students and Mentors
   */
  const [noOfStudents, setNoOfStudents] = useState<number>(0);
  const [noOfMentors, setNoOfMentors] = useState<number>(0);

  useEffect(() => {
    // Set the number of Students
    setNoOfStudents(
      responseData === null
        ? 0
        : responseData.students === null
        ? 0
        : responseData.students.length
    );

    // Set the number of Mentors
    setNoOfMentors(
      responseData === null
        ? 0
        : responseData.mentors === null
        ? 0
        : responseData.mentors.length
    );
  }, [responseData]);

  return (
    <div className="StuUpdatesProgramPeopleDetails">
      <div className="StuUpdatesProgramPeopleDetailsContainer">
        <div className="ProgramPeopleMentor">
          <div className="MentorTextDiv">Mentor</div>

          {responseData?.mentors && (
            <>
              {responseData.mentors.map((mentor, index) => {
                if (index !== noOfMentors - 1) {
                  return (
                    <StuUpdatesProgramPeopleMentorDetails mentor={mentor} />
                  );
                }
                return (
                  <StuUpdatesProgramPeopleMentorDetails
                    mentor={mentor}
                    classNames="LastMentor"
                  />
                );
              })}
            </>
          )}
        </div>
        <div className="ProgramPeopleStudents">
          <div className="StudentTextNCountContainer">
            <div>Other Students</div>
            <div className="StudentCountDiv">{noOfStudents} Students</div>
          </div>
          {responseData?.students && (
            <>
              {responseData.students.map((student, index) => {
                if (index !== noOfStudents - 1) {
                  return (
                    <div className="StudentUserDetailsContainer">
                      <FaUserCircle className="UserIcon" />
                      <div className="StudentNameDiv">
                        <span className="CreateProgramFormText">{student}</span>
                      </div>
                    </div>
                  );
                }

                return (
                  <div className="StudentUserDetailsContainer LastStudent">
                    <FaUserCircle className="UserIcon" />
                    <div className="StudentNameDiv">
                      <span className="CreateProgramFormText">{student}</span>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StuUpdatesProgramPeopleDetails;
