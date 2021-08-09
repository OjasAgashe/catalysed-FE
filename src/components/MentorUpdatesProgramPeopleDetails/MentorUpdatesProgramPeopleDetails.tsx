import React, { useEffect, useState } from "react";
import { MentorUpdatesProgramPeopleResponse } from "../../types/MentorUpdatesProgramDetails";
import "../StuUpdatesProgramPeopleDetails/StuUpdatesProgramPeopleDetails.css";
import StuUpdatesProgramPeopleMentorDetails from "../StuUpdatesProgramPeopleDetails/StuUpdatesProgramPeopleMentorDetails";

type MentorUpdatesProgramPeopleDetailsProps = {
  responseData: MentorUpdatesProgramPeopleResponse | null;
};

const MentorUpdatesProgramPeopleDetails = ({
  responseData,
}: MentorUpdatesProgramPeopleDetailsProps) => {
  const [noOfStudents, setNoOfStudents] = useState<number>(0);
  const [noOfMentors, setNoOfMentors] = useState<number>(0);

  useEffect(() => {
    setNoOfStudents(
      responseData === null
        ? 0
        : responseData.studentParticipants === null
        ? 0
        : responseData.studentParticipants.length
    );
    setNoOfMentors(
      responseData === null
        ? 0
        : responseData.mentorParticipants === null
        ? 0
        : responseData.mentorParticipants.length
    );
  }, [responseData]);

  return (
    <div className="StuUpdatesProgramPeopleDetails">
      <div className="StuUpdatesProgramPeopleDetailsContainer">
        <div className="ProgramPeopleMentor">
          <div className="MentorTextDiv">Mentor</div>

          {responseData?.mentorParticipants && (
            <>
              {responseData.mentorParticipants.map((mentor, index) => {
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
        <div className="ProgramPeopleMentor">
          <div className="StudentTextNCountContainer">
            <div>Other Students</div>
            <div className="StudentCountDiv">{noOfStudents} Students</div>
          </div>
          {responseData?.studentParticipants && (
            <>
              {responseData.studentParticipants.map((student, index) => {
                if (index !== noOfStudents - 1) {
                  return (
                    <StuUpdatesProgramPeopleMentorDetails mentor={student} />
                  );
                }

                return (
                  <StuUpdatesProgramPeopleMentorDetails
                    mentor={student}
                    classNames="LastMentor"
                  />
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MentorUpdatesProgramPeopleDetails;
