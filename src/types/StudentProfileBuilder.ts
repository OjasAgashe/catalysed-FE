/*
 * This file contains Types related to Student Profile Builder
 */

export interface StudentProfileBuilderData {
  birthYear: string;
  organization: string;
  location: { country: string; region: string };
  gender: string;
  primaryLanguage: string;
  previouslyMentored: boolean;
  stableConnection: boolean;
  contactDetails: {
    email: string;
    phone: { countryName: string; countryCode: string; number: string };
  };
  primaryDevice: string;
}

export interface StudentProfileBuilderState {
  isInvalid: boolean;
  validated: boolean;
  showSubmitReviewText: boolean;
  now: number;
  radioQuestion: number;
  submitClicked: boolean;
  phoneValue: string;
}

export type StudentProfileBuilderActionType =
  | { type: "isInvalid"; payload: boolean }
  | { type: "validated"; payload: boolean }
  | { type: "showSubmitReviewText"; payload: boolean }
  | { type: "now"; payload: number }
  | { type: "radioQuestion"; payload: number }
  | { type: "submitClicked"; payload: boolean }
  | { type: "phoneValue"; payload: string };
