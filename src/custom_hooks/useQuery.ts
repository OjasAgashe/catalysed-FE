import { useLocation } from "react-router-dom";

/*
 * useQuery: a custom hook, to get the value of query (?key=value)
 * parameter from an URL
 */
export const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
