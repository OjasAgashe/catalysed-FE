import {
  StuSuggestedProgramApplicationActionType,
  StuSuggestedProgramApplicationState,
} from "../types/StuSuggestedProgramApplication";

export const stuSuggestedProgramApplicationReducer = (
  state: StuSuggestedProgramApplicationState,
  action: StuSuggestedProgramApplicationActionType
) => {
  const { type, payload } = action;
  return { ...state, [type]: payload };
};
