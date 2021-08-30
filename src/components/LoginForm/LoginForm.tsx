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

/*
 * LoginForm: component accepts two props,
 *
 * state: Login Page state
 * dispatch: Login Page dispatch
 */
const LoginForm = ({ state, dispatch }: LoginFormProps) => {
  /*
   * creating state to maintain value of email and password
   * that we will send in Login API Call
   */
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });

  // postLoginCall: to call Login API with email and password
  const { postLoginCall } = useAuth();

  /*
   * setAllCookies: to set the cookies with the response data of
   * successful Login API Call
   */
  const { setAllCookies } = useCookie();

  /*
   * To push after setting the cookies, to profile builder page or
   * home page, based on the value of profileCreated
   */
  const history = useHistory();

  /*
   * function to handle the input change of email and password
   */
  const handleLoginChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    /*
     * If previously, we have shown any validation error, then hide it first
     */
    if (state.validated) dispatch({ type: "validated", payload: false });

    /*
     * Then set the email or password value based on the target name
     */
    setLoginData((prevState: LoginData) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  /*
   * Function to call the Login API
   */
  const handleLoginFormSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();

    dispatch({ type: "validated", payload: true });

    if (event.currentTarget.checkValidity() === true) {
      // If the form passes all the check validity, only then call the API

      try {
        // Show the loading bar
        dispatch({ type: "loading", payload: true });

        // Previously, If we have shown any error then hide it
        dispatch({ type: "error", payload: "" });

        // Call the Login API with email and password (loginData)
        const response = await postLoginCall(loginData);

        // After successful API Call hide the loading bar
        dispatch({ type: "loading", payload: false });

        /*
         * Set all the required cookies from the data attribute of
         * response, that we will get from successful API Call
         */
        setAllCookies(
          response.data.user.profileCreated,
          response.data.user.id,
          response.data.jwt,
          response.data.user.userType,
          response.data.user.userName,
          response.data.user.orgName ?? "",
          response.data.user.orgId
        );

        /*
         * Based on the type of user, push it to the respected Home
         * or Profile Builder Page
         */
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
        /*
         * If there is an error (API Call is not successful), then first
         * hide the loading bar
         */
        dispatch({ type: "loading", payload: false });

        /*
         * And then show the error
         */
        dispatch({
          type: "error",
          payload: error.response?.data?.message ?? "",
        });
      }
    }
  };

  return (
    <div className="LoginFormContainer">
      {/* If there is any error, show it above the form */}
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
