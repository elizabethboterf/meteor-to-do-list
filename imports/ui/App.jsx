import React, {useState, useEffect, Fragment} from 'react';
import {useTracker} from 'meteor/react-meteor-data';
import { TasksContainer } from './tasks/Tasks.jsx';
import { TaskForm } from './tasks/TaskForm';
import { LoginForm } from './LoginForm.jsx';
import { AppBarPrivate } from './AppBarPrivate.jsx';
import { Route, Routes } from 'react-router-dom'; // Changed switch -> Routes


export const App = () => { 
  
  const user= useTracker( ()=>{
    const currentUser= Meteor.user();
    return currentUser
  });

  return(
    <Routes>
        <Route exact path="/" element={<AppBarPublic/>} render={() => (
          user? (
            <Redirect to="/tasks" />
          ) : (
            <LoginForm />
          )
        )} />
        <Route exact path="/tasks" render={() => (
          user && user.profile.admin ? (
            <Fragment>
              <AppBarPrivate />
              <div className="filter" style={{paddingTop: '15px'}} >
                later add filter options
              </div>
              <TasksContainer/>
            </Fragment>
          ) : (
            <Redirect to="/" />
          )
        )} />
      </ Routes>
  );
};