import { GetProgramMetaListData } from "./OrgViewSearchProgram";

export interface OrgHomeDataResponse {
  orgName: string;
  studentSummary: {
    total: number;
    newThisMonth: number;
  };
  mentorSummary: {
    total: number;
    newThisMonth: number;
  };
  applicationsSummary: {
    mentorDetails: {
      pending: number;
      notViewed: number;
    };
    studentDetails: {
      pending: number;
      notViewed: number;
    };
  };
  invitationsSummary: {
    total: number;
    accepted: number;
    pending: number;
  };
}

export interface OrgHomeState {
  loading: boolean;
  programsStartingThisMonth: GetProgramMetaListData[];
  ongoingPrograms: GetProgramMetaListData[];
  responseData: OrgHomeDataResponse | null;
}

export type OrgHomeActionType =
  | { type: "loading"; payload: boolean }
  | { type: "programsStartingThisMonth"; payload: GetProgramMetaListData[] }
  | { type: "ongoingPrograms"; payload: GetProgramMetaListData[] }
  | { type: "responseData"; payload: OrgHomeDataResponse | null };
