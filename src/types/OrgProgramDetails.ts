import { CreateProgramData } from "./CreateProgram";

export interface OrgProgramDetailsState {
  loading: boolean;
  error: string;
  responseData: CreateProgramData | null;
}

export type OrgProgramDetailsActionType =
  | { type: "loading"; payload: boolean }
  | { type: "error"; payload: string }
  | { type: "responseData"; payload: CreateProgramData | null };
