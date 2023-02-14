import React, {useState, useEffect, Fragment} from 'react';
import {useTracker} from 'meteor/react-meteor-data';
import { TasksContainer } from './Tasks.jsx';
import { TaskForm } from './TaskForm';
import { LoginForm } from './LoginForm.jsx';
import { ResponsiveAppBar } from './AppBarForUser.jsx';


export const App = () => { 
  
  const user= useTracker( ()=>{
    const currentUser= Meteor.user();
    return currentUser
  });

  return(
    <div className= "main">
      {user&&user.profile.admin? (
        <Fragment>
          <ResponsiveAppBar />
          <div style={{paddingTop: '15px'}}>
            <TaskForm />
          </div>

          <div className="filter">
            later add filter options
          </div>
          <TasksContainer />
        </Fragment>
      ): (
        <LoginForm />
      )}
    </div>
  )
};
