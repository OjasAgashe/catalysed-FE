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
import { OrgCreateProgramProvider } from "../../context/api_context/OrgCreateProgramContext";
import OrgProgramDetailsPage from "../../pages/OrgProgramDetails/OrgProgramDetailsPage";
import OrgProgramInvitationsPage from "../../pages/OrgProgramDetails/OrgProgramInvitationsPage";
import OrgProgramParticipantsPage from "../../pages/OrgProgramDetails/OrgProgramParticipantsPage";
import OrgEditProgramDetailsPage from "../../pages/OrgEditProgramDetailsPage/OrgEditProgramDetailsPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <PrivateRoute path={ORGANISATION_PROGRAM_CREATE}>
            <OrgCreateProgramProvider>
              <CreateProgram />
            </OrgCreateProgramProvider>
          </PrivateRoute>

          <PublicRoute path={HOME} exact>
            <Home />
          </PublicRoute>

          <PublicRoute path={LOGIN}>
            <Login />
          </PublicRoute>

          <PrivateRoute path={MENTOR_HOME}>
            <MentorHomePage />
          </PrivateRoute>

          <PrivateRoute path={MENTOR_PROFILE_BUILDER}>
            <ProfileBuilderProvider>
              <MentorProfileBuilder />
            </ProfileBuilderProvider>
          </PrivateRoute>

          <PublicRoute path={ORGANISATION_REGISTER}>
            <OrganisationRegister />
          </PublicRoute>

          <PrivateRoute path={ORGANISATION_HOME}>
            <ProfileBuilderProvider>
              <OrgCreateProgramProvider>
                <OrgHomePage />
              </OrgCreateProgramProvider>
            </ProfileBuilderProvider>
          </PrivateRoute>

          <PrivateRoute path={ORGANISATION_PROFILE_BUILDER}>
            <ProfileBuilderProvider>
              <OrgProfileBuilder />
            </ProfileBuilderProvider>
          </PrivateRoute>

          <PrivateRoute path={`${ORGANISATION_PROGRAM_DETAILS}/:programId`}>
            <OrgCreateProgramProvider>
              <OrgProgramDetailsPage />
            </OrgCreateProgramProvider>
          </PrivateRoute>

          <PrivateRoute path={`${ORGANISATION_PROGRAM_EDIT}/:programId`}>
            <OrgCreateProgramProvider>
              <OrgEditProgramDetailsPage />
            </OrgCreateProgramProvider>
          </PrivateRoute>

          <PrivateRoute path={`${ORGANISATION_PROGRAM_INVITATIONS}/:programId`}>
            <OrgCreateProgramProvider>
              <OrgProgramInvitationsPage />
            </OrgCreateProgramProvider>
          </PrivateRoute>

          <PrivateRoute
            path={`${ORGANISATION_PROGRAM_PARTICIPANTS}/:programId`}
          >
            <OrgCreateProgramProvider>
              <OrgProgramParticipantsPage />
            </OrgCreateProgramProvider>
          </PrivateRoute>

          <PrivateRoute path={`${ORGANISATION_PROGRAM_VIEW_SEARCH}/:filterBy`}>
            <OrgCreateProgramProvider>
              <OrgViewSearchProgramPage />
            </OrgCreateProgramProvider>
          </PrivateRoute>

          <PrivateRoute path={STUDENT_HOME}>
            <StudentHomePage />
          </PrivateRoute>

          <PublicRoute path={STUDENT_MENTOR_REGISTER}>
            <StudentMentorRegister />
          </PublicRoute>

          <PrivateRoute path={STUDENT_PROFILE_BUILDER}>
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
