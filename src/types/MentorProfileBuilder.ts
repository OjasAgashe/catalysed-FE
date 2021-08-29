/*
 * This file contains Types related to Mentor Profile Builder
 */

export interface MentorProfileBuilderData {
  birthYear: string;
  organization: string;
  location: { country: string; region: string };
  gender: string;
  primaryLanguage: string;
  previouslyMentored: { yes_no: boolean; yoe: number };
  stableConnection: boolean;
  contactDetails: {
    email: string;
    phone: { countryName: string; countryCode: string; number: string };
  };
  qualification: string;
  profession: string;
}

export interface MentorProfileBuilderState {
  isInvalid: boolean;
  validated: boolean;
  showSubmitReviewText: boolean;
  isProfMentorYes: boolean;
  now: number;
  radioQuestion: number;
  submitClicked: boolean;
  phoneValue: string;
}

export type MentorProfileBuilderActionType =
  | { type: "isInvalid"; payload: boolean }
  | { type: "validated"; payload: boolean }
  | { type: "showSubmitReviewText"; payload: boolean }
  | { type: "isProfMentorYes"; payload: boolean }
  | { type: "now"; payload: number }
  | { type: "radioQuestion"; payload: number }
  | { type: "submitClicked"; payload: boolean }
  | { type: "phoneValue"; payload: string };
