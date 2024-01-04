import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Task from '../components/Task'
import taskContext from '../context/taskContext';

const Home = (props) => {
  const navigate = useNavigate();
  const context = useContext(taskContext);
  let { tasks, getTasks, editTask } = context;
  let { updateLoader } = props;
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
      updateLoader("start");
      getTasks();
      updateLoader("end");
      document.title = "Home | Task Management System";
    }
    else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, [])

  //function to set task contents
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

  //function to edit a task
  const handleSubmit = async (e) => {
    e.preventDefault();
    updateLoader("start");
    let data = await editTask(task.id, task.title, task.description, task.tag, task.isComplete);
    updateLoader("end");
    if (data.success) {
      props.alert("success", `${data.message}`);
    }
    else {
      props.alert("error", `${data.error}`);
    }
    closeEditModal.current.click();
  }

  //onchange handler for task
  const onChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  }

  //function to toggle task
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
                  <label className="form-check-label" htmlFor="flexSwitchCheckReverse">Mark as complete?</label>
                </div>
                <button type="submit" className="btn btn-primary">Save changes</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className='container'>
        <h1 className='mb-5 text-center text-light d-flex justify-content-center align-items-center'><span style={{ fontSize: "45px" }} id='logo-font'>TMS &nbsp;</span><span> - Your Personal Task Management System</span></h1>
        {tasks.length === 0 ? <p className='text-light text-center'>No tasks found! Start by adding a new Task.</p> :
          <>
            {tasks.map((task) => {
              return <Task key={task._id} updateTask={updateTask} task={task} alert={props.alert} updateLoader={updateLoader} />
            })}
          </>}
      </div>
    </>
  )
}

export default Home
