/*
 * This file contains Reducer Function of pages/StudentUpdatesPage
 */

import {
  StudentUpdatesCommonActionType,
  StudentUpdatesCommonState,
} from "../types/StudentUpdates";

export const stuUpdatesReducer = (
  state: StudentUpdatesCommonState,
  action: StudentUpdatesCommonActionType
) => {
  const { type, payload } = action;
  return { ...state, [type]: payload };
};
