import React, { Fragment } from "react";
import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import {useTracker} from 'meteor/react-meteor-data';
import { LoginForm } from "./LoginForm";
import { TasksContainer } from "./tasks/Tasks";
import { UsersContainer } from "./users/Users";
import { AppBarPrivate } from "./AppBarPrivate";
import { AppBarPublic } from "./AppBarPublic";

export const PublicLayout = () => {
    return(
        <Fragment>
            <AppBarPublic/>
            <Outlet />
        </Fragment>
    )
}

export const PrivateLayout = () => {
    const isUser = useTracker( ()=> Meteor.user());
    return (
        <Fragment>
            {isUser ? (
                <>
                    <AppBarPrivate />
                    <Outlet />
                </>
            ) : (
                <Navigate to="/login" />
            )}
        </Fragment>
        
    );
}

export const Views = () =>{
    return (
        <Routes>
            <Route path="/" element={<PublicLayout />} >
                <Route path="/login" element={<LoginForm />} />
            </Route>
            <Route element={<PrivateLayout />}>
                <Route path="/tasks" element={<TasksContainer />} />
                <Route path="/view-users" element={<UsersContainer />} />
            </Route> 
        </Routes>
    )
}

