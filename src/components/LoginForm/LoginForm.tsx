import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { GoSignIn } from "react-icons/go";
import { Link } from "react-router-dom";
import { ORGANISATION_REGISTER } from "../../routes/Routes";
import "./LoginForm.css";
import Error from "../Error/Error";
import { LoginData } from "../../types/Login";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";

type LoginFormProps = {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const LoginForm = ({ setLoading }: LoginFormProps) => {
  const [error, setError] = useState<string>("");
  const [validated, setValidated] = useState<boolean>(false);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const handleLoginChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (validated) setValidated(false);

    setLoginData((prevState: LoginData) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleLoginFormSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();

    setValidated(true);

    if (event.currentTarget.checkValidity() === true) {
      try {
        setLoading(true);
        setError("");

        const response = await axios({
          method: "post",
          url: "https://level-abode-312509.el.r.appspot.com/authenticate",
          data: loginData,
        });

        console.log(response);
      } catch (error) {
        setError(error.response.data.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="LoginFormContainer">
      {error && <Error message={error} />}
      <Form
        noValidate
        validated={validated}
        className="LoginForm"
        onSubmit={handleLoginFormSubmit}
      >
        <Form.Group>
          <Form.Control
            required
            name="email"
            type="email"
            placeholder="Email Id"
            value={loginData.email}
            onChange={handleLoginChange}
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
            value={loginData.password}
            onChange={handleLoginChange}
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
            Password is required.
          </Form.Control.Feedback>
        </InputGroup>

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
