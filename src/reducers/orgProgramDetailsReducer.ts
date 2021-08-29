/*
 * This file contains Reducer Function of pages/OrgProgramDetails
 */

import {
  OrgProgramDetailsActionType,
  OrgProgramDetailsState,
} from "../types/OrgProgramDetails";

export const orgProgramDetailsReducer = (
  state: OrgProgramDetailsState,
  action: OrgProgramDetailsActionType
) => {
  const { type, payload } = action;
  return { ...state, [type]: payload };
};
