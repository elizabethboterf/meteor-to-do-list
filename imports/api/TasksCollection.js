import { Meteor } from "meteor/meteor"
import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';
import dayjs from "dayjs";
import { doesUserExist } from "./UsersCollection";

export const TasksCollection = new Mongo.Collection('tasks');

export const Task= Class.create({
    name:'Task',
    collection:TasksCollection,
    fields:{
        text:{
            type: String,
            required: true
        },
        completed:{
            type: Boolean,
            default: false
        },
        createdAt:{
            type: Number,
            default: dayjs().valueOf()
        },
        lastUpdate:{
            type: Number,
            default: dayjs().valueOf()
        },
        userId:{
            type: String,
            default: ""
        },
        
    },
    meteorMethods:{
        async toggleComplete(){
            try{
                const completeStatus= this.completed;
                this.completed= !completeStatus;
                this.save();
            }catch(e){
                console.log(e);
                throw(e)
            }
        },
        async delete () {
            try {
                this.remove();
            } catch(e){
                console.log(e);
                throw(e)
            }
        }
    },
    events:{
            beforeSave({ currentTarget}){
                const {isNew}= currentTarget;
                if(!isNew){
                    currentTarget.lastUpdate=dayjs().valueOf();
                }
                else {
                    console.log(`Document is new`);
                    console.log(currentTarget);
                }
            }
        }
});

Meteor.methods({
    "user.addTask": async (userId, taskInput) => {
        try {
            const userForTask = await doesUserExist(userId);
            const taskToAdd = new Task({
                text: taskInput,
                userId
            })
  
            const savedTask = await taskToAdd.save();
            return savedTask;
        } catch (e) {
            console.log(e);
            throw new Meteor.Error("Something went wrong");
        }
    },
})

