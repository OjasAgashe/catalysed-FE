import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "../../pages/Login/Login";
import OrganisationRegister from "../../pages/OrganisationRegister/OrganisationRegister";
import StudentMentorRegister from "../../pages/StudentMentorRegister/StudentMentorRegister";
import {
  LOGIN,
  ORGANISATION_REGISTER,
  STUDENT_MENTOR_REGISTER,
} from "../../routes/Routes";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path={ORGANISATION_REGISTER} exact>
            <OrganisationRegister />
          </Route>
          <Route path={LOGIN}>
            <Login />
          </Route>
          <Route path={STUDENT_MENTOR_REGISTER}>
            <StudentMentorRegister />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
