import {
  StudentUpdatesApplicationDetailsActionType,
  StudentUpdatesApplicationDetailsState,
} from "../types/StudentUpdates";

export const stuUpdatesApplicationDetailsReducer = (
  state: StudentUpdatesApplicationDetailsState,
  action: StudentUpdatesApplicationDetailsActionType
) => {
  const { type, payload } = action;
  return { ...state, [type]: payload };
};
