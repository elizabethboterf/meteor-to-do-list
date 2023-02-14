import { Meteor } from "meteor/meteor"
import { Task } from "./TasksCollection";
import { Mongo } from 'meteor/mongo';
import { array, string, object, boolean } from "yup";
import { Accounts } from 'meteor/accounts-base';

Meteor.subscribe("allUsers");
 

const profileSchemaFields = {
    firstName: string()
            .matches(/^[a-zA-Z -]*$/)
            .required(),
        lastName: string()
            .matches(/^[a-zA-Z -]*$/)
            .required(),
        admin: boolean()
};
const profileSchema = object(profileSchemaFields);

const userSchemaFields = {
    password: string().required(),
    profile: profileSchema    
} 
const userSchema= object(userSchemaFields);



export const createNewUser= async ({username, password}) => {
    const {firstName, lastName, admin}={ firstName: "elizabeth", lastName: "boterf", admin: true};
    try{
        console.log(firstName, lastName, admin, username, password);
        
        userSchema.validateSync( 
            { username, password, profile: { firstName, lastName, admin } },
            { strict: true });
    }catch(e){
        console.log(e);
        throw(e);
    }

    const userId= await Accounts.createUser({
        username, 
        password,
        profile:{
            firstName,
            lastName,
            admin
        }
    });

    return userId;
}

