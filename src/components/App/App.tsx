import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import OrganisationRegistration from "../../pages/OrganisationRegistration";
import { ORGANISATION_REGISTRATION } from "../../routes/Routes";
import Navbar from "../Navbar/Navbar";
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path={ORGANISATION_REGISTRATION} exact>
            <OrganisationRegistration />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
