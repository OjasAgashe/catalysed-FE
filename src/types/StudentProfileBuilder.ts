export interface StudentProfileBuilderData {
  QuestionOne: string;
  QuestionTwo: string;
  QuestionThree: { country: string; city: string };
  QuestionFour: string;
  QuestionFive: string;
  QuestionSix: string;
  QuestionSeven: string;
  QuestionEight: { email: string; phone: string };
  QuestionNine: string;
}

export interface StudentProfileBuilderState {
  isInvalid: boolean;
  validated: boolean;
  showSubmitReviewText: boolean;
}

export type StudentProfileBuilderActionType =
  | { type: "isInvalid"; payload: boolean }
  | { type: "validated"; payload: boolean }
  | { type: "showSubmitReviewText"; payload: boolean };
