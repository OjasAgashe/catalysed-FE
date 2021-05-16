export interface LoginData {
  email: string;
  password: string;
}

export interface LoginState {
  error: string;
  validated: boolean;
  showPassword: boolean;
  loading: boolean;
}

export type LoginActionType =
  | { type: "error"; payload: string }
  | { type: "validated"; payload: boolean }
  | { type: "showPassword"; payload: boolean }
  | { type: "loading"; payload: boolean };
