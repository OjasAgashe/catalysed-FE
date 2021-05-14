import React from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { MdNavigateNext } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { OrgRegisterData } from "../../types/OrganisationRegister";

type OrgRegisterUserFormProps = {
  validated: boolean;
  handleOrgRegisterUserFormSubmit: React.FormEventHandler<HTMLFormElement>;
  orgRegisterData: OrgRegisterData;
  handleOrgRegisterUserChange: React.ChangeEventHandler<HTMLInputElement>;
  showPassword: boolean;
  passwordIsInvalid: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  passwordFeedback: string;
  showConfirmPassword: boolean;
  confirmPassword: string;
  confirmPasswordIsInvalid: boolean;
  setShowConfirmPassword: React.Dispatch<React.SetStateAction<boolean>>;
  confirmPasswordFeedback: string;
};

const OrgRegisterUserForm = ({
  validated,
  handleOrgRegisterUserFormSubmit,
  orgRegisterData,
  handleOrgRegisterUserChange,
  showPassword,
  passwordIsInvalid,
  setShowPassword,
  passwordFeedback,
  showConfirmPassword,
  confirmPassword,
  confirmPasswordIsInvalid,
  setShowConfirmPassword,
  confirmPasswordFeedback,
}: OrgRegisterUserFormProps) => {
  return (
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

      <InputGroup hasValidation>
        <Form.Control
          required
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={orgRegisterData.password}
          onChange={handleOrgRegisterUserChange}
          isInvalid={passwordIsInvalid}
        />
        <InputGroup.Append className="EyeIconInputGroup">
          <Button
            className="EyeIconButton"
            onClick={() => setShowPassword((prevState) => !prevState)}
          >
            {showPassword ? (
              <AiOutlineEye className="EyeVisibleIcon" />
            ) : (
              <AiOutlineEyeInvisible className="EyeInvisibleIcon" />
            )}
          </Button>
        </InputGroup.Append>

        <Form.Control.Feedback type="invalid">
          {passwordFeedback ? passwordFeedback : "Password is required."}
        </Form.Control.Feedback>
      </InputGroup>

      <InputGroup>
        <Form.Control
          required
          name="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={handleOrgRegisterUserChange}
          isInvalid={confirmPasswordIsInvalid}
        />
        <InputGroup.Append className="EyeIconInputGroup">
          <Button
            className="EyeIconButton"
            onClick={() => setShowConfirmPassword((prevState) => !prevState)}
          >
            {showConfirmPassword ? (
              <AiOutlineEye className="EyeVisibleIcon" />
            ) : (
              <AiOutlineEyeInvisible className="EyeInvisibleIcon" />
            )}
          </Button>
        </InputGroup.Append>
        <Form.Control.Feedback type="invalid">
          {confirmPasswordFeedback
            ? confirmPasswordFeedback
            : "Confirm password is required."}
        </Form.Control.Feedback>
      </InputGroup>

      <div className="FormButtonContainer">
        <Button type="submit" className="FormButton">
          Next <MdNavigateNext className="MdNavigateNextIcon" />
        </Button>
      </div>
    </Form>
  );
};

export default OrgRegisterUserForm;
