import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
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
  ORGANISATION_PROGRAM_INVITATIONS,
  ORGANISATION_PROGRAM_PARTICIPANTS,
  ORGANISATION_PROGRAM_EDIT,
  ORGANISATION_DIRECTORY,
  ORGANISATION_DIRECTORY_DETAILS_MENTOR,
  ORGANISATION_DIRECTORY_DETAILS_STUDENT,
  ORGANISATION_PROFILE_MANAGE,
  ORGANISATION_PROFILE_EDIT,
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
import OrgDirectoryPage from "../../pages/OrgDirectoryPage/OrgDirectoryPage";
import OrgDirectoryMentorPage from "../../pages/OrgDirectoryPage/OrgDirectoryMentorPage";
import OrgDirectoryStudentPage from "../../pages/OrgDirectoryPage/OrgDirectoryStudentPage";
import OrgProfileManage from "../../pages/OrgProfileManage/OrgProfileManage";
import OrgProfileEdit from "../../pages/OrgProfileEdit/OrgProfileEdit";

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

          <PublicRoute path={ORGANISATION_REGISTER} exact>
            <OrganisationRegister />
          </PublicRoute>

          <PrivateRoute path={ORGANISATION_DIRECTORY} exact>
            <OrgDirectoryPage />
          </PrivateRoute>

          <PrivateRoute
            path={`${ORGANISATION_DIRECTORY_DETAILS_MENTOR}/:mentorId`}
            exact
          >
            <OrgDirectoryMentorPage />
          </PrivateRoute>

          <PrivateRoute
            path={`${ORGANISATION_DIRECTORY_DETAILS_STUDENT}/:studentId`}
            exact
          >
            <OrgDirectoryStudentPage />
          </PrivateRoute>

          <PrivateRoute path={ORGANISATION_HOME} exact>
            <ProfileBuilderProvider>
              <OrgAPIProvider>
                <OrgHomePage />
              </OrgAPIProvider>
            </ProfileBuilderProvider>
          </PrivateRoute>

          <PrivateRoute path={ORGANISATION_PROFILE_BUILDER} exact>
            <ProfileBuilderProvider>
              <OrgProfileBuilder />
            </ProfileBuilderProvider>
          </PrivateRoute>

          <PrivateRoute path={ORGANISATION_PROFILE_EDIT} exact>
            <OrgProfileEdit />
          </PrivateRoute>

          <PrivateRoute path={ORGANISATION_PROFILE_MANAGE} exact>
            <OrgProfileManage />
          </PrivateRoute>

          <PrivateRoute
            path={`${ORGANISATION_PROGRAM_DETAILS}/:programId`}
            exact
          >
            <OrgAPIProvider>
              <OrgProgramDetailsPage />
            </OrgAPIProvider>
          </PrivateRoute>

          <PrivateRoute path={`${ORGANISATION_PROGRAM_EDIT}/:programId`} exact>
            <OrgAPIProvider>
              <OrgEditProgramDetailsPage />
            </OrgAPIProvider>
          </PrivateRoute>

          <PrivateRoute
            path={`${ORGANISATION_PROGRAM_INVITATIONS}/:programId`}
            exact
          >
            <OrgAPIProvider>
              <OrgProgramInvitationsPage />
            </OrgAPIProvider>
          </PrivateRoute>

          <PrivateRoute
            path={`${ORGANISATION_PROGRAM_PARTICIPANTS}/:programId`}
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

          <PublicRoute path={STUDENT_MENTOR_REGISTER} exact>
            <StudentMentorRegister />
          </PublicRoute>

          <PrivateRoute path={STUDENT_PROFILE_BUILDER} exact>
            <ProfileBuilderProvider>
              <StuProfileBuilder />
            </ProfileBuilderProvider>
          </PrivateRoute>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
