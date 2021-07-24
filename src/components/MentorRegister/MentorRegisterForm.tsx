import React, { useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { GiClick } from "react-icons/gi";

const MentorRegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordIsInvalid, setPasswordIsInvalid] = useState(false);
  const [passwordFeedback, setPasswordFeedback] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPasswordIsInvalid, setConfirmPasswordIsInvalid] =
    useState(false);
  const [confirmPasswordFeedback, setConfirmPasswordFeedback] = useState("");

  return (
    <Form className="MentorRegisterForm">
      <Row>
        <Col>
          <Form.Control
            required
            name="firstName"
            type="text"
            placeholder="First Name"
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
          placeholder="Email Id"
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
          isInvalid={passwordIsInvalid}
        />
        <InputGroup.Append className="EyeIconInputGroup">
          <Button
            className="EyeIconButton"
            onClick={() => setShowPassword(!showPassword)}
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
          isInvalid={confirmPasswordIsInvalid}
        />
        <InputGroup.Append className="EyeIconInputGroup">
          <Button
            className="EyeIconButton"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
          Register now <GiClick />
        </Button>
      </div>
    </Form>
  );
};

export default MentorRegisterForm;
