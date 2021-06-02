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

export interface OrgInvitationCardData {
  name: string;
  email: string;
  custom_message: string;
}

export interface OrgProgramInvitationState {
  showInvitationModal: boolean;
  error: string;
  validated: boolean;
  loading: boolean;
}

export type OrgProgramInvitationActionType =
  | { type: "showInvitationModal"; payload: boolean }
  | { type: "loading"; payload: boolean }
  | { type: "error"; payload: string }
  | { type: "validated"; payload: boolean };
