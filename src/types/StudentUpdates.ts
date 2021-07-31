import { CreateProgramData } from "./CreateProgram";

export interface StudentUpdatesCommonResponse {
  programId: number;
  programName: string;
  applicationId: number;
  status: string;
  appliedOn: string;
}

export interface StudentUpdatesCommonState {
  view: string;
  loading: boolean;
  searchedName: string;
  selectedRadioForSort: string;
  selectedRadioForFilter: string;
  searchedNameNotFound: string;
  error: string;
  responseData: StudentUpdatesCommonResponse[] | null;
  filteredResponseData: StudentUpdatesCommonResponse[] | null;
}

export type StudentUpdatesCommonActionType =
  | { type: "view"; payload: string }
  | { type: "loading"; payload: boolean }
  | { type: "searchedName"; payload: string }
  | { type: "selectedRadioForSort"; payload: string }
  | { type: "selectedRadioForFilter"; payload: string }
  | { type: "searchedNameNotFound"; payload: string }
  | { type: "error"; payload: string }
  | { type: "responseData"; payload: StudentUpdatesCommonResponse[] | null }
  | {
      type: "filteredResponseData";
      payload: StudentUpdatesCommonResponse[] | null;
    };

export interface StudentUpdatesCommonValues {
  filterApprovedResponseData: false | StudentUpdatesCommonResponse[];
  filterPendingResponseData: false | StudentUpdatesCommonResponse[];
  filterRejectedResponseData: false | StudentUpdatesCommonResponse[];
  filterApprovedTempFilteredData: (
    tempFilteredData: StudentUpdatesCommonResponse[]
  ) => StudentUpdatesCommonResponse[];
  filterPendingTempFilteredData: (
    tempFilteredData: StudentUpdatesCommonResponse[]
  ) => StudentUpdatesCommonResponse[];
  filterRejectedTempFilteredData: (
    tempFilteredData: StudentUpdatesCommonResponse[]
  ) => StudentUpdatesCommonResponse[];
  sortDateByLatestUsing: (
    obj1: StudentUpdatesCommonResponse,
    obj2: StudentUpdatesCommonResponse
  ) => 1 | -1;
  sortDateByOldestUsing: (
    obj1: StudentUpdatesCommonResponse,
    obj2: StudentUpdatesCommonResponse
  ) => 1 | -1;
}

export interface StudentUpdatesApplicationDetailsResponse {
  applicationId: number;
  status: string;
  appliedOn: string;
  applicationResponses:
    | {
        responseNumber: number;
        question: string;
        answer: string;
      }[]
    | null;
  programDetails: CreateProgramData | null;
}

export interface StudentUpdatesApplicationDetailsState {
  choosedOption: string;
  responseData: StudentUpdatesApplicationDetailsResponse | null;
  loading: boolean;
  error: string;
}

export type StudentUpdatesApplicationDetailsActionType =
  | { type: "choosedOption"; payload: string }
  | {
      type: "responseData";
      payload: StudentUpdatesApplicationDetailsResponse | null;
    }
  | { type: "loading"; payload: boolean }
  | { type: "error"; payload: string };
