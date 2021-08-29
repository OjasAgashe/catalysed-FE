/*
 * This file contains Types related to Mentor Updates Program Details
 */

export interface MentorUpdatesProgramPeopleStudentParticipantsResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: {
    countryCode: string;
    countryName: string;
    number: string;
  };
  location: {
    country: string;
    region: string;
  };
}

export interface MentorUpdatesProgramPeopleMentorParticipantsResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: {
    countryCode: string;
    countryName: string;
    number: string;
  };
  location: {
    country: string;
    region: string;
  };
}

export interface MentorUpdatesProgramPeopleResponse {
  programId: number;
  studentParticipants:
    | MentorUpdatesProgramPeopleStudentParticipantsResponse[]
    | null;
  mentorParticipants:
    | MentorUpdatesProgramPeopleMentorParticipantsResponse[]
    | null;
}
