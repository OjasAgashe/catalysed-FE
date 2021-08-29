/*
 * This file contains Reducer Function of pages/OrgProgramDetails
 */

import {
  OrgProgramApplicantActionType,
  OrgProgramApplicantState,
} from "../types/OrgProgramDetails";

export const orgProgramApplicantReducer = (
  state: OrgProgramApplicantState,
  action: OrgProgramApplicantActionType
) => {
  const { type, payload } = action;
  return { ...state, [type]: payload };
};
