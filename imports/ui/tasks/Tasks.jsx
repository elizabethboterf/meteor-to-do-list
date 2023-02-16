import React from "react"
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { TasksCollection } from "../../api/TasksCollection.js";
import TaskTable from './TaskTable.jsx';
import { TaskForm } from "./TaskForm.jsx";

const Tasks = ({ tasks, isLoading }) => {
    if(isLoading){
        return <p>Data Loading</p>
    }
    return (
        <>
           <TaskForm />
           <TaskTable tasks={tasks} /> 
        </>
        
    )
}

export const TasksContainer = withTracker(() => {
    const handle = Meteor.subscribe("allTasks")

    const isLoading = !handle.ready()

    return {
        isLoading,
        tasks: TasksCollection.find().fetch()
    }
})(Tasks)