export interface MentorProfileEditData {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  birthYear: string;
  organization: string;
  gender: string;
  qualification: string;
  profession: string;
  stableConnection: boolean;
  previouslyMentored: boolean;
  experience: number;
  primaryLanguage: string;
  phone: {
    countryCode: string;
    countryName: string;
    number: string;
  };
  address: {
    country: string;
    region: string;
  };
}

export interface MentorProfileEditState {
  loading: boolean;
  loadingMessage: string;
  error: string;
  putCallError: string;
  validated: boolean;
  phoneValueIsInvalid: boolean;
  dataHasChanged: boolean;
  showModal: boolean;
  leave: boolean;
  stay: boolean;
  navigateToPath: string;
  responseData: MentorProfileEditData | null;
  phoneValue: string;
}

export type MentorProfileEditActionType =
  | { type: "loading"; payload: boolean }
  | { type: "loadingMessage"; payload: string }
  | { type: "error"; payload: string }
  | { type: "putCallError"; payload: string }
  | { type: "validated"; payload: boolean }
  | { type: "phoneValueIsInvalid"; payload: boolean }
  | { type: "dataHasChanged"; payload: boolean }
  | { type: "showModal"; payload: boolean }
  | { type: "leave"; payload: boolean }
  | { type: "stay"; payload: boolean }
  | { type: "navigateToPath"; payload: string }
  | { type: "responseData"; payload: MentorProfileEditData | null }
  | { type: "phoneValue"; payload: string };
