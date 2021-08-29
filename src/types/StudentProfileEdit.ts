/*
 * This file contains Types related to Student Profile Edit
 */

export interface StudentProfileEditData {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  birthYear: string;
  organization: string;
  gender: string;
  stableConnection: boolean;
  primaryDevice: string;
  previouslyMentored: boolean;
  primaryLanguage: string;
  phone: {
    countryCode: string;
    countryName: string;
    number: string;
  };
  location: {
    country: string;
    region: string;
  };
}

export interface StudentProfileEditState {
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
  responseData: StudentProfileEditData | null;
  phoneValue: string;
}

export type StudentProfileEditActionType =
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
  | { type: "responseData"; payload: StudentProfileEditData | null }
  | { type: "phoneValue"; payload: string };
