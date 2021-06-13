import {
  OrgProgramParticipantActionType,
  OrgProgramParticipantState,
} from "../types/OrgProgramDetails";

export const orgProgramParticipantReducer = (
  state: OrgProgramParticipantState,
  action: OrgProgramParticipantActionType
) => {
  const { type, payload } = action;
  return { ...state, [type]: payload };
};
