export interface OrgProfileBuilderData {
  QuestionOne: string;
  QuestionTwo: { email: string; phone: string };
  QuestionThree: string;
  QuestionFour: string;
  QuestionFive: string;
}

export interface OrgProfileBuilderState {
  isInvalid: boolean;
  validated: boolean;
  showSubmitReviewText: boolean;
  now: number;
}

export type OrgProfileBuilderActionType =
  | { type: "isInvalid"; payload: boolean }
  | { type: "validated"; payload: boolean }
  | { type: "showSubmitReviewText"; payload: boolean }
  | { type: "now"; payload: number };
