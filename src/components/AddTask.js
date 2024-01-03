import React, { useContext, useState } from 'react'
import taskContext from '../context/taskContext'

const AddTask = (props) => {

    const context = useContext(taskContext);
    let { addTask } = context;
    const [task, setTask] = useState({
        title: '', description: '', tag: '', isComplete: false
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        let data = await addTask(task.title, task.description, task.tag, task.isComplete);
        setTask({ title: '', description: '', tag: '', isComplete: false });
        if (data.success) {
            props.alert("success", `${data.message}`);
        }
        else {
            props.alert("error", `${data.error}`);
        }
        // console.log(task);
    }

    const onChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    }

    const toggleChange = () => {
        setTask({ ...task, isComplete: !task.isComplete })
        console.log(task.isComplete);
    }

    return (
        <>
            <h3>Add a new Task</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    <input onChange={onChange} type="text" className="form-control" id="title" name='title' placeholder='Enter Title' value={task.title} required />
                    <label htmlFor="title">Title</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={onChange} type="text" className="form-control" id="description" placeholder='Enter Description' name='description' value={task.description} required />
                    <label htmlFor="description">Description</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" onChange={onChange} className="form-control" id="tag" name='tag' placeholder='Enter Tag' value={task.tag} />
                    <label htmlFor="tag">Tag</label>
                </div>
                <div className="form-check form-switch form-check-reverse">
                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckReverse" onChange={toggleChange} name='isComplete' checked={task.isComplete}/>
                    <label className="form-check-label" htmlFor="flexSwitchCheckReverse">Task already Complete?</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}

export default AddTask
