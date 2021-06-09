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

export interface OrgInvitationPostData {
  id: string;
  programId: string;
  userId: string;
  emailId: string;
  name: string;
  userType: string;
  responseStatus: string | null;
  subject: string;
  message: string;
}

export interface OrgInvitationResponseData {
  id: number;
  programId: number;
  emailId: string;
  name: string;
  userType: string;
  responseStatus: string;
  subject: string;
  message: string;
  sentAt: string;
}

export interface OrgProgramInvitationState {
  reRenderComponent: boolean;
  showInvitationModal: boolean;
  error: string;
  formError: string;
  validated: boolean;
  loading: boolean;
  formLoadingMessage: string;
  searchedName: string;
  searchedNotPresentText: string;
  selectedRadioForFilter: string;
  selectedRadioForFilterType: string;
  selectedRadioForSort: string;
  programTitle: string;
  programStatus: string;
  responseData: OrgInvitationResponseData[] | null;
}

export type OrgProgramInvitationActionType =
  | { type: "reRenderComponent"; payload: boolean }
  | { type: "showInvitationModal"; payload: boolean }
  | { type: "loading"; payload: boolean }
  | { type: "formLoadingMessage"; payload: string }
  | { type: "error"; payload: string }
  | { type: "formError"; payload: string }
  | { type: "validated"; payload: boolean }
  | { type: "searchedName"; payload: string }
  | { type: "searchedNotPresentText"; payload: string }
  | { type: "selectedRadioForFilter"; payload: string }
  | { type: "selectedRadioForFilterType"; payload: string }
  | { type: "selectedRadioForSort"; payload: string }
  | { type: "programTitle"; payload: string }
  | { type: "programStatus"; payload: string }
  | { type: "responseData"; payload: OrgInvitationResponseData[] | null };
