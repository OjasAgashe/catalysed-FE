export interface OrganisationDirectoryCommonResponse {
  id: number;
  type: string;
  name: string;
  email: string;
  topPrograms: string[];
}

export interface OrganisationDirectoryCommonState {
  title: string;
  loading: boolean;
  searchedName: string;
  searchedNameNotFound: boolean;
  error: string;
  responseData: OrganisationDirectoryCommonResponse[] | null;
  filteredResponseData: OrganisationDirectoryCommonResponse[] | null;
}

export type OrganisationDirectoryCommonActionType =
  | { type: "title"; payload: string }
  | { type: "loading"; payload: boolean }
  | { type: "searchedName"; payload: string }
  | { type: "searchedNameNotFound"; payload: boolean }
  | { type: "error"; payload: string }
  | {
      type: "responseData";
      payload: OrganisationDirectoryCommonResponse[] | null;
    }
  | {
      type: "filteredResponseData";
      payload: OrganisationDirectoryCommonResponse[] | null;
    };

export interface OrgDirectoryDetailsCommonResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: { countryCode: string; countryName: string; number: string };
  location: { country: string; region: string };
  primaryLanguage: string;
  birthYear: string;
  organization: string;
  gender: string;
  stableConnection: boolean;
  previouslyMentored: boolean;
  connectPrograms: { programId: number; status: string; title: string }[];
  qualification?: string;
  profession?: string;
  experience?: number;
  primaryDevice?: string;
}

export interface OrgDirectoryDetailsCommonState {
  choosedOption: string;
  responseData: OrgDirectoryDetailsCommonResponse | null;
  loading: boolean;
  error: string;
}

export type OrgDirectoryDetailsCommonActionType =
  | { type: "choosedOption"; payload: string }
  | {
      type: "responseData";
      payload: OrgDirectoryDetailsCommonResponse | null;
    }
  | { type: "loading"; payload: boolean }
  | { type: "error"; payload: string };

export interface OrgDirectoryDetailsCTPSectionState {
  filteredResponseData:
    | { programId: number; status: string; title: string }[]
    | null;
  selectedRadioForFilterState: string;
  noFilteredData: string;
}

export type OrgDirectoryDetailsCTPSectionActionType =
  | {
      type: "filteredResponseData";
      payload: { programId: number; status: string; title: string }[] | null;
    }
  | { type: "selectedRadioForFilterState"; payload: string }
  | { type: "noFilteredData"; payload: string };
