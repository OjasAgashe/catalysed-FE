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
