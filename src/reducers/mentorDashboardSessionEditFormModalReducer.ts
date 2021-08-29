/*
 * This file contains Reducer Function of components/MentorDashboardSessionEditformModal
 */

import {
  MentorDashboardSessionEditFormModalActionType,
  MentorDashboardSessionEditFormModalState,
} from "../types/MentorDashboardSessionDetails";

export const mentorDashboardSessionEditFormModalReducer = (
  state: MentorDashboardSessionEditFormModalState,
  action: MentorDashboardSessionEditFormModalActionType
) => {
  const { type, payload } = action;
  return { ...state, [type]: payload };
};
