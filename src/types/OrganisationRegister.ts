export interface OrgRegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  orgDetails: {
    name: string;
    description: string;
    orgWebsite: string;
    socialMedia: {
      code: string;
      link: string;
    };
  };
}
