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

const OrgRegisterUser = ({
  orgRegisterData,
  setOrgRegisterData,
  orgRegisterDispatch,
}: OrgRegisterUserProps) => {
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
    orgRegisterDispatch({ type: "currentOrgRegister", payload: "user" });
  }, [orgRegisterDispatch]);

  const handleOrgRegisterUserChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      if (state.passwordIsInvalid)
        dispatch({ type: "passwordIsInvalid", payload: false });

      if (state.confirmPasswordIsInvalid)
        dispatch({ type: "confirmPasswordIsInvalid", payload: false });

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

  const handleOrgRegisterUserFormSubmit: React.FormEventHandler<HTMLFormElement> =
    (event) => {
      event.preventDefault();

      dispatch({ type: "validated", payload: true });

      const strongPasswordPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

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

      if (event.currentTarget.checkValidity() === true) {
        orgRegisterDispatch({ type: "currentOrgRegister", payload: "details" });
      }
    };

  return (
    <div className="OrgRegisterUser">
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
