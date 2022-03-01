const Task = require("./models/Task");

const resolvers = {
    Query : {
        hello: () => 'Hello world', 
        getAllTasks: async () => {
            const tasks = await Task.find();
            return tasks;   
        },
        getTask: async (_, args) => {
            const { id } = args;
            const task = await Task.findById(id);
            return task;
        }
    },
    Mutation : {
        createTask: async (_, args) => {
            const { title, description } = args.task;
            const newTask = new Task({ title, description });
            await newTask.save();
            return newTask;
        },
        updateTask: async (_, {task, id})=>{
            const taskUpdated = await Task.findByIdAndUpdate(
                  id, 
                { $set: task }, 
                { new: true })
            return taskUpdated;
        },
        deleteTask: async (_,{id})=>{
            await Task.findByIdAndDelete(id);
            return "Task Deleted";
        } 
    }
}

module.exports = { resolvers };