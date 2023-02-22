import React from "react";
import { AppBar } from "./AppBar";
import { useLoggedUser } from 'meteor/quave:logged-user-react';


export const App = ()=>{
    const { loggedUser, isLoadingLoggedUser }= useLoggedUser();

    return(
        <>
            <AppBar loggedUser={loggedUser} isLoadingLoggedUser={isLoadingLoggedUser} />
            <Views loggedUser={loggedUser} isLoadingLoggedUser={isLoadingLoggedUser} />
        </>
    )
}