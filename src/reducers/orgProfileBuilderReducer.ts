/*
 * This file contains Reducer Function of components/OrgProfileBuilderTypeform
 */

import {
  OrgProfileBuilderActionType,
  OrgProfileBuilderState,
} from "../types/OrganisationProfileBuilder";

export const orgProfileBuilderReducer = (
  state: OrgProfileBuilderState,
  action: OrgProfileBuilderActionType
) => {
  const { type, payload } = action;
  return { ...state, [type]: payload };
};
