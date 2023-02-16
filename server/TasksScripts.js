import { Task, TasksCollection } from "../imports/api/TasksCollection"
import { asyncForEach } from "../imports/api/helpers";

//export const TasksCollection = new Mongo.Collection('tasks');

export const addTasks = async (inputTasks) => {
    try {
        await asyncForEach(inputTasks, async(inputTask) => {
            console.log(`Adding ${inputTask.text}`);
            const taskToSave = new Task(inputTask)

            const savedTask = await taskToSave.save();
            console.log(`Added`);
            return savedTask;
        })

        return 1
    } catch (e) {
        console.log(e);
        return e
    }
}
export const toggleComplete = async (tasksToUpdate)=>{
    try{
        await tasksToUpdate.asyncForEach(tasksToUpdate, async(taskToUpdate)=>{
            const taskFound= Task.findOne(taskToUpdate);
            console.log(taskFound);
            taskFound.set('completed', true);
            taskFound.save();
        });
      }catch(e){
        console.log(e);
        throw(e);
      }
}
