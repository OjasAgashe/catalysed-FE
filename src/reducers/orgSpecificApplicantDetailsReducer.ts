import {
  OrgSpecificApplicantDetailsActionType,
  OrgSpecificApplicantDetailsState,
} from "../types/OrgSpecificApplicantDetails";

export const orgSpecificApplicantDetailsReducer = (
  state: OrgSpecificApplicantDetailsState,
  action: OrgSpecificApplicantDetailsActionType
) => {
  const { type, payload } = action;
  return { ...state, [type]: payload };
};
