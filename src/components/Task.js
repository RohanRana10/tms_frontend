import React, { useContext } from 'react'
import taskContext from '../context/taskContext';

const Task = (props) => {
    const { task, updateTask, updateLoader } = props;
    const context = useContext(taskContext);
    const { deleteTask, formatDate } = context;

    //function to delete a task
    const handleDelete = async (taskId) => {
        updateLoader("start");
        let data = await deleteTask(taskId);
        console.log(data);
        if (data.success) {
            props.alert('success', `${data.message}`);
            updateLoader("end");
        }
        else {
            props.alert('error', `${data.error}`);
            updateLoader("end");
        }
    }

    return (
        <>
            <div className="card my-3 rounded-4">
                <div className="card-body" style={{ position: 'relative' }}>
                    <h5 className="card-title text-light">{task.title}</h5>
                    <div style={{ color: 'white', display: 'flex', alignItems: 'center', position: 'absolute', right: '20px', top: '20px' }}><i style={{ fontSize: '18px' }} className="fa-solid text-primary fa-calendar-days me-2"></i>{formatDate(new Date(task.updatedAt))}</div>
                    <h6 className="card-subtitle mb-2 ">{task.tag}</h6>
                    <p className="card-text text-light">{task.description}</p>
                    {task.isComplete ? <div className="bg-success text-light rounded-3 d-flex justify-content-center align-items-center" style={{ width: '150px', padding: '10px' }}>
                        COMPLETED <i style={{ fontSize: '20px' }} className="fa-regular fa-square-check ms-3"></i>
                    </div> : <div className="bg-warning rounded-3 d-flex justify-content-center align-items-center" style={{ width: '150px', padding: '10px' }}>
                        INCOMPLETE <i style={{ fontSize: '20px' }} className="fa-solid fa-square-xmark ms-3"></i>
                    </div>}
                    <div style={{ position: 'absolute', right: '20px', bottom: '25px', fontSize: '18px' }}>
                        <i onClick={() => {
                            updateTask(task);
                        }} role='button' className="fa-regular fa-pen-to-square me-4 text-light" data-toggle="tooltip" data-placement="top" title="Edit Task"></i>
                        <i onClick={() => {
                            handleDelete(task._id)
                        }} role='button' className="fa-solid fa-trash text-danger ps-2" data-toggle="tooltip" data-placement="top" title="Delete Task"></i>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Task
