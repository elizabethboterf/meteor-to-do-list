import { Meteor } from "meteor/meteor"
import { Task, TasksCollection } from "./TasksCollection";
import { Mongo } from 'meteor/mongo';
import { array, string, object, boolean } from "yup";
import { Accounts } from 'meteor/accounts-base';

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

export const doesUserExist= async (userId) => {
    try {
        const userToFind = await Meteor.users.findOne(userId)

        if(!userToFind) {
            throw new Meteor.Error("User does not exist");
        }
        
        return userToFind;

    } catch (e) {
        console.log(e);
        throw new Meteor.Error("Something went wrong");
    }
}

export const createNewUser= async ({username, password}) => {
    const {firstName, lastName, admin}={ firstName: "elizabeth", lastName: "boterf", admin: true};
    try{
        //console.log(firstName, lastName, admin, username, password);
        
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

Meteor.methods({
    "user.deleteUser": async(userId, admin) =>{
        if(admin){
            try{
                await doesUserExist(userId);
                
                let result;
                try {
                    //await doesUserExist(userId);
                    const tasksExist= TasksCollection.findOne({userId})
                    if(tasksExist){
                      await TasksCollection.deleteMany({userId});  
                    }
                    
                    result= true;

                } catch (e) {
                    console.log(e);
                    throw new Meteor.Error("Could not remove tasks");
                }
                
                //check for success in deleting tasks;
                if(result){
                    try{
                        //delete user from collection
                        const deletedUser=Meteor.users.deleteMany({_id: userId})
                        //return deleted user
                        return deletedUser;
                    }catch(e){
                        console.log("failed to remove user");
                        throw e;
                    }
                }else{
                    console.log("failed to delete tasks, kept user");
                }
            }catch(e){
                console.log(e);
                //throw new Meteor.Error("Something went wrong");
            } 
        }else{
            throw new Meteor.Error("You are not an administrator");
        }
        
    }
})


