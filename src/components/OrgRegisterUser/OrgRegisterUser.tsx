import React, { useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import "./OrgRegisterUser.css";
import { MdNavigateNext } from "react-icons/md";
import OrgRegisterProgress from "../OrgRegisterProgress/OrgRegisterProgress";

type OrgRegisterUserProps = {
  currentOrgRegister: String;
  setCurrentOrgRegister: React.Dispatch<React.SetStateAction<String>>;
};

const OrgRegisterUser = ({
  currentOrgRegister,
  setCurrentOrgRegister,
}: OrgRegisterUserProps) => {
  useEffect(() => {
    document.title = "Organisation Register | CatalysEd";
    setCurrentOrgRegister("user");
  });

  const handleOrgRegisterUserFormSubmit: React.FormEventHandler<HTMLFormElement> = (
    e
  ) => {
    e.preventDefault();
    console.log("Organisation Register Form Button clicked.");
    setCurrentOrgRegister("details");
  };

  return (
    <div className="OrgRegisterUser">
      <div className="OrgRegisterProgressContainer">
        <div className="OrgRegisterUserText">User Details</div>
        <OrgRegisterProgress currentOrgRegister={currentOrgRegister} />
      </div>
      <Form
        className="OrgRegisterUserForm"
        onSubmit={handleOrgRegisterUserFormSubmit}
      >
        <Row>
          <Col>
            <Form.Control type="text" placeholder="First Name" />
          </Col>
          <Col>
            <Form.Control type="text" placeholder="Last Name" />
          </Col>
        </Row>
        <Form.Control type="email" placeholder="Your Official Email Id" />
        <Form.Control type="password" placeholder="Password" />
        <Form.Control type="password" placeholder="Confirm Password" />

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
