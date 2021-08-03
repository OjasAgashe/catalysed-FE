import {
  MentorUpdatesProgramDashboardActionType,
  MentorUpdatesProgramDashboardState,
} from "../types/MentorDashboardSessionDetails";

export const mentorUpdatesProgramDashboardReducer = (
  state: MentorUpdatesProgramDashboardState,
  action: MentorUpdatesProgramDashboardActionType
) => {
  const { type, payload } = action;
  return { ...state, [type]: payload };
};
