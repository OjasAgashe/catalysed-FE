import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../../pages/Home/Home";
import Login from "../../pages/Login/Login";
import OrgProfileBuilder from "../../pages/OrgProfileBuilder/OrgProfileBuilder";
import OrganisationRegister from "../../pages/OrganisationRegister/OrganisationRegister";
import StudentMentorRegister from "../../pages/StudentMentorRegister/StudentMentorRegister";
import {
  HOME,
  LOGIN,
  MENTOR_HOME,
  MENTOR_PROFILE_BUILDER,
  ORGANISATION_HOME,
  ORGANISATION_PROGRAM_CREATE,
  ORGANISATION_PROFILE_BUILDER,
  ORGANISATION_REGISTER,
  STUDENT_MENTOR_REGISTER,
  STUDENT_PROFILE_BUILDER,
  STUDENT_HOME,
  ORGANISATION_PROGRAM_VIEW_SEARCH,
  ORGANISATION_PROGRAM_DETAILS,
  ORGANISATION_DIRECTORY_DETAILS_MENTOR,
  ORGANISATION_DIRECTORY_DETAILS_STUDENT,
  ORGANISATION_PROFILE_EDIT,
  ORGANISATION_APPLICANTS,
  ORGANISATION_DIRECTORY,
  STUDENT_DASHBOARD,
  ORGANISATION_INVITATIONS,
  STUDENT_UPDATES,
  STUDENT_UPDATES_DETAILS_PROGRAM,
  STUDENT_UPDATES_DETAILS_ORGANISATION,
  MENTOR_UPDATES,
  MENTOR_UPDATES_DETAILS_ORGANISATION,
  MENTOR_UPDATES_DETAILS_PROGRAM,
  MENTOR_REGISTER,
  STUDENT_REGISTER,
  STUDENT_SUGGESTED_PROGRAMS,
  MENTOR_SUGGESTED_PROGRAMS,
  STUDENT_PROFILE_EDIT,
  MENTOR_PROFILE_EDIT,
  STUDENT_UPDATES_DETAILS_APPLICATION,
  MENTOR_UPDATES_DETAILS_APPLICATION,
} from "../../constants/Routes";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./App.css";
import MentorProfileBuilder from "../../pages/MentorProfileBuilder/MentorProfileBuilder";
import StuProfileBuilder from "../../pages/StuProfileBuilder/StuProfileBuilder";
import { ProfileBuilderProvider } from "../../context/api_context/ProfileBuilderContext";
import CreateProgram from "../../pages/CreateProgram/CreateProgram";
import OrgHomePage from "../../pages/OrgHomePage/OrgHomePage";
import StudentHomePage from "../../pages/StudentHomePage/StudentHomePage";
import MentorHomePage from "../../pages/MentorHomePage/MentorHomePage";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import PublicRoute from "../PublicRoute/PublicRoute";
import OrgViewSearchProgramPage from "../../pages/OrgViewSearchProgram/OrgViewSearchProgramPage";
import { OrgAPIProvider } from "../../context/api_context/OrgAPIContext";
import OrgProgramDetailsPage from "../../pages/OrgProgramDetails/OrgProgramDetailsPage";
import OrgProgramInvitationsPage from "../../pages/OrgProgramDetails/OrgProgramInvitationsPage";
import OrgProgramParticipantsPage from "../../pages/OrgProgramDetails/OrgProgramParticipantsPage";
import OrgEditProgramDetailsPage from "../../pages/OrgEditProgramDetailsPage/OrgEditProgramDetailsPage";
import OrgProfileEdit from "../../pages/OrgProfileEdit/OrgProfileEdit";
import OrgProgramApplicantsPage from "../../pages/OrgProgramDetails/OrgProgramApplicantsPage";
import OrgApplicantsPage from "../../pages/OrgApplicantsPage/OrgApplicantsPage";
import PageNotFound from "../../pages/PageNotFound/PageNotFound";
import OrgDirectoryPage from "../../pages/OrgDirectoryPage/OrgDirectoryPage";
import OrgDirectoryMentorDetailsPage from "../../pages/OrgDirectoryPage/OrgDirectoryMentorDetailsPage";
import OrgDirectoryStudentDetailsPage from "../../pages/OrgDirectoryPage/OrgDirectoryStudentDetailsPage";
import OrgSpecificMentorApplicantDetailsPage from "../../pages/OrgSpecificApplicantDetailsPage/OrgSpecificMentorApplicantDetailsPage";
import OrgSpecificStudentApplicantDetailsPage from "../../pages/OrgSpecificApplicantDetailsPage/OrgSpecificStudentApplicantDetailsPage";
import StudentDashboard from "../../pages/StudentDashboard/StudentDashboard";
import StudentUpdatesPage from "../../pages/StudentUpdatesPage/StudentUpdatesPage";
import StuUpdatesProgramDetails from "../../pages/StuUpdatesProgramDetails/StuUpdatesProgramDetails";
import StuUpdatesProgramPeople from "../../pages/StuUpdatesProgramDetails/StuUpdatesProgramPeople";
import StuUpdatesOrganisationDetails from "../../pages/StuUpdatesOrganisationDetails/StuUpdatesOrganisationDetails";
import StuUpdatesOrganisationPrograms from "../../pages/StuUpdatesOrganisationDetails/StuUpdatesOrganisationPrograms";
import OrgInvitationsPage from "../../pages/OrgInvitationsPage/OrgInvitationsPage";
import MentorUpdatesPage from "../../pages/MentorUpdatesPage/MentorUpdatesPage";
import MentorUpdatesOrganisationDetails from "../../pages/MentorUpdatesOrganisationDetails/MentorUpdatesOrganisationDetails";
import MentorUpdatesOrganisationPrograms from "../../pages/MentorUpdatesOrganisationDetails/MentorUpdatesOrganisationPrograms";
import MentorUpdatesProgramDetails from "../../pages/MentorUpdatesProgramDetails/MentorUpdatesProgramDetails";
import MentorUpdatesProgramPeople from "../../pages/MentorUpdatesProgramDetails/MentorUpdatesProgramPeople";
import MentorRegisterPage from "../../pages/MentorRegisterPage/MentorRegisterPage";
import StudentRegisterPage from "../../pages/StudentRegisterPage/StudentRegisterPage";
import StuSuggestedProgramsPage from "../../pages/StuSuggestedProgramsPage/StuSuggestedProgramsPage";
import StuSuggestedProgramDetails from "../../pages/StuSuggestedProgramDetails/StuSuggestedProgramDetails";
import StuSuggestedProgramApplication from "../../pages/StuSuggestedProgramDetails/StuSuggestedProgramApplication";
import MentorSuggestedProgramsPage from "../../pages/MentorSuggestedProgramsPage/MentorSuggestedProgramsPage";
import MentorSuggestedProgramDetails from "../../pages/MentorSuggestedProgramDetails/MentorSuggestedProgramDetails";
import MentorSuggestedProgramApplication from "../../pages/MentorSuggestedProgramDetails/MentorSuggestedProgramApplication";
import { StudentAPIProvider } from "../../context/api_context/StudentAPIContext";
import { MentorAPIProvider } from "../../context/api_context/MentorAPIContext";
import StudentProfileEdit from "../../pages/StudentProfileEdit/StudentProfileEdit";
import MentorProfileEdit from "../../pages/MentorProfileEdit/MentorProfileEdit";
import StuUpdatesApplicationDetails from "../../pages/StuUpdatesApplicationDetails/StuUpdatesApplicationDetails";
import MentorUpdatesApplicationDetails from "../../pages/MentorUpdatesApplicationDetails/MentorUpdatesApplicationDetails";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <PrivateRoute path={ORGANISATION_PROGRAM_CREATE} exact>
            <OrgAPIProvider>
              <CreateProgram />
            </OrgAPIProvider>
          </PrivateRoute>

          <PublicRoute path={HOME} exact>
            <Home />
          </PublicRoute>

          <PublicRoute path={LOGIN} exact>
            <Login />
          </PublicRoute>

          <PrivateRoute path={MENTOR_HOME} exact>
            <MentorHomePage />
          </PrivateRoute>

          <PrivateRoute path={MENTOR_PROFILE_BUILDER} exact>
            <ProfileBuilderProvider>
              <MentorProfileBuilder />
            </ProfileBuilderProvider>
          </PrivateRoute>

          <PrivateRoute path={MENTOR_PROFILE_EDIT} exact>
            <MentorAPIProvider>
              <MentorProfileEdit />
            </MentorAPIProvider>
          </PrivateRoute>

          <PublicRoute path={MENTOR_REGISTER} exact>
            <MentorRegisterPage />
          </PublicRoute>

          <PrivateRoute path={MENTOR_SUGGESTED_PROGRAMS} exact>
            <OrgAPIProvider>
              <MentorSuggestedProgramsPage />
            </OrgAPIProvider>
          </PrivateRoute>

          <PrivateRoute
            path={`${MENTOR_SUGGESTED_PROGRAMS}/:programId/application`}
            exact
          >
            <MentorAPIProvider>
              <MentorSuggestedProgramApplication />
            </MentorAPIProvider>
          </PrivateRoute>

          <PrivateRoute
            path={`${MENTOR_SUGGESTED_PROGRAMS}/:programId/details`}
            exact
          >
            <OrgAPIProvider>
              <MentorSuggestedProgramDetails />
            </OrgAPIProvider>
          </PrivateRoute>

          <PrivateRoute path={MENTOR_UPDATES} exact>
            <MentorAPIProvider>
              <MentorUpdatesPage />
            </MentorAPIProvider>
          </PrivateRoute>

          <PrivateRoute
            path={`${MENTOR_UPDATES_DETAILS_APPLICATION}/:applicationId/details`}
            exact
          >
            <MentorAPIProvider>
              <MentorUpdatesApplicationDetails />
            </MentorAPIProvider>
          </PrivateRoute>

          <PrivateRoute
            path={`${MENTOR_UPDATES_DETAILS_ORGANISATION}/:organisationId/details`}
            exact
          >
            <MentorUpdatesOrganisationDetails />
          </PrivateRoute>

          <PrivateRoute
            path={`${MENTOR_UPDATES_DETAILS_ORGANISATION}/:organisationId/programs`}
            exact
          >
            <MentorUpdatesOrganisationPrograms />
          </PrivateRoute>

          <PrivateRoute
            path={`${MENTOR_UPDATES_DETAILS_PROGRAM}/:programId/details`}
            exact
          >
            <OrgAPIProvider>
              <MentorUpdatesProgramDetails />
            </OrgAPIProvider>
          </PrivateRoute>

          <PrivateRoute
            path={`${MENTOR_UPDATES_DETAILS_PROGRAM}/:programId/people`}
            exact
          >
            <OrgAPIProvider>
              <MentorUpdatesProgramPeople />
            </OrgAPIProvider>
          </PrivateRoute>

          <PublicRoute path={ORGANISATION_REGISTER} exact>
            <OrganisationRegister />
          </PublicRoute>

          <PrivateRoute path={ORGANISATION_APPLICANTS} exact>
            <OrgApplicantsPage />
          </PrivateRoute>

          <PrivateRoute path={ORGANISATION_DIRECTORY} exact>
            <OrgAPIProvider>
              <OrgDirectoryPage />
            </OrgAPIProvider>
          </PrivateRoute>

          <PrivateRoute
            path={`${ORGANISATION_DIRECTORY_DETAILS_MENTOR}/:mentorId/details`}
            exact
          >
            <OrgAPIProvider>
              <OrgDirectoryMentorDetailsPage />
            </OrgAPIProvider>
          </PrivateRoute>

          <PrivateRoute
            path={`${ORGANISATION_DIRECTORY_DETAILS_STUDENT}/:studentId/details`}
            exact
          >
            <OrgAPIProvider>
              <OrgDirectoryStudentDetailsPage />
            </OrgAPIProvider>
          </PrivateRoute>

          <PrivateRoute path={ORGANISATION_HOME} exact>
            <ProfileBuilderProvider>
              <OrgAPIProvider>
                <OrgHomePage />
              </OrgAPIProvider>
            </ProfileBuilderProvider>
          </PrivateRoute>

          <PrivateRoute path={ORGANISATION_INVITATIONS} exact>
            <OrgInvitationsPage />
          </PrivateRoute>

          <PrivateRoute path={ORGANISATION_PROFILE_BUILDER} exact>
            <ProfileBuilderProvider>
              <OrgProfileBuilder />
            </ProfileBuilderProvider>
          </PrivateRoute>

          <PrivateRoute path={ORGANISATION_PROFILE_EDIT} exact>
            <OrgAPIProvider>
              <OrgProfileEdit />
            </OrgAPIProvider>
          </PrivateRoute>

          <PrivateRoute
            path={`${ORGANISATION_PROGRAM_DETAILS}/:programId/applicants`}
            exact
          >
            <OrgAPIProvider>
              <OrgProgramApplicantsPage />
            </OrgAPIProvider>
          </PrivateRoute>

          <PrivateRoute
            path={`${ORGANISATION_PROGRAM_DETAILS}/:programId/applicants/mentor/application/:applicationId/details`}
            exact
          >
            <OrgAPIProvider>
              <OrgSpecificMentorApplicantDetailsPage />
            </OrgAPIProvider>
          </PrivateRoute>

          <PrivateRoute
            path={`${ORGANISATION_PROGRAM_DETAILS}/:programId/applicants/student/application/:applicationId/details`}
            exact
          >
            <OrgAPIProvider>
              <OrgSpecificStudentApplicantDetailsPage />
            </OrgAPIProvider>
          </PrivateRoute>

          <PrivateRoute
            path={`${ORGANISATION_PROGRAM_DETAILS}/:programId/details`}
            exact
          >
            <OrgAPIProvider>
              <OrgProgramDetailsPage />
            </OrgAPIProvider>
          </PrivateRoute>

          <PrivateRoute
            path={`${ORGANISATION_PROGRAM_DETAILS}/:programId/edit`}
            exact
          >
            <OrgAPIProvider>
              <OrgEditProgramDetailsPage />
            </OrgAPIProvider>
          </PrivateRoute>

          <PrivateRoute
            path={`${ORGANISATION_PROGRAM_DETAILS}/:programId/invitations`}
            exact
          >
            <OrgAPIProvider>
              <OrgProgramInvitationsPage />
            </OrgAPIProvider>
          </PrivateRoute>

          <PrivateRoute
            path={`${ORGANISATION_PROGRAM_DETAILS}/:programId/participants`}
            exact
          >
            <OrgAPIProvider>
              <OrgProgramParticipantsPage />
            </OrgAPIProvider>
          </PrivateRoute>

          <PrivateRoute
            path={`${ORGANISATION_PROGRAM_VIEW_SEARCH}/:filterBy`}
            exact
          >
            <OrgAPIProvider>
              <OrgViewSearchProgramPage />
            </OrgAPIProvider>
          </PrivateRoute>

          <PrivateRoute path={STUDENT_HOME} exact>
            <StudentHomePage />
          </PrivateRoute>

          <PrivateRoute path={STUDENT_DASHBOARD} exact>
            <StudentDashboard />
          </PrivateRoute>

          <PublicRoute path={STUDENT_MENTOR_REGISTER} exact>
            <StudentMentorRegister />
          </PublicRoute>

          <PrivateRoute path={STUDENT_PROFILE_BUILDER} exact>
            <ProfileBuilderProvider>
              <StuProfileBuilder />
            </ProfileBuilderProvider>
          </PrivateRoute>

          <PrivateRoute path={STUDENT_PROFILE_EDIT} exact>
            <StudentAPIProvider>
              <StudentProfileEdit />
            </StudentAPIProvider>
          </PrivateRoute>

          <PublicRoute path={STUDENT_REGISTER} exact>
            <StudentRegisterPage />
          </PublicRoute>

          <PrivateRoute path={STUDENT_SUGGESTED_PROGRAMS} exact>
            <OrgAPIProvider>
              <StuSuggestedProgramsPage />
            </OrgAPIProvider>
          </PrivateRoute>

          <PrivateRoute
            path={`${STUDENT_SUGGESTED_PROGRAMS}/:programId/application`}
            exact
          >
            <StudentAPIProvider>
              <StuSuggestedProgramApplication />
            </StudentAPIProvider>
          </PrivateRoute>

          <PrivateRoute
            path={`${STUDENT_SUGGESTED_PROGRAMS}/:programId/details`}
            exact
          >
            <OrgAPIProvider>
              <StuSuggestedProgramDetails />
            </OrgAPIProvider>
          </PrivateRoute>

          <PrivateRoute path={STUDENT_UPDATES} exact>
            <StudentAPIProvider>
              <StudentUpdatesPage />
            </StudentAPIProvider>
          </PrivateRoute>

          <PrivateRoute
            path={`${STUDENT_UPDATES_DETAILS_APPLICATION}/:applicationId/details`}
            exact
          >
            <StudentAPIProvider>
              <StuUpdatesApplicationDetails />
            </StudentAPIProvider>
          </PrivateRoute>

          <PrivateRoute
            path={`${STUDENT_UPDATES_DETAILS_ORGANISATION}/:organisationId/details`}
            exact
          >
            <StuUpdatesOrganisationDetails />
          </PrivateRoute>

          <PrivateRoute
            path={`${STUDENT_UPDATES_DETAILS_ORGANISATION}/:organisationId/programs`}
            exact
          >
            <StuUpdatesOrganisationPrograms />
          </PrivateRoute>

          <PrivateRoute
            path={`${STUDENT_UPDATES_DETAILS_PROGRAM}/:programId/details`}
            exact
          >
            <OrgAPIProvider>
              <StuUpdatesProgramDetails />
            </OrgAPIProvider>
          </PrivateRoute>

          <PrivateRoute
            path={`${STUDENT_UPDATES_DETAILS_PROGRAM}/:programId/people`}
            exact
          >
            <OrgAPIProvider>
              <StuUpdatesProgramPeople />
            </OrgAPIProvider>
          </PrivateRoute>

          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
