/*
 * This file contains Reducer Function of pages/StudentHomePage
 */

import { StudentHomeActionType, StudentHomeState } from "../types/StudentHome";

export const studentHomeReducer = (
  state: StudentHomeState,
  action: StudentHomeActionType
) => {
  const { type, payload } = action;
  return { ...state, [type]: payload };
};
