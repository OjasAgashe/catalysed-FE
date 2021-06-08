import { GetProgramMetaListData } from "./OrgViewSearchProgram";

export interface OrgHomeState {
  loading: boolean;
  programsStartingThisMonth: GetProgramMetaListData[];
  ongoingPrograms: GetProgramMetaListData[];
}

export type OrgHomeActionType =
  | { type: "loading"; payload: boolean }
  | { type: "programsStartingThisMonth"; payload: GetProgramMetaListData[] }
  | { type: "ongoingPrograms"; payload: GetProgramMetaListData[] };
