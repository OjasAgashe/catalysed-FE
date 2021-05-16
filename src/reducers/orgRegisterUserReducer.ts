import {
  OrgRegisterUserActionType,
  OrgRegisterUserState,
} from "../types/OrganisationRegister";

export const orgRegisterUserReducer = (
  state: OrgRegisterUserState,
  action: OrgRegisterUserActionType
) => {
  const { type, payload } = action;
  return { ...state, [type]: payload };
};
