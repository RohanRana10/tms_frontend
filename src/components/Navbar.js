import React, { useContext, useRef, useState } from 'react'
import taskContext from '../context/taskContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = (props) => {

    const context = useContext(taskContext);
    let { addTask } = context;
    const [task, setTask] = useState({
        title: '', description: '', tag: '', isComplete: false
    })
    const navigate = useNavigate();
    const modalClose = useRef();
    let location = useLocation();

    //function to add a new task
    const handleSubmit = async (e) => {
        e.preventDefault();
        props.updateLoader("start");
        let data = await addTask(task.title, task.description, task.tag, task.isComplete);
        setTask({ title: '', description: '', tag: '', isComplete: false });
        modalClose.current.click();
        props.updateLoader("end");
        if (data.success) {
            props.alert("success", `${data.message}`);
        }
        else {
            props.alert("error", `${data.error}`);
        }
    }

    //onchange handler for task
    const onChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    }

    //function to toggle task
    const toggleChange = () => {
        setTask({ ...task, isComplete: !task.isComplete })
        console.log(task.isComplete);
    }

    const clearModal = () => {
        setTask({ title: '', description: '', tag: '', isComplete: false });
    }

    //function to logout the user
    const handleLogout = () => {
        localStorage.removeItem('authtoken');
        navigate('/login');
        props.alert("success", "Log out successful!");
    }

    return (
        <div>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">New Task</h1>
                            <button type="button" ref={modalClose} className="btn-close" onClick={clearModal} data-bs-dismiss="modal" aria-label="Close"></button>
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
                                    <label className="form-check-label" htmlFor="flexSwitchCheckReverse">Task already complete?</label>
                                </div>
                                <button type="submit" className="btn btn-primary">Create Task</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <Link style={{ color: 'white' }} id='logo-font' className="navbar-brand" to="/">TMS</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        </ul>
                        <div>
                            {localStorage.getItem('authtoken') ?
                                <>
                                    {location.pathname === '/' && (<button type="button" className="btn btn-outline-success me-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                        <i className="fa-solid fa-plus me-2"></i>New Task</button>)}
                                    <button type="button" onClick={handleLogout} className="btn btn-outline-primary mx-2 me-lg-3"><i className="fa-solid fa-arrow-right-from-bracket me-2"></i>Logout</button>
                                </> :
                                <>
                                    <Link className="btn btn-outline-success me-2" to='/login' role='button'><i className="fa-solid fa-arrow-right-from-bracket me-2"></i>Login
                                    </Link>
                                    <Link className="btn btn-outline-warning mx-2" to='/signup' role='button'><i className="fa-solid fa-user-plus me-2"></i>Signup
                                    </Link>
                                </>}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
