import { doesUserExist } from "../imports/api/UsersCollection";


if(Meteor.isServer){
    const user= Meteor.user();

    Meteor.users.allow({
        remove(user){
            return user.profile && user.profile.admin;
        }
    })
}
    



