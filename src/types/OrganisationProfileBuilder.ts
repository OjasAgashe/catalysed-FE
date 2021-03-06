/*
 * This file contains Types related to Organisation Profile Builder
 */

export interface OrgProfileBuilderData {
  workDescription: string;
  contactDetails: {
    email: string;
    phone: { countryName: string; countryCode: string; number: string };
  };
  yearOfInception: string;
  location: { country: string; region: string };
  primaryLanguage: string;
}

export interface OrgProfileBuilderState {
  isInvalid: boolean;
  validated: boolean;
  showSubmitReviewText: boolean;
  now: number;
  submitClicked: boolean;
  phoneValue: string;
}

export type OrgProfileBuilderActionType =
  | { type: "isInvalid"; payload: boolean }
  | { type: "validated"; payload: boolean }
  | { type: "showSubmitReviewText"; payload: boolean }
  | { type: "now"; payload: number }
  | { type: "submitClicked"; payload: boolean }
  | { type: "phoneValue"; payload: string };
