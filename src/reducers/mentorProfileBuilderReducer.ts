/*
 * This file contains Reducer Function of components/MentorProfileBuilderTypeform
 */

import {
  MentorProfileBuilderActionType,
  MentorProfileBuilderState,
} from "../types/MentorProfileBuilder";

export const mentorProfileBuilderReducer = (
  state: MentorProfileBuilderState,
  action: MentorProfileBuilderActionType
) => {
  const { type, payload } = action;
  return { ...state, [type]: payload };
};
