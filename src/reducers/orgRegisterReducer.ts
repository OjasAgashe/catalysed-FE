/*
 * This file contains Reducer Function of pages/OrganisationReducer
 */

import {
  OrgRegisterActionType,
  OrgRegisterState,
} from "../types/OrganisationRegister";

export const orgRegisterReducer = (
  state: OrgRegisterState,
  action: OrgRegisterActionType
) => {
  const { type, payload } = action;
  return { ...state, [type]: payload };
};
