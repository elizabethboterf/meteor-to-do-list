import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { TasksCollection } from '../imports/api/TasksCollection';
//import { Task } from '../imports/api/TasksCollection';

const SEED_USERNAME = 'meteorite';
const SEED_PASSWORD = 'password';

if(Meteor.isServer){
  Meteor.publish("allTasks", () => TasksCollection.find({},{sort: {createdAt: -1 } }));
  Meteor.publish("allUsers", () => Meteor.users.find({}));
}

Meteor.startup(() => {

  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }
});