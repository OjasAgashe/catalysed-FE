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
