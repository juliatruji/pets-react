import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { Routes } from "../routes";

// pages
import Adoptions from "./Adoptions/Brain/index";
import Adopters from "./Adopters/Brain/index";
import Dogs from "./Dogs/Brain/index";
import VaccineControl from "./VaccineControl/Brain/index";
import Dashboard from './dashboard/DashboardOverview'
import BootstrapTables from "./tables/BootstrapTables";
import Signin from "./examples/Signin";
import Signup from "./examples/Signup";
import ForgotPassword from "./examples/ForgotPassword";
import ResetPassword from "./examples/ResetPassword";
import Lock from "./examples/Lock";
import NotFoundPage from "./examples/NotFound";
import ServerError from "./examples/ServerError";

// components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import Preloader from "../components/Preloader";



const RouteWithLoader = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route {...rest} render={props => ( <> <Preloader show={loaded ? false : true} /> <Component {...props} /> </> ) } />
  );
};

const RouteWithSidebar = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const localStorageIsSettingsVisible = () => {
    return localStorage.getItem('settingsVisible') === 'false' ? false : true
  }

  const [showSettings, setShowSettings] = useState(localStorageIsSettingsVisible);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    localStorage.setItem('settingsVisible', !showSettings);
  }

  return (
    <Route {...rest} render={props => (
      <>
        <Preloader show={loaded ? false : true} />
        <Sidebar />

        <main className="content">
          <Navbar />
          <Component {...props} />
          {/* <Footer toggleSettings={toggleSettings} showSettings={showSettings} /> */}
        </main>
      </>
    )}
    />
  );
};

export default () => {

  return <Switch>
    
        <RouteWithLoader exact path={Routes.Signin.path} component={Signin} />
     
    {/* <RouteWithLoader exact path={Routes.Signup.path} component={Signup} /> */}
    {/* <RouteWithLoader exact path={Routes.ForgotPassword.path} component={ForgotPassword} /> */}
    {/* <RouteWithLoader exact path={Routes.ResetPassword.path} component={ResetPassword} /> */}
    {/* <RouteWithLoader exact path={Routes.Lock.path} component={Lock} /> */}
    <RouteWithLoader exact path={Routes.NotFound.path} component={NotFoundPage} />
    {/* <RouteWithLoader exact path={Routes.ServerError.path} component={ServerError} /> */}
    {/* pages */}
    <RouteWithSidebar exact path={Routes.Dashboard.path} component={Dashboard} />

    <RouteWithSidebar exact path={Routes.Adoptions.path} component={Adoptions} />
    <RouteWithSidebar exact path={Routes.Adopters.path} component={Adopters} />
    <RouteWithSidebar exact path={Routes.Dogs.path} component={Dogs} />
    <RouteWithSidebar exact path={Routes.VaccineControl.path} component={VaccineControl} />
    {/* <RouteWithSidebar exact path={Routes.BootstrapTables.path} component={BootstrapTables} /> */}

    {!localStorage.getItem('token') && <Redirect to={Routes.Signin.path} />}
    {localStorage.getItem('token') && <Redirect to={Routes.NotFound.path} />}
  </Switch>
};
