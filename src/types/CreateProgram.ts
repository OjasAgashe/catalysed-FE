export interface CreateProgramState {
  selectedDate: Date | null;
  selectedLanguages: string[];
}

export type CreateProgramActionType =
  | { type: "selectedDate"; payload: Date | null }
  | { type: "selectedLanguages"; payload: string[] };
