import React, { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import OrgRegisterProgress from "../OrgRegisterProgress/OrgRegisterProgress";
import "./OrgRegisterDetails.css";

type OrgRegisterDetailsProps = {
  currentOrgRegister: String;
  setCurrentOrgRegister: React.Dispatch<React.SetStateAction<String>>;
};

const OrgRegisterDetails = ({
  currentOrgRegister,
  setCurrentOrgRegister,
}: OrgRegisterDetailsProps) => {
  useEffect(() => {
    setCurrentOrgRegister("details");
  });

  const handleOrgRegisterDetailsFormSubmit: React.FormEventHandler<HTMLFormElement> = (
    e
  ) => {
    e.preventDefault();
    console.log("Organisation Details Form Button clicked.");
  };

  return (
    <div className="OrgRegisterDetails">
      <div className="OrgRegisterProgressContainer">
        <div className="OrgRegisterDetailsText">Organisation Details</div>
        <OrgRegisterProgress currentOrgRegister={currentOrgRegister} />
      </div>
      <Form
        className="OrgRegisterDetailsForm"
        onSubmit={handleOrgRegisterDetailsFormSubmit}
      >
        <Form.Control type="text" placeholder="Organisation Name" />
        <Form.Control
          className="FormControlAboutOrg"
          as="textarea"
          rows={3}
          placeholder="Write About Your Organisation"
        />
        <Form.Control type="text" placeholder="Organisation Website Link" />

        <div className="FormButtonContainer">
          <Button type="submit" className="FormButton">
            Register now
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default OrgRegisterDetails;
