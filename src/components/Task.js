import React, { useContext } from 'react'
import taskContext from '../context/taskContext';

const Task = (props) => {
    const { task, updateTask } = props;
    const context = useContext(taskContext);
    const { deleteTask } = context;

    const handleDelete = async (taskId) => {
        console.log("deleted " + taskId);
        let data = await deleteTask(taskId);
        console.log(data);

        if (data.success) {
            props.alert('success', `${data.message}`);
        }
        else {
            props.alert('error', `${data.error}`);
        }
    }
    return (
        <>
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{task.title}</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">{task.tag}</h6>
                    <p className="card-text">{task.description}</p>
                    <p>{task.isComplete ? `Completed` : `Incomplete`}</p>
                    <div>
                        <i onClick={() => {
                            updateTask(task);
                        }} role='button' className="fa-regular fa-pen-to-square me-4" data-toggle="tooltip" data-placement="top" title="Edit Task"></i>
                        <i onClick={() => {
                            handleDelete(task._id)
                        }} role='button' className="fa-solid fa-trash text-danger" data-toggle="tooltip" data-placement="top" title="Delete Task"></i>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Task
