import React from "react"
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import {UsersTable} from "./UsersTable";


const Users = ({ users, isLoading }) => {
    if(isLoading){
        return <p>Data Loading</p>
    }
    return (
        <>
           <UsersTable users={users} /> 
        </>
        
    )
}

export const UsersContainer = withTracker(() => {
    const userId = Meteor.userId();
    const handle = Meteor.subscribe("allUsers")

    const isLoading = !handle.ready()

    return {
        isLoading,
        users: Meteor.users.find({_id: { $ne: userId} }).fetch()
    }
})(Users)