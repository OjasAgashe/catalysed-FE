export interface GetProgramMetaListData {
  id: number;
  title: string;
  tentativeStartDate: string;
  durationInMonths: number;
  mode: string;
  languageRequirements: string;
  status: string;
}

export interface OrgViewSearchProgramState {
  loading: boolean;
  searchedTitle: string;
  searchedNotPresentText: string;
  selectedRadioForFilter: string;
  selectedRadioForSort: string;
}

export type OrgViewSearchProgramActionType =
  | { type: "loading"; payload: boolean }
  | { type: "searchedTitle"; payload: string }
  | { type: "searchedNotPresentText"; payload: string }
  | { type: "selectedRadioForFilter"; payload: string }
  | { type: "selectedRadioForSort"; payload: string };
