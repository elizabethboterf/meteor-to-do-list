import {Meteor} from 'meteor/meteor';
import React, {useState} from 'react';
import { Accounts } from 'meteor/accounts-base';
import { createNewUser } from '../api/UsersCollection';

export const LoginForm= ()=>{
    const [username, setUsername]= useState();
    const [password, setPassword]= useState();

    const submit= e => {
        e.preventDefault();
        Meteor.loginWithPassword(username, password);
    }

    const newUser = e => {
        e.preventDefault();
        createNewUser({username, password});
    }

    return(
        <form onSubmit={submit} className="login-form">
            <div>
               <label htmlFor="username">Username</label>
                <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    required
                    onChange={e=>setUsername(e.target.value)}
                /> 
            </div>
            <div>
               <label htmlFor="passsword">Password</label>
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    required
                    onChange={e => setPassword(e.target.value)}
                /> 
            </div>
           
            <div>
                <button type="submit">Log In</button> 
            </div>
            <div> 
               <button onClick={newUser}>Create New User</button>
            </div>
        </form>
    );
}