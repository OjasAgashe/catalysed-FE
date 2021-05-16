import React from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { MdNavigateNext } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import {
  OrgRegisterData,
  OrgRegisterUserActionType,
  OrgRegisterUserState,
} from "../../types/OrganisationRegister";

type OrgRegisterUserFormProps = {
  handleOrgRegisterUserFormSubmit: React.FormEventHandler<HTMLFormElement>;
  orgRegisterData: OrgRegisterData;
  handleOrgRegisterUserChange: React.ChangeEventHandler<HTMLInputElement>;
  state: OrgRegisterUserState;
  dispatch: React.Dispatch<OrgRegisterUserActionType>;
};

const OrgRegisterUserForm = ({
  handleOrgRegisterUserFormSubmit,
  orgRegisterData,
  handleOrgRegisterUserChange,
  state,
  dispatch,
}: OrgRegisterUserFormProps) => {
  return (
    <Form
      noValidate
      validated={state.validated}
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
          type={state.showPassword ? "text" : "password"}
          placeholder="Password"
          value={orgRegisterData.password}
          onChange={handleOrgRegisterUserChange}
          isInvalid={state.passwordIsInvalid}
        />
        <InputGroup.Append className="EyeIconInputGroup">
          <Button
            className="EyeIconButton"
            onClick={() =>
              dispatch({ type: "showPassword", payload: !state.showPassword })
            }
          >
            {state.showPassword ? (
              <AiOutlineEye className="EyeVisibleIcon" />
            ) : (
              <AiOutlineEyeInvisible className="EyeInvisibleIcon" />
            )}
          </Button>
        </InputGroup.Append>

        <Form.Control.Feedback type="invalid">
          {state.passwordFeedback
            ? state.passwordFeedback
            : "Password is required."}
        </Form.Control.Feedback>
      </InputGroup>

      <InputGroup>
        <Form.Control
          required
          name="confirmPassword"
          type={state.showConfirmPassword ? "text" : "password"}
          placeholder="Confirm Password"
          value={state.confirmPassword}
          onChange={handleOrgRegisterUserChange}
          isInvalid={state.confirmPasswordIsInvalid}
        />
        <InputGroup.Append className="EyeIconInputGroup">
          <Button
            className="EyeIconButton"
            onClick={() =>
              dispatch({
                type: "showConfirmPassword",
                payload: !state.showConfirmPassword,
              })
            }
          >
            {state.showConfirmPassword ? (
              <AiOutlineEye className="EyeVisibleIcon" />
            ) : (
              <AiOutlineEyeInvisible className="EyeInvisibleIcon" />
            )}
          </Button>
        </InputGroup.Append>
        <Form.Control.Feedback type="invalid">
          {state.confirmPasswordFeedback
            ? state.confirmPasswordFeedback
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
