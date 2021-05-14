import React from "react";
import {
  Button,
  Dropdown,
  DropdownButton,
  Form,
  InputGroup,
} from "react-bootstrap";
import {
  AiFillLinkedin,
  AiOutlineInstagram,
  AiOutlineTwitter,
} from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { GiClick } from "react-icons/gi";
import { OrgRegisterData } from "../../types/OrganisationRegister";

type OrgRegisterDetailsFormProps = {
  validated: boolean;
  handleOrgRegisterDetailsFormSubmit: React.FormEventHandler<HTMLFormElement>;
  orgRegisterData: OrgRegisterData;
  handleOrgRegisterDetailsChange: React.ChangeEventHandler<HTMLInputElement>;
  dropdownSelected: string;
  handleSocialDropdownSelect: (selected: string | null) => void;
  socialMediaLink: string;
  socialMediaLinkIsInvalid: boolean;
  socialMediaFeedback: string;
  orgNameFeedback: string;
  orgNameIsInvalid: boolean;
};

const OrgRegisterDetailsForm = ({
  validated,
  handleOrgRegisterDetailsFormSubmit,
  orgRegisterData,
  handleOrgRegisterDetailsChange,
  dropdownSelected,
  handleSocialDropdownSelect,
  socialMediaLink,
  socialMediaLinkIsInvalid,
  socialMediaFeedback,
  orgNameFeedback,
  orgNameIsInvalid,
}: OrgRegisterDetailsFormProps) => {
  return (
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
          isInvalid={orgNameIsInvalid}
        />
        <Form.Control.Feedback type="invalid">
          {orgNameFeedback ? orgNameFeedback : "Organisation name is required"}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group>
        <Form.Control
          required
          name="description"
          className="FormControlAboutOrg"
          as="textarea"
          rows={3}
          minLength={10}
          placeholder="Write About Your Organisation"
          value={orgRegisterData.orgDetails.description}
          onChange={handleOrgRegisterDetailsChange}
        />
        <Form.Control.Feedback type="invalid">
          Organisation description is required (and must have atleast 10
          characters).
        </Form.Control.Feedback>
      </Form.Group>

      <InputGroup hasValidation className="RowSocialInputOrgRegister">
        <DropdownButton
          as={InputGroup.Prepend}
          className="SocialDropdown"
          title={`${dropdownSelected ? dropdownSelected : "Social"}`}
        >
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
          <Dropdown.Item
            eventKey="instagram"
            onSelect={handleSocialDropdownSelect}
          >
            <AiOutlineInstagram className="InstagramDropdown" />
          </Dropdown.Item>
        </DropdownButton>
        &nbsp;
        <Form.Control
          required
          name="socialMedia"
          type="text"
          placeholder="Link"
          value={socialMediaLink}
          onChange={handleOrgRegisterDetailsChange}
          isInvalid={socialMediaLinkIsInvalid}
        />
        <Form.Control.Feedback type="invalid">
          {socialMediaFeedback
            ? socialMediaFeedback
            : "Social media link is required."}
        </Form.Control.Feedback>
      </InputGroup>

      <Form.Group>
        <Form.Control
          required
          name="orgWebsite"
          type="url"
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
  );
};

export default OrgRegisterDetailsForm;
