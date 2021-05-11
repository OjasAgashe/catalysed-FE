import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Dropdown,
  DropdownButton,
  Form,
  Row,
} from "react-bootstrap";
import "./OrgRegisterDetails.css";
import { AiFillLinkedin, AiOutlineTwitter } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";

type OrgRegisterDetailsProps = {
  setCurrentOrgRegister: React.Dispatch<React.SetStateAction<string>>;
};

const OrgRegisterDetails = ({
  setCurrentOrgRegister,
}: OrgRegisterDetailsProps) => {
  const [prependValue, setPrependValue] = useState<string>("");

  useEffect(() => {
    setCurrentOrgRegister("details");
  });

  const handleOrgRegisterDetailsFormSubmit: React.FormEventHandler<HTMLFormElement> =
    (e) => {
      e.preventDefault();
      console.log("Organisation Details Form Button clicked.");
    };

  const handleSocialDropdownSelect: (selected: string | null) => void = (
    selected
  ) => {
    if (selected !== null) {
      setPrependValue(selected);
      // switch (selected) {
      //   case "twitter":
      //     setPrependValue("https://twitter.com/");
      //     break;
      //   case "linkedIn":
      //     setPrependValue("https://www.linkedin.com/");
      //     break;
      //   case "facebook":
      //     setPrependValue("https://www.facebook.com/");
      //     break;
      // }
    }
  };

  return (
    <div className="OrgRegisterDetails">
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

        <Row className="RowSocialInputOrgRegister">
          <Col className="ColOne">
            <DropdownButton
              className="SocialDropdown"
              title={`${prependValue ? prependValue : "Social"}`}
            >
              <Dropdown.Item
                eventKey="None"
                onSelect={(selected) => handleSocialDropdownSelect(selected)}
              >
                <span className="SocialTitle">None</span>
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="twitter"
                onSelect={(selected) => handleSocialDropdownSelect(selected)}
              >
                <AiOutlineTwitter className="TwitterDropdown" />
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="linkedIn"
                onSelect={(selected) => handleSocialDropdownSelect(selected)}
              >
                <AiFillLinkedin className="LinkedInDropdown" />
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="facebook"
                onSelect={(selected) => handleSocialDropdownSelect(selected)}
              >
                <FaFacebook className="FacebookDropdown" />
              </Dropdown.Item>
            </DropdownButton>
          </Col>
          <Col className="ColTwo">
            <Form.Control type="text" placeholder="Link" />
          </Col>
        </Row>

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
