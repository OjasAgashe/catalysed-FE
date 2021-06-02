import {
  OrgProgramInvitationActionType,
  OrgProgramInvitationState,
} from "../types/OrgProgramDetails";

export const orgProgramInvitationReducer = (
  state: OrgProgramInvitationState,
  action: OrgProgramInvitationActionType
) => {
  const { type, payload } = action;
  return { ...state, [type]: payload };
};
