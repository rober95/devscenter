import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import Navbar from '../layout/Navbar';
import Landing from '../layout/Landing';
import Footer from '../layout/Footer';

import Register from '../auth/Register';
import Login from '../auth/Login';
import Dashboard from '../dashboard/Dashboard';
import CreateProfile from '../create-profile/CreateProfile';
import EditProfile from '../edit-profile/EditProfile';
import AddExperience from '../add-career/AddExperience';
import AddEducation from '../add-career/AddEducation';
import Profiles from '../profiles/Profiles';
import Profile from '../profile/Profile';
import Posts from '../posts/Posts';
import Post from '../post/Post';
import NotFound from '../not-found/NotFound';

const Routes = () => (
  <Router>
    <div className="App">
      <Navbar />
      <Route exact path="/" component={Landing} />
      <div className="container d-flex flex-column main-container mb-5">
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profiles" component={Profiles} />
        <Route exact path="/profile/:handle" component={Profile} />
        <Switch>
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
        </Switch>
        <Switch>
          <PrivateRoute
            exact
            path="/create-profile"
            component={CreateProfile}
          />
        </Switch>
        <Switch>
          <PrivateRoute exact path="/edit-profile" component={EditProfile} />
        </Switch>
        <Switch>
          <PrivateRoute
            exact
            path="/add-experience"
            component={AddExperience}
          />
        </Switch>
        <Switch>
          <PrivateRoute exact path="/add-education" component={AddEducation} />
        </Switch>
        <Switch>
          <PrivateRoute exact path="/feed" component={Posts} />
        </Switch>
        <Switch>
          <PrivateRoute exact path="/post/:id" component={Post} />
        </Switch>
        <Route exact path="/not-found" component={NotFound} />
      </div>
      <Footer />
    </div>
  </Router>
);

export default Routes;
