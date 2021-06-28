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

export interface OrgProgramParticipantData {
  id: number;
  email: string;
  firstName: string | null;
  lastName: string | null;
  userName: string;
  subscriptionType: string | null;
  password: string | null;
  roles: string | null;
  userType: string;
  active: boolean;
}

export interface OrgProgramParticipantState {
  showError: boolean;
  loading: boolean;
  programTitle: string;
  showMentorDetails: boolean;
  showStudentDetails: boolean;
  studentParticipantResponseData: OrgProgramParticipantData[] | null;
  mentorParticipantResponseData: OrgProgramParticipantData[] | null;
  selectedRadioForFilterState: string;
  searchedNotPresentText: string;
  searchedName: string;
}

export type OrgProgramParticipantActionType =
  | { type: "showError"; payload: boolean }
  | { type: "loading"; payload: boolean }
  | { type: "programTitle"; payload: string }
  | {
      type: "studentParticipantResponseData";
      payload: OrgProgramParticipantData[] | null;
    }
  | {
      type: "mentorParticipantResponseData";
      payload: OrgProgramParticipantData[] | null;
    }
  | { type: "showMentorDetails"; payload: boolean }
  | { type: "showStudentDetails"; payload: boolean }
  | { type: "selectedRadioForFilterState"; payload: string }
  | { type: "searchedNotPresentText"; payload: string }
  | { type: "searchedName"; payload: string };

export interface OrgProgramApplicantData {
  id: number;
  date_of_application: string;
  email: string;
  name: string;
  status: string;
  viewed: string;
}

export interface OrgProgramApplicantState {
  fakeData: OrgProgramApplicantData[];
  programTitle: string;
  showMentorDetails: boolean;
  showStudentDetails: boolean;
  searchedName: string;
  searchedNotPresentText: string;
  selectedDropdownForSortDoA: string;
  selectedDropdownForFilterStatus: string;
  selectedDropdownForFilterViewed: string;
}

export type OrgProgramApplicantActionType =
  | { type: "fakeData"; payload: OrgProgramApplicantData[] }
  | { type: "programTitle"; payload: string }
  | { type: "showMentorDetails"; payload: boolean }
  | { type: "showStudentDetails"; payload: boolean }
  | { type: "searchedName"; payload: string }
  | { type: "searchedNotPresentText"; payload: string }
  | { type: "selectedDropdownForSortDoA"; payload: string }
  | { type: "selectedDropdownForFilterStatus"; payload: string }
  | { type: "selectedDropdownForFilterViewed"; payload: string };

export type OrgProgramApplicantValues = {
  filteredResponseData: OrgProgramApplicantData[];
  filterAcceptedResponseData: OrgProgramApplicantData[];
  filterPendingResponseData: OrgProgramApplicantData[];
  filterRejectedResponseData: OrgProgramApplicantData[];
  filterViewedResponseData: OrgProgramApplicantData[];
  filterNotViewedResponseData: OrgProgramApplicantData[];

  setFilteredResponseData: React.Dispatch<
    React.SetStateAction<OrgProgramApplicantData[]>
  >;
  filterAcceptedTempFilteredData: (
    tempFilteredData: OrgProgramApplicantData[]
  ) => OrgProgramApplicantData[];
  filterPendingTempFilteredData: (
    tempFilteredData: OrgProgramApplicantData[]
  ) => OrgProgramApplicantData[];
  filterRejectedTempFilteredData: (
    tempFilteredData: OrgProgramApplicantData[]
  ) => OrgProgramApplicantData[];
  filterViewedTempFilteredData: (
    tempFilteredData: OrgProgramApplicantData[]
  ) => OrgProgramApplicantData[];
  filterNotViewedTempFilteredData: (
    tempFilteredData: OrgProgramApplicantData[]
  ) => OrgProgramApplicantData[];
};
