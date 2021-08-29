/*
* This file contains Reducer Function of pages/MentorProfileEdit
 */

import {
  MentorProfileEditActionType,
  MentorProfileEditState,
} from "../types/MentorProfileEdit";

export const mentorProfileEditReducer = (
  state: MentorProfileEditState,
  action: MentorProfileEditActionType
) => {
  const { type, payload } = action;
  return { ...state, [type]: payload };
};
