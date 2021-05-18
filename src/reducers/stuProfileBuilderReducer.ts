import {
  StudentProfileBuilderActionType,
  StudentProfileBuilderState,
} from "../types/StudentProfileBuilder";

export const stuProfileBuilderReducer = (
  state: StudentProfileBuilderState,
  action: StudentProfileBuilderActionType
) => {
  const { type, payload } = action;
  return { ...state, [type]: payload };
};
