/*
 * This file contains Reducer Function of pages/OrgHomePage
 */

import { OrgHomeActionType, OrgHomeState } from "../types/OrgHome";

export const orgHomeReducer = (
  state: OrgHomeState,
  action: OrgHomeActionType
) => {
  const { type, payload } = action;
  return { ...state, [type]: payload };
};
