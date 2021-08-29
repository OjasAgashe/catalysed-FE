/*
 * This file contains Reducer Function of components/MentorDashboardSessionDetailsForm
 */

import {
  MentorDashboardSessionDetailsFormActionType,
  MentorDashboardSessionDetailsFormState,
} from "../types/MentorDashboardSessionDetails";

export const mentorDashboardSessionDetailsFormReducer = (
  state: MentorDashboardSessionDetailsFormState,
  action: MentorDashboardSessionDetailsFormActionType
) => {
  const { type, payload } = action;
  return { ...state, [type]: payload };
};
