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
  type: string;
  name: string;
  email: string;
  custom_message: string;
}

export interface OrgInvitationDetailsData {
  id: number;
  name: string;
  email: string;
  type: string;
  sent_on: string;
  status: string;
}

export interface OrgProgramInvitationState {
  showInvitationModal: boolean;
  error: string;
  validated: boolean;
  loading: boolean;
  searchedName: string;
  searchedNotPresentText: string;
  selectedRadioForFilter: string;
  selectedRadioForFilterType: string;
  selectedRadioForSort: string;
}

export type OrgProgramInvitationActionType =
  | { type: "showInvitationModal"; payload: boolean }
  | { type: "loading"; payload: boolean }
  | { type: "error"; payload: string }
  | { type: "validated"; payload: boolean }
  | { type: "searchedName"; payload: string }
  | { type: "searchedNotPresentText"; payload: string }
  | { type: "selectedRadioForFilter"; payload: string }
  | { type: "selectedRadioForFilterType"; payload: string }
  | { type: "selectedRadioForSort"; payload: string };
