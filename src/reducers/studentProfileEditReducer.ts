/*
 * This file contains Reducer Function of pages/StudentProfileEdit
 */

import {
  StudentProfileEditActionType,
  StudentProfileEditState,
} from "../types/StudentProfileEdit";

export const studentProfileEditReducer = (
  state: StudentProfileEditState,
  action: StudentProfileEditActionType
) => {
  const { type, payload } = action;
  return { ...state, [type]: payload };
};
