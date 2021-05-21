import {
  CreateProgramActionType,
  CreateProgramState,
} from "../types/CreateProgram";

export const orgCreateProgramReducer = (
  state: CreateProgramState,
  action: CreateProgramActionType
) => {
  const { type, payload } = action;
  return { ...state, [type]: payload };
};
