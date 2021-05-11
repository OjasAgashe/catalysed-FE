import React from "react";
import { Button, Form } from "react-bootstrap";
import { GoSignIn } from "react-icons/go";
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
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
