import React from "react";
import { Button, Form } from "react-bootstrap";
import { GoSignIn } from "react-icons/go";
import { Link } from "react-router-dom";
import { ORGANISATION_REGISTER } from "../../routes/Routes";
import "./LoginForm.css";

const LoginForm = () => {
  return (
    <div className="LoginFormContainer">
      <Form className="LoginForm">
        <Form.Control type="email" placeholder="Email id" />
        <Form.Control type="password" placeholder="Password" />

        <div className="FormButtonContainer">
          <Button type="submit" className="FormButton">
            Log In <GoSignIn />
          </Button>
          <Form.Text className="FormTextForgotPassword">
            Forgot Password?
          </Form.Text>
          <Form.Text className="FormTextOr">Or</Form.Text>
          <Form.Text className="FormTextSignUp">
            New to CatalysEd? &nbsp;
            <Link to={ORGANISATION_REGISTER} className="FormTextSignUpLink">
              Sign up
            </Link>
          </Form.Text>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
