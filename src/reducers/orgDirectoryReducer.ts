/*
 * This file contains Reducer Function of pages/OrgDirectoryPage
 */

import {
  OrganisationDirectoryCommonActionType,
  OrganisationDirectoryCommonState,
} from "../types/OrganisationDirectory";

export const orgDirectoryReducer = (
  state: OrganisationDirectoryCommonState,
  action: OrganisationDirectoryCommonActionType
) => {
  const { type, payload } = action;
  return { ...state, [type]: payload };
};
