import React, { useEffect, useState } from "react";
import "./OrgRegisterUser.css";
import { OrgRegisterData } from "../../types/OrganisationRegister";
import OrgRegisterUserForm from "./OrgRegisterUserForm";

type OrgRegisterUserProps = {
  orgRegisterData: OrgRegisterData;
  setOrgRegisterData: any;
  setCurrentOrgRegister: React.Dispatch<React.SetStateAction<string>>;
};

const OrgRegisterUser = ({
  orgRegisterData,
  setOrgRegisterData,
  setCurrentOrgRegister,
}: OrgRegisterUserProps) => {
  const [validated, setValidated] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const [passwordFeedback, setPasswordFeedback] = useState<string>("");
  const [passwordIsInvalid, setPasswordIsInvalid] = useState<boolean>(false);

  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [confirmPasswordFeedback, setConfirmPasswordFeedback] =
    useState<string>("");
  const [confirmPasswordIsInvalid, setConfirmPasswordIsInvalid] =
    useState<boolean>(false);

  useEffect(() => {
    setCurrentOrgRegister("user");
  });

  const handleOrgRegisterUserChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      if (passwordIsInvalid) setPasswordIsInvalid(false);

      if (confirmPasswordIsInvalid) setConfirmPasswordIsInvalid(false);

      if (validated) setValidated(false);

      if (event.target.name !== "confirmPassword") {
        setOrgRegisterData((prevState: OrgRegisterData) => ({
          ...prevState,
          [event.target.name]: event.target.value,
        }));
      }

      if (event.target.name === "confirmPassword") {
        setConfirmPassword(event.target.value);
      }
    };

  const handleOrgRegisterUserFormSubmit: React.FormEventHandler<HTMLFormElement> =
    (event) => {
      event.preventDefault();

      setValidated(true);

      const strongPasswordPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

      if (
        orgRegisterData.password &&
        !strongPasswordPattern.test(orgRegisterData.password)
      ) {
        setPasswordFeedback(
          "Password must have atleast 8 character with 1 lowercase & 1 uppercase letter, 1 number & 1 special character."
        );
        setPasswordIsInvalid(true);
        return;
      }

      if (
        orgRegisterData.password &&
        orgRegisterData.password !== confirmPassword
      ) {
        setConfirmPasswordFeedback(
          "Confirm password should match with password"
        );
        setConfirmPasswordIsInvalid(true);
        return;
      }

      if (event.currentTarget.checkValidity() === true) {
        setCurrentOrgRegister("details");
      }
    };

  return (
    <div className="OrgRegisterUser">
      <OrgRegisterUserForm
        validated={validated}
        handleOrgRegisterUserFormSubmit={handleOrgRegisterUserFormSubmit}
        orgRegisterData={orgRegisterData}
        handleOrgRegisterUserChange={handleOrgRegisterUserChange}
        showPassword={showPassword}
        passwordIsInvalid={passwordIsInvalid}
        setShowPassword={setShowPassword}
        passwordFeedback={passwordFeedback}
        showConfirmPassword={showConfirmPassword}
        confirmPassword={confirmPassword}
        confirmPasswordIsInvalid={confirmPasswordIsInvalid}
        setShowConfirmPassword={setShowConfirmPassword}
        confirmPasswordFeedback={confirmPasswordFeedback}
      />
    </div>
  );
};

export default OrgRegisterUser;
