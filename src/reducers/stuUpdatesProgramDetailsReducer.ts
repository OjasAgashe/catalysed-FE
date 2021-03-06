/*
 * This file contains Reducer Function of pages/StuUpdatesProgramDetails
 */

import {
  StuUpdatesProgramDetailsActionType,
  StuUpdatesProgramDetailsState,
} from "../types/StuUpdatesProgramDetails";

export const stuUpdatesProgramDetailsReducer = (
  state: StuUpdatesProgramDetailsState,
  action: StuUpdatesProgramDetailsActionType
) => {
  const { type, payload } = action;
  return { ...state, [type]: payload };
};
