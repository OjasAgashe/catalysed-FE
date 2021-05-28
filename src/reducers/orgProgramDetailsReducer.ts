import {
  OrgProgramDetailsActionType,
  OrgProgramDetailsState,
} from "../types/OrgProgramDetails";

export const orgProgramDetailsReducer = (
  state: OrgProgramDetailsState,
  action: OrgProgramDetailsActionType
) => {
  const { type, payload } = action;
  return { ...state, [type]: payload };
};
