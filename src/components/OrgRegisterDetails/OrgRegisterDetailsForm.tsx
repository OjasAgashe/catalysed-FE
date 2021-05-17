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
import {
  OrgRegisterData,
  OrgRegisterDetailsState,
} from "../../types/OrganisationRegister";
import Error from "../Error/Error";

type OrgRegisterDetailsFormProps = {
  handleOrgRegisterDetailsFormSubmit: React.FormEventHandler<HTMLFormElement>;
  orgRegisterData: OrgRegisterData;
  handleOrgRegisterDetailsChange: React.ChangeEventHandler<HTMLInputElement>;
  handleSocialDropdownSelect: (selected: string | null) => void;
  state: OrgRegisterDetailsState;
};

const OrgRegisterDetailsForm = ({
  handleOrgRegisterDetailsFormSubmit,
  orgRegisterData,
  handleOrgRegisterDetailsChange,
  handleSocialDropdownSelect,
  state,
}: OrgRegisterDetailsFormProps) => {
  return (
    <>
      {state.error && <Error message={state.error} />}
      <Form
        noValidate
        validated={state.validated}
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
            isInvalid={state.orgNameIsInvalid}
          />
          <Form.Control.Feedback type="invalid">
            {state.orgNameFeedback
              ? state.orgNameFeedback
              : "Organisation name is required"}
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
            title={`${
              state.dropdownSelected ? state.dropdownSelected : "Social"
            }`}
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
            value={state.socialMediaLink}
            onChange={handleOrgRegisterDetailsChange}
            isInvalid={state.socialMediaLinkIsInvalid}
          />
          <Form.Control.Feedback type="invalid">
            {state.socialMediaFeedback
              ? state.socialMediaFeedback
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
    </>
  );
};

export default OrgRegisterDetailsForm;
