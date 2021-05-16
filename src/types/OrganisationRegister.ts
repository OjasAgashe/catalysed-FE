export interface OrgRegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  orgDetails: {
    name: string;
    description: string;
    orgWebsite: string;
    socialMedia: {
      code: string;
      link: string;
    };
  };
}

export interface OrgRegisterState {
  currentOrgRegister: string;
  loading: boolean;
  emailSent: boolean;
  processing: boolean;
}

export type OrgRegisterActionType =
  | { type: "currentOrgRegister"; payload: string }
  | { type: "loading"; payload: boolean }
  | { type: "emailSent"; payload: boolean }
  | { type: "processing"; payload: boolean };

export interface OrgRegisterUserState {
  validated: boolean;
  showPassword: boolean;
  showConfirmPassword: boolean;
  passwordFeedback: string;
  passwordIsInvalid: boolean;
  confirmPassword: string;
  confirmPasswordFeedback: string;
  confirmPasswordIsInvalid: boolean;
}

export type OrgRegisterUserActionType =
  | { type: "validated"; payload: boolean }
  | { type: "showPassword"; payload: boolean }
  | { type: "showConfirmPassword"; payload: boolean }
  | { type: "passwordFeedback"; payload: string }
  | { type: "passwordIsInvalid"; payload: boolean }
  | { type: "confirmPassword"; payload: string }
  | { type: "confirmPasswordFeedback"; payload: string }
  | { type: "confirmPasswordIsInvalid"; payload: boolean };

export interface OrgRegisterDetailsState {
  dropdownSelected: string;
  validated: boolean;
  orgNameFeedback: string;
  orgNameIsInvalid: boolean;
  socialMediaLink: string;
  socialMediaFeedback: string;
  socialMediaLinkIsInvalid: boolean;
  error: string;
}

export type OrgRegisterDetailsActionType =
  | { type: "dropdownSelected"; payload: string }
  | { type: "validated"; payload: boolean }
  | { type: "orgNameFeedback"; payload: string }
  | { type: "orgNameIsInvalid"; payload: boolean }
  | { type: "socialMediaLink"; payload: string }
  | { type: "socialMediaFeedback"; payload: string }
  | { type: "socialMediaLinkIsInvalid"; payload: boolean }
  | { type: "error"; payload: string };
