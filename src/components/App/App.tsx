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
} from "../../routes/Routes";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./App.css";
import MentorProfileBuilder from "../../pages/MentorProfileBuilder/MentorProfileBuilder";
import StuProfileBuilder from "../../pages/StuProfileBuilder/StuProfileBuilder";
import { ProfileBuilderProvider } from "../../api_context/ProfileBuilderContext";
import { AuthProvider } from "../../api_context/AuthContext";
import CreateProgram from "../../pages/CreateProgram/CreateProgram";
import OrgHomePage from "../../pages/OrgHomePage/OrgHomePage";
import StudentHomePage from "../../pages/StudentHomePage/StudentHomePage";
import MentorHomePage from "../../pages/MentorHomePage/MentorHomePage";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path={HOME} exact>
            <Home />
          </Route>

          <Route path={ORGANISATION_REGISTER}>
            <OrganisationRegister />
          </Route>
          <Route path={STUDENT_MENTOR_REGISTER}>
            <StudentMentorRegister />
          </Route>

          <AuthProvider>
            <Route path={LOGIN}>
              <Login />
            </Route>

            <ProfileBuilderProvider>
              <Route path={ORGANISATION_PROFILE_BUILDER}>
                <OrgProfileBuilder />
              </Route>

              <Route path={STUDENT_PROFILE_BUILDER}>
                <StuProfileBuilder />
              </Route>

              <Route path={MENTOR_PROFILE_BUILDER}>
                <MentorProfileBuilder />
              </Route>
            </ProfileBuilderProvider>

            <Route path={ORGANISATION_PROGRAM_CREATE}>
              <CreateProgram />
            </Route>

            <Route path={ORGANISATION_HOME}>
              <OrgHomePage />
            </Route>
            <Route path={STUDENT_HOME}>
              <StudentHomePage />
            </Route>
            <Route path={MENTOR_HOME}>
              <MentorHomePage />
            </Route>
          </AuthProvider>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
