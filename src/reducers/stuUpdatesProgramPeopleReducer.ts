import {
  StuUpdatesProgramPeopleActionType,
  StuUpdatesProgramPeopleState,
} from "../types/StuUpdatesProgramDetails";

export const stuUpdatesProgramPeopleReducer = (
  state: StuUpdatesProgramPeopleState,
  action: StuUpdatesProgramPeopleActionType
) => {
  const { type, payload } = action;
  return { ...state, [type]: payload };
};
