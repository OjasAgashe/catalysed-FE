/*
 * This file contains Types related to Org View Search Program
 */

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
  selectedRadioForFilterMode: string;
  selectedRadioForFilterCategory: string;
  selectedRadioForSort: string;
  selectedRadioForDateSort: string;
}

export type OrgViewSearchProgramActionType =
  | { type: "loading"; payload: boolean }
  | { type: "searchedTitle"; payload: string }
  | { type: "searchedNotPresentText"; payload: string }
  | { type: "selectedRadioForFilter"; payload: string }
  | { type: "selectedRadioForFilterMode"; payload: string }
  | { type: "selectedRadioForFilterCategory"; payload: string }
  | { type: "selectedRadioForSort"; payload: string }
  | { type: "selectedRadioForDateSort"; payload: string };
