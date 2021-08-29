/*
 * This file contains Reducer Function of pages/OrgViewSearchProgram
 */

import {
  OrgViewSearchProgramActionType,
  OrgViewSearchProgramState,
} from "../types/OrgViewSearchProgram";

export const orgViewSearchProgramReducer = (
  state: OrgViewSearchProgramState,
  action: OrgViewSearchProgramActionType
) => {
  const { type, payload } = action;
  return { ...state, [type]: payload };
};
