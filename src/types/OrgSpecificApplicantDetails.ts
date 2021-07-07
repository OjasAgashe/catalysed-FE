import { OrgDirectoryDetailsCommonResponse } from "./OrganisationDirectory";

export interface OrgSpecificApplicantApplicationResponse {
  responseNumber: number;
  question: string;
  answer: string;
}

export interface OrgSpecificApplicantDetailsResponse {
  mentorDetails?: OrgDirectoryDetailsCommonResponse;
  studentDetails?: OrgDirectoryDetailsCommonResponse;
  applicationDetails: {
    id: number;
    userId: number;
    programId: number;
    applicantType: string;
    name: string;
    email: string;
    status: string;
    reapplied: boolean;
    appliedOn: string;
    viewedByOrg: boolean;
    applicationResponses: OrgSpecificApplicantApplicationResponse[];
  };
}

export interface OrgSpecificApplicantDetailsState {
  choosedOption: string;
  responseData: OrgSpecificApplicantDetailsResponse | null;
  loading: boolean;
  error: string;
}

export type OrgSpecificApplicantDetailsActionType =
  | { type: "choosedOption"; payload: string }
  | {
      type: "responseData";
      payload: OrgSpecificApplicantDetailsResponse | null;
    }
  | { type: "loading"; payload: boolean }
  | { type: "error"; payload: string };
