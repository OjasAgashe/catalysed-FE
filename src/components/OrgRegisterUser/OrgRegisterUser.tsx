import React, { useEffect, useReducer } from "react";
import "./OrgRegisterUser.css";
import {
  OrgRegisterActionType,
  OrgRegisterData,
} from "../../types/OrganisationRegister";
import OrgRegisterUserForm from "./OrgRegisterUserForm";
import { orgRegisterUserReducer } from "../../reducers/orgRegisterUserReducer";

type OrgRegisterUserProps = {
  orgRegisterData: OrgRegisterData;
  setOrgRegisterData: any;
  orgRegisterDispatch: React.Dispatch<OrgRegisterActionType>;
};

/*
 * OrgRegisterUser: component accepts three props.
 *
 * 1. orgRegisterData: to show the Organisation Registration Data in
 * inputs
 *
 * 2. setOrgRegisterData: to change the Organisation Registration Data on
 * new input
 *
 * 3. orgRegisterDispatch: to change the reducer state values of OrganisationRegister
 */
const OrgRegisterUser = ({
  orgRegisterData,
  setOrgRegisterData,
  orgRegisterDispatch,
}: OrgRegisterUserProps) => {
  /*
   * state.validated: to handle the form validation
   *
   * state.showPassword, state.showConfirmPassword, state.passwordFeedback, state.passwordIsInvalid,
   * state.confirmPasswordFeedback, state.confirmPasswordIsInvalid: all these states
   * to make the UX nice
   *
   * state.confirmPassword: to store the value of confirmPassword
   */
  const [state, dispatch] = useReducer(orgRegisterUserReducer, {
    validated: false,
    showPassword: false,
    showConfirmPassword: false,
    passwordFeedback: "",
    passwordIsInvalid: false,
    confirmPassword: "",
    confirmPasswordFeedback: "",
    confirmPasswordIsInvalid: false,
  });

  useEffect(() => {
    /*
     * After this component gets render, set the currentOrgRegister value to "user"
     */
    orgRegisterDispatch({ type: "currentOrgRegister", payload: "user" });
  }, [orgRegisterDispatch]);

  /*
   * Function to handle input changes on user step of registration of
   * Organisation
   */
  const handleOrgRegisterUserChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      /*
       * If we have set state.passwordIsInvalid to true, set it to false
       */
      if (state.passwordIsInvalid)
        dispatch({ type: "passwordIsInvalid", payload: false });

      /*
       * If we have set state.confirmPasswordIsInvalid to true, set it to false
       */
      if (state.confirmPasswordIsInvalid)
        dispatch({ type: "confirmPasswordIsInvalid", payload: false });

      /*
       * If we have set state.validated to true, set it to false
       */
      if (state.validated) dispatch({ type: "validated", payload: false });

      if (event.target.name !== "confirmPassword") {
        setOrgRegisterData((prevState: OrgRegisterData) => ({
          ...prevState,
          [event.target.name]: event.target.value,
        }));
      }

      if (event.target.name === "confirmPassword") {
        dispatch({ type: "confirmPassword", payload: event.target.value });
      }
    };

  /*
   * Function to handle form submit for "user" step of registration
   */
  const handleOrgRegisterUserFormSubmit: React.FormEventHandler<HTMLFormElement> =
    (event) => {
      event.preventDefault();

      // set the value of validated to true
      dispatch({ type: "validated", payload: true });

      // regex for a strong password pattern
      const strongPasswordPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

      /*
       * if user has entered password value, but it is not strong. Then give
       * a feedback to user, and tell to make the password strong
       */
      if (
        orgRegisterData.password &&
        !strongPasswordPattern.test(orgRegisterData.password)
      ) {
        dispatch({
          type: "passwordFeedback",
          payload:
            "Password must have atleast 8 character with 1 lowercase & 1 uppercase letter, 1 number & 1 special character.",
        });

        dispatch({ type: "passwordIsInvalid", payload: true });
        return;
      }

      /*
       * If the value of password and confirmPassword is not same then show
       * an error to user
       */
      if (
        orgRegisterData.password &&
        orgRegisterData.password !== state.confirmPassword
      ) {
        dispatch({
          type: "confirmPasswordFeedback",
          payload: "Confirm password should match with password",
        });

        dispatch({ type: "confirmPasswordIsInvalid", payload: true });
        return;
      }

      /*
       * If there are no errors, then take the user to "details" step of registration
       */
      if (event.currentTarget.checkValidity() === true) {
        orgRegisterDispatch({ type: "currentOrgRegister", payload: "details" });
      }
    };

  return (
    <div className="OrgRegisterUser">
      {/* Show OrgRegisterUserForm Component */}
      <OrgRegisterUserForm
        handleOrgRegisterUserFormSubmit={handleOrgRegisterUserFormSubmit}
        orgRegisterData={orgRegisterData}
        handleOrgRegisterUserChange={handleOrgRegisterUserChange}
        state={state}
        dispatch={dispatch}
      />
    </div>
  );
};

export default OrgRegisterUser;
