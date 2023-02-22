import React, { Fragment } from "react";
import { Route, Routes, Outlet, Navigate, useLocation } from "react-router-dom";
import {useTracker} from 'meteor/react-meteor-data';
import { LoginForm } from "./LoginForm";
import { TasksContainer } from "./tasks/Tasks";
import { UsersContainer } from "./users/Users";
import { AppBarPrivate } from "./AppBarPrivate";
import { AppBarPublic } from "./AppBarPublic";
import { useLoggedUser } from 'meteor/quave:logged-user-react';


export const AnonymousOnly = ({loggedUser, isLoadingLoggedUser}) => {
    const location = useLocation();
    if(isLoadingLoggedUser){
        return "Loading";
    }
    if(loggedUser){
        return <Navigate to="/tasks" state={{from: location}} replace />
    }

    return(
        <Outlet />
    )
}

export const PrivateLayout = () => {
    const { loggedUser, isLoadingLoggedUser }= useLoggedUser();
    //const isUser = useTracker( ()=> Meteor.user());

    if(isLoadingLoggedUser){
        return "Loading";
    }

    if(!loggedUser){
        return (
            <Navigate to="/login" />
        );
    }
    return (
        <Outlet />   
    );
}

export const Views = () =>{
    return (
        <Routes>
            <Route path="/" element={<AnonymousOnly />} >
                <Route path="/login" element={<LoginForm />} />

            </Route>
            <Route element={<PrivateLayout />}>
                <Route path="/tasks" element={<TasksContainer />} />
                <Route path="/view-users" element={<UsersContainer />} />
            </Route> 
        </Routes>
    )
}

