export interface MentorProfileBuilderData {
  QuestionOne: string;
  QuestionTwo: string;
  QuestionThree: { country: string; city: string };
  QuestionFour: string;
  QuestionFive: string;
  QuestionSix: { yes_no: string; yoe: string };
  QuestionSeven: string;
  QuestionEight: { email: string; phone: string };
  QuestionNine: string;
  QuestionTen: string;
}

export interface MentorProfileBuilderState {
  isInvalid: boolean;
  validated: boolean;
  showSubmitReviewText: boolean;
  isProfMentorYes: boolean;
}

export type MentorProfileBuilderActionType =
  | { type: "isInvalid"; payload: boolean }
  | { type: "validated"; payload: boolean }
  | { type: "showSubmitReviewText"; payload: boolean }
  | { type: "isProfMentorYes"; payload: boolean };
