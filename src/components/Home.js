import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Task from '../components/Task'
import taskContext from '../context/taskContext';

const Home = (props) => {
  const navigate = useNavigate();
  const context = useContext(taskContext);
  let { tasks, getTasks, editTask } = context;
  const editModal = useRef();
  const closeEditModal = useRef();

  const [task, setTask] = useState({
    id: '',
    title: '',
    description: '',
    tag: '',
    isComplete: false
  })

  useEffect(() => {
    if (localStorage.getItem('authtoken')) {
      getTasks();
      document.title = "Home | Task Management System";
    }
    else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, [])

  const updateTask = (task) => {
    editModal.current.click();
    console.log(`editing ${task._id}`);
    setTask({
      id: task._id,
      title: task.title,
      description: task.description,
      tag: task.tag,
      isComplete: task.isComplete
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = await editTask(task.id, task.title, task.description, task.tag, task.isComplete);
    console.log(task);
    if(data.success){
      props.alert("success", `${data.message}`);
    }
    else{
      props.alert("error", `${data.error}`);
    }
    closeEditModal.current.click();
  }

  const onChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  }

  const toggleChange = () => {
    setTask({ ...task, isComplete: !task.isComplete });
  }

  return (
    <>
      <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#editModal" ref={editModal}>
        Launch modal
      </button>

      <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="editModalLabel">Edit Task</h1>
              <button type="button" ref={closeEditModal} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
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
                <div className="form-check my-3 form-switch form-check-reverse">
                  <input className="form-check-input" type="checkbox" id="flexSwitchCheckReverse" onChange={toggleChange} name='isComplete' checked={task.isComplete} />
                  <label className="form-check-label" htmlFor="flexSwitchCheckReverse">Task already Complete?</label>
                </div>
                <button type="submit" className="btn btn-primary">Save changes</button>
              </form>
            </div>
            {/* <div className="modal-footer">
              <button type="button" onClick={handleSubmit} className="btn btn-primary">Save changes</button>
            </div> */}
          </div>
        </div>
      </div>
      <div className='container'>
        <h1 className='my-5 text-center'>TMS - Your Personal Task Management System</h1>
        {tasks.length === 0 ? <p>No tasks to display!</p> :
          <>
            {tasks.map((task) => {
              return <Task key={task._id} updateTask={updateTask} task={task} alert={props.alert} />
            })}
          </>}
      </div>
    </>
  )
}

export default Home