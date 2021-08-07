export interface StuSuggestedProgramApplicationData {
  id: null;
  userId?: number;
  programId: number;
  applicantType: string;
  name: null;
  email: null;
  status: string;
  reapplied: boolean;
  appliedOn: null;
  viewedByOrg: boolean;
  applicationResponses: {
    id: number;
    question: string;
    answer: string;
  }[];
}

export interface StuSuggestedProgramApplicationState {
  loading: boolean;
  error: string;
  validated: boolean;
  programTitle: string;
}

export type StuSuggestedProgramApplicationActionType =
  | { type: "loading"; payload: boolean }
  | { type: "error"; payload: string }
  | { type: "validated"; payload: boolean }
  | { type: "programTitle"; payload: string };
