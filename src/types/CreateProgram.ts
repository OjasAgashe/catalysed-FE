export interface CreateProgramData {
  title: string;
  description: string;
  tentativeStartDate: string;
  durationInMonths: string;
  mode: string;
  languageRequirements: string;
  ageLimit: { from: string; to: string };
  programLink: string;
  coordinator: {
    name: string;
    email: string;
    contact: { countryName: string; countryCode: string; number: string };
  };
  studentFields: {
    subjectRequirements: string;
    openings: string;
    applyBy: string;
    isPaid: boolean;
    programFees: string;
    generalInstructions: string;
  };
  mentorFields: {
    subjectRequirements: string;
    openings: string;
    applyBy: string;
    generalInstructions: string;
  };
}

export interface CreateProgramState {
  error: string;
  isInvalid: boolean;
  isLanguageSelected: boolean;
  loadingMessage: string;
  mentorApplyDate: Date | null;
  phoneValue: string;
  selectedTSDate: Date | null;
  selectedLanguages: string[];
  studentApplyDate: Date | null;
  validated: boolean;
  urlInput: string;
}

export type CreateProgramActionType =
  | { type: "selectedTSDate"; payload: Date | null }
  | { type: "selectedLanguages"; payload: string[] }
  | { type: "validated"; payload: boolean }
  | { type: "urlInput"; payload: string }
  | { type: "isInvalid"; payload: boolean }
  | { type: "phoneValue"; payload: string }
  | { type: "mentorApplyDate"; payload: Date | null }
  | { type: "studentApplyDate"; payload: Date | null }
  | { type: "isLanguageSelected"; payload: boolean }
  | { type: "error"; payload: string }
  | { type: "loadingMessage"; payload: string };
