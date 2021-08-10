import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { GoSignIn } from "react-icons/go";
import { Link, useHistory } from "react-router-dom";
import {
  MENTOR_HOME,
  MENTOR_PROFILE_BUILDER,
  ORGANISATION_HOME,
  ORGANISATION_PROFILE_BUILDER,
  ORGANISATION_REGISTER,
  STUDENT_HOME,
  STUDENT_PROFILE_BUILDER,
} from "../../constants/Routes";
import "./LoginForm.css";
import Error from "../Error/Error";
import { LoginActionType, LoginData, LoginState } from "../../types/Login";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useAuth } from "../../context/api_context/AuthContext";
import { MENTOR, ORGANISER, STUDENT } from "../../constants/Entities";
import { useCookie } from "../../context/cookie_context/CookieContext";

type LoginFormProps = {
  state: LoginState;
  dispatch: React.Dispatch<LoginActionType>;
};

const LoginForm = ({ state, dispatch }: LoginFormProps) => {
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const { postLoginCall } = useAuth();
  const { setAllCookies } = useCookie();
  const history = useHistory();

  const handleLoginChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (state.validated) dispatch({ type: "validated", payload: false });

    setLoginData((prevState: LoginData) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleLoginFormSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();

    dispatch({ type: "validated", payload: true });

    if (event.currentTarget.checkValidity() === true) {
      try {
        dispatch({ type: "loading", payload: true });
        dispatch({ type: "error", payload: "" });

        const response = await postLoginCall(loginData);
        dispatch({ type: "loading", payload: false });

        setAllCookies(
          response.data.user.profileCreated,
          response.data.user.id,
          response.data.jwt,
          response.data.user.userType,
          response.data.user.userName,
          response.data.user.orgName ?? ""
        );

        switch (response.data.user.userType) {
          case ORGANISER:
            if (response.data.user.profileCreated) {
              history.push(ORGANISATION_HOME);
            } else if (response.data.user.profileCreated === false) {
              history.push(ORGANISATION_PROFILE_BUILDER);
            }

            break;
          case STUDENT:
            if (response.data.user.profileCreated) {
              history.push(STUDENT_HOME);
            } else if (response.data.user.profileCreated === false) {
              history.push(STUDENT_PROFILE_BUILDER);
            }

            break;
          case MENTOR:
            if (response.data.user.profileCreated) {
              history.push(MENTOR_HOME);
            } else if (response.data.user.profileCreated === false) {
              history.push(MENTOR_PROFILE_BUILDER);
            }

            break;
        }
      } catch (error) {
        dispatch({ type: "loading", payload: false });
        dispatch({
          type: "error",
          payload: error.response?.data?.message ?? "",
        });
      }
    }
  };

  return (
    <div className="LoginFormContainer">
      {state.error && <Error message={state.error} />}
      <Form
        noValidate
        validated={state.validated}
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
            type={state.showPassword ? "text" : "password"}
            placeholder="Password"
            value={loginData.password}
            onChange={handleLoginChange}
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
