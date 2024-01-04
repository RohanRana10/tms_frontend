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

    //edit a task
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
                    updatedTasks[i].updatedAt = json.task.updatedAt;
                    break;
                }
            }
            setTasks(updatedTasks);
        }

        return json;
    }

    //Date fromatting function
    function formatDate(inputDate) {
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        const day = inputDate.getDate();
        const month = months[inputDate.getMonth()];

        let hours = inputDate.getHours();
        const minutes = inputDate.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';

        // Convert hours to 12-hour format
        hours = hours % 12;
        hours = hours ? hours : 12; // 0 should be 12

        const formattedDate = `${month} ${day}${getOrdinalSuffix(day)}, ${hours}:${padZero(minutes)} ${ampm}`;
        return formattedDate;
    }

    // Helper function to get the ordinal suffix for the day
    function getOrdinalSuffix(day) {
        if (day >= 11 && day <= 13) {
            return "th";
        }
        switch (day % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    }

    // Helper function to pad zero for minutes
    function padZero(value) {
        return value < 10 ? `0${value}` : value;
    }

    return (
        <TaskContext.Provider value={{ tasks, getTasks, addTask, deleteTask, editTask, formatDate }}>
            {props.children}
        </TaskContext.Provider>
    )
}

export default TaskState;
