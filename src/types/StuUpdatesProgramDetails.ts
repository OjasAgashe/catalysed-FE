import { CreateProgramData } from "./CreateProgram";

export interface StuUpdatesProgramDetailsState {
  loading: boolean;
  error: string;
  responseData: CreateProgramData | null;
}

export type StuUpdatesProgramDetailsActionType =
  | { type: "loading"; payload: boolean }
  | { type: "error"; payload: string }
  | { type: "responseData"; payload: CreateProgramData | null };

export interface StuUpdatesProgramPeopleState {
  loading: boolean;
  error: string;
  programTitle: string;
}

export type StuUpdatesProgramPeopleActionType =
  | { type: "loading"; payload: boolean }
  | { type: "error"; payload: string }
  | { type: "programTitle"; payload: string };
