import {Meteor} from 'meteor/meteor';
import React, {useState} from 'react';
import { createNewUser } from '../api/UsersCollection';
import { useNavigate } from 'react-router-dom';


export const LoginForm= ()=>{
    const navigate= useNavigate();

    const [username, setUsername]= useState();
    const [password, setPassword]= useState();

    const submit= e => {
        e.preventDefault();
        Meteor.loginWithPassword(username, password);
        navigate("/tasks");
    }

    const newUser = async(e) => {
        e.preventDefault();
        try{
          await createNewUser({username, password});
          navigate("/tasks");  
        }catch(e){
            console.log(e);
        }
        
    }

    return(
        <>
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
        </>
        
    );
}