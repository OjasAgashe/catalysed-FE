/*
 * This file contains Types related to Stu Updates Program Details
 */

import { CreateProgramData } from "./CreateProgram";
import { MentorUpdatesProgramPeopleResponse } from "./MentorUpdatesProgramDetails";

export interface StuUpdatesProgramDetailsState {
  loading: boolean;
  error: string;
  responseData: CreateProgramData | null;
}

export type StuUpdatesProgramDetailsActionType =
  | { type: "loading"; payload: boolean }
  | { type: "error"; payload: string }
  | { type: "responseData"; payload: CreateProgramData | null };

export interface StuUpdatesProgramPeopleMentorResponse {
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

export interface StuUpdatesProgramPeopleResponse {
  programId: number;
  mentors: StuUpdatesProgramPeopleMentorResponse[] | null;
  students: string[] | null;
}

export interface StuUpdatesProgramPeopleState {
  loading: boolean;
  error: string;
  programTitle: string;
  responseData:
    | StuUpdatesProgramPeopleResponse
    | MentorUpdatesProgramPeopleResponse
    | null;
}

export type StuUpdatesProgramPeopleActionType =
  | { type: "loading"; payload: boolean }
  | { type: "error"; payload: string }
  | { type: "programTitle"; payload: string }
  | {
      type: "responseData";
      payload:
        | StuUpdatesProgramPeopleResponse
        | MentorUpdatesProgramPeopleResponse
        | null;
    };
