export interface OrgProfileEditData {
  email: string;
  firstName: string;
  lastName: string;
  organizationDetails: {
    address: {
      country: string;
      region: string;
    };
    workDescription: string;
    phone: {
      countryCode: string;
      countryName: string;
      number: string;
    };
    description: string;
    name: string;
    primaryLanguage: string;
    website: string;
    socialMediaCode: string;
    socialMediaLink: string;
    yearOfInception: string;
  };
}

export interface OrgProfileEditState {
  loading: boolean;
  loadingMessage: string;
  error: string;
  validated: boolean;
  phoneValueIsInvalid: boolean;
  socialLinkIsInvalid: boolean;
  websiteLinkIsInvalid: boolean;
  dataHasChanged: boolean;
  showModal: boolean;
  leave: boolean;
  stay: boolean;
  navigateToPath: string;
  responseData: OrgProfileEditData | null;
  phoneValue: string;
}

export type OrgProfileEditActionType =
  | { type: "loading"; payload: boolean }
  | { type: "loadingMessage"; payload: string }
  | { type: "error"; payload: string }
  | { type: "validated"; payload: boolean }
  | { type: "phoneValueIsInvalid"; payload: boolean }
  | { type: "socialLinkIsInvalid"; payload: boolean }
  | { type: "websiteLinkIsInvalid"; payload: boolean }
  | { type: "dataHasChanged"; payload: boolean }
  | { type: "showModal"; payload: boolean }
  | { type: "leave"; payload: boolean }
  | { type: "stay"; payload: boolean }
  | { type: "navigateToPath"; payload: string }
  | { type: "responseData"; payload: OrgProfileEditData | null }
  | { type: "phoneValue"; payload: string };
