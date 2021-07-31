import {
  OrgProfileEditActionType,
  OrgProfileEditState,
} from "../types/OrgProfileEdit";

export const orgProfileEditReducer = (
  state: OrgProfileEditState,
  action: OrgProfileEditActionType
) => {
  const { type, payload } = action;
  return { ...state, [type]: payload };
};
