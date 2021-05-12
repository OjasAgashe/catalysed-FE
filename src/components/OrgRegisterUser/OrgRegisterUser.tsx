import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import "./OrgRegisterUser.css";
import { MdNavigateNext } from "react-icons/md";
import { OrgRegisterData } from "../../types/OrganisationRegister";

type OrgRegisterUserProps = {
  orgRegisterData: OrgRegisterData;
  setOrgRegisterData: React.Dispatch<React.SetStateAction<OrgRegisterData>>;
  setCurrentOrgRegister: React.Dispatch<React.SetStateAction<string>>;
};

const OrgRegisterUser = ({
  orgRegisterData,
  setOrgRegisterData,
  setCurrentOrgRegister,
}: OrgRegisterUserProps) => {
  const [validated, setValidated] = useState<boolean>(false);

  const [passwordFeedback, setPasswordFeedback] = useState<string>("");
  const [passwordIsInvalid, setPasswordIsInvalid] = useState<boolean>(false);

  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [confirmPasswordFeedback, setConfirmPasswordFeedback] =
    useState<string>("");
  const [confirmPasswordIsInvalid, setConfirmPasswordIsInvalid] =
    useState<boolean>(false);

  useEffect(() => {
    document.title = "Organisation Register | CatalysEd";
    setCurrentOrgRegister("user");
  });

  const handleOrgRegisterUserChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      if (passwordIsInvalid) setPasswordIsInvalid(false);

      if (confirmPasswordIsInvalid) setConfirmPasswordIsInvalid(false);

      if (validated) setValidated(false);

      if (event.target.name !== "confirmPassword") {
        setOrgRegisterData((prevState) => ({
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
      <Form
        noValidate
        validated={validated}
        className="OrgRegisterUserForm"
        onSubmit={handleOrgRegisterUserFormSubmit}
      >
        <Row>
          <Col>
            <Form.Control
              required
              name="firstName"
              type="text"
              placeholder="First Name"
              value={orgRegisterData.firstName}
              onChange={handleOrgRegisterUserChange}
            />
            <Form.Control.Feedback type="invalid">
              Please enter your first name.
            </Form.Control.Feedback>
          </Col>
          <Col>
            <Form.Control
              required
              name="lastName"
              type="text"
              placeholder="Last Name"
              value={orgRegisterData.lastName}
              onChange={handleOrgRegisterUserChange}
            />
            <Form.Control.Feedback type="invalid">
              Please enter your last name.
            </Form.Control.Feedback>
          </Col>
        </Row>

        <Form.Group>
          <Form.Control
            required
            name="email"
            type="email"
            placeholder="Your Official Email Id"
            value={orgRegisterData.email}
            onChange={handleOrgRegisterUserChange}
          />
          <Form.Control.Feedback type="invalid">
            Email is required.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Control
            required
            name="password"
            type="password"
            placeholder="Password"
            value={orgRegisterData.password}
            onChange={handleOrgRegisterUserChange}
            isInvalid={passwordIsInvalid}
          />
          <Form.Control.Feedback type="invalid">
            {passwordFeedback ? passwordFeedback : "Password is required."}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Control
            required
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleOrgRegisterUserChange}
            isInvalid={confirmPasswordIsInvalid}
          />
          <Form.Control.Feedback type="invalid">
            {confirmPasswordFeedback
              ? confirmPasswordFeedback
              : "Confirm password is required."}
          </Form.Control.Feedback>
        </Form.Group>

        <div className="FormButtonContainer">
          <Button type="submit" className="FormButton">
            Next <MdNavigateNext className="MdNavigateNextIcon" />
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default OrgRegisterUser;
