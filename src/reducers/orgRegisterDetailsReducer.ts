import {
  OrgRegisterDetailsActionType,
  OrgRegisterDetailsState,
} from "../types/OrganisationRegister";

export const orgRegisterDetailsReducer = (
  state: OrgRegisterDetailsState,
  action: OrgRegisterDetailsActionType
) => {
  const { type, payload } = action;
  return { ...state, [type]: payload };
};
