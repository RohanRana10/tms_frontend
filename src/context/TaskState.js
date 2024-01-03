import React, { useState } from 'react'
import TaskContext from './taskContext'

const TaskState = (props) => {

    const [tasks, setTasks] = useState([]);
    const host = process.env.REACT_APP_BASE_URL;

    //fetch all available tasks
    const getTasks = async () => {

        const response = await fetch(`${host}/tasks/alltasks`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authtoken": localStorage.getItem('authtoken')
            }
        });
        const json = await response.json();
        console.log(json);
        setTasks(json.tasks);
    }

    //add a new task
    const addTask = async (title, description, tag, isComplete) => {

        const response = await fetch(`${host}/tasks/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authtoken": localStorage.getItem('authtoken')
            },
            body: JSON.stringify({ title, description, tag: tag === '' ? 'General' : tag, isComplete })
        });

        const json = await response.json();
        console.log("task created");

        let newTasks = tasks.concat(json.task);
        setTasks(newTasks);

        let data = {
            success: json.success,
            message: json.message,
            error: json.error
        }

        return data;
    }

    //delete a task
    const deleteTask = async (taskId) => {
        const response = await fetch(`${host}/tasks/delete/${taskId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "authtoken": localStorage.getItem('authtoken')
            }
        });

        const json = await response.json();

        if (json.success) {
            let newTasks = tasks.filter((task) => {
                return task._id !== taskId
            })
            setTasks(newTasks);
        }

        return json;
    }

    const editTask = async (taskId, title, description, tag, isComplete) => {

        const response = await fetch(`${host}/tasks/update/${taskId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "authtoken": localStorage.getItem('authtoken')
            },
            body: JSON.stringify({ title, description, tag: tag === '' ? 'General' : tag, isComplete })
        });

        const json = await response.json();
        console.log(json);

        if(json.success){
            let updatedTasks = JSON.parse(JSON.stringify(tasks));
            for(let i = 0; i< updatedTasks.length; i++){
                if(updatedTasks[i]._id === taskId){
                    updatedTasks[i].title = title;
                    updatedTasks[i].description = description;
                    updatedTasks[i].tag = tag === '' ? 'General' : tag;
                    updatedTasks[i].isComplete = isComplete;
                    break;
                }
                
            }
            setTasks(updatedTasks);
        }

        return json;
    }

    return (
        <TaskContext.Provider value={{ tasks, getTasks, addTask, deleteTask, editTask }}>
            {props.children}
        </TaskContext.Provider>
    )
}

export default TaskState;
