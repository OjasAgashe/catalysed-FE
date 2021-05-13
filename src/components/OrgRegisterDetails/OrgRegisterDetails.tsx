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
import { GiClick } from "react-icons/gi";
import { OrgRegisterData } from "../../types/OrganisationRegister";

type OrgRegisterDetailsProps = {
  orgRegisterData: OrgRegisterData;
  setOrgRegisterData: React.Dispatch<React.SetStateAction<OrgRegisterData>>;
  setCurrentOrgRegister: React.Dispatch<React.SetStateAction<string>>;
};

const OrgRegisterDetails = ({
  orgRegisterData,
  setOrgRegisterData,
  setCurrentOrgRegister,
}: OrgRegisterDetailsProps) => {
  const [prependValue, setPrependValue] = useState<string>("");
  const [validated, setValidated] = useState<boolean>(false);

  const [socialMediaLink, setSocialMediaLink] = useState<string>("");
  const [socialMediaFeedback, setSocialMediaFeedback] = useState<string>("");

  const possibleSocialBaseURL: string[] = [
    "https://twitter.com",
    "https://www.linkedin.com",
    "https://www.facebook.com",
  ];

  useEffect(() => {
    setCurrentOrgRegister("details");
  });

  const handleOrgRegisterDetailsChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      if (validated) setValidated(false);

      console.clear();
      console.log(orgRegisterData);

      if (event.target.name !== "socialMedia") {
        setOrgRegisterData((prevState) => ({
          ...prevState,
          orgDetails: {
            ...prevState.orgDetails,
            [event.target.name]: event.target.value,
          },
        }));
      }

      if (event.target.name === "socialMedia") {
        setSocialMediaLink(event.target.value);

        if (socialMediaLink && prependValue === "") {
          possibleSocialBaseURL.forEach((baseURL, index) => {
            if (socialMediaLink.includes(baseURL)) {
              switch (index) {
                case 0:
                  setPrependValue("twitter");
                  break;
                case 1:
                  setPrependValue("linkedIn");
                  break;
                case 2:
                  setPrependValue("facebook");
                  break;
              }
            }

            if (prependValue) {
              setPrependValue("None");
            }
          });
        }
      }
    };

  const handleSocialDropdownSelect: (selected: string | null) => void = (
    selected
  ) => {
    if (selected !== null) {
      setPrependValue(selected);
    }
  };

  const handleOrgRegisterDetailsFormSubmit: React.FormEventHandler<HTMLFormElement> =
    (event) => {
      event.preventDefault();

      setValidated(true);

      // if (socialMediaLink)

      if (event.currentTarget.checkValidity() === true) {
      } else {
        console.log("validity fails");
      }
    };

  return (
    <div className="OrgRegisterDetails">
      <Form
        noValidate
        validated={validated}
        className="OrgRegisterDetailsForm"
        onSubmit={handleOrgRegisterDetailsFormSubmit}
      >
        <Form.Group>
          <Form.Control
            required
            name="name"
            type="text"
            placeholder="Organisation Name"
            value={orgRegisterData.orgDetails.name}
            onChange={handleOrgRegisterDetailsChange}
          />
          <Form.Control.Feedback type="invalid">
            Organisation name is required.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Control
            required
            name="description"
            className="FormControlAboutOrg"
            as="textarea"
            rows={3}
            placeholder="Write About Your Organisation"
            value={orgRegisterData.orgDetails.description}
            onChange={handleOrgRegisterDetailsChange}
          />
          <Form.Control.Feedback type="invalid">
            Organisation description is required.
          </Form.Control.Feedback>
        </Form.Group>

        <Row className="RowSocialInputOrgRegister">
          <Col className="ColOne">
            <DropdownButton
              className="SocialDropdown"
              title={`${prependValue ? prependValue : "Social"}`}
            >
              <Dropdown.Item
                eventKey="None"
                onSelect={handleSocialDropdownSelect}
              >
                <span className="SocialTitle">None</span>
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="twitter"
                onSelect={handleSocialDropdownSelect}
              >
                <AiOutlineTwitter className="TwitterDropdown" />
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="linkedIn"
                onSelect={handleSocialDropdownSelect}
              >
                <AiFillLinkedin className="LinkedInDropdown" />
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="facebook"
                onSelect={handleSocialDropdownSelect}
              >
                <FaFacebook className="FacebookDropdown" />
              </Dropdown.Item>
            </DropdownButton>
          </Col>
          <Col className="ColTwo">
            <Form.Control
              required
              name="socialMedia"
              type="text"
              placeholder="Link"
              value={socialMediaLink}
              onChange={handleOrgRegisterDetailsChange}
            />
            <Form.Control.Feedback type="invalid">
              {socialMediaFeedback
                ? socialMediaFeedback
                : "Social media link is required."}
            </Form.Control.Feedback>
          </Col>
        </Row>

        <Form.Group>
          <Form.Control
            required
            name="orgWebsite"
            type="text"
            placeholder="Organisation Website Link"
            value={orgRegisterData.orgDetails.orgWebsite}
            onChange={handleOrgRegisterDetailsChange}
          />
          <Form.Control.Feedback type="invalid">
            Organisation website link is required.
          </Form.Control.Feedback>
        </Form.Group>

        <div className="FormButtonContainer">
          <Button type="submit" className="FormButton">
            Register now <GiClick />
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default OrgRegisterDetails;
