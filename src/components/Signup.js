import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Signup = (props) => {
    const navigate = useNavigate();
    const { alert, updateLoader } = props;

    useEffect(() => {
        if (localStorage.getItem('authtoken') !== null) {
            navigate("/");
        }
        document.title = "Sign up | Task Management System";
        // eslint-disable-next-line
    }, []);

    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: ""
    })

    //onchange handler for user credentials
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    //function to sign up user
    const handleSubmit = async (e) => {
        e.preventDefault();
        updateLoader("start");
        const host = process.env.REACT_APP_BASE_URL;

        let { name, email, password } = credentials;
        const response = await fetch(`${host}/users/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json();
        console.log(json);
        updateLoader("end");
        if (json.success) {
            localStorage.setItem('authtoken', json.authtoken);
            navigate("/");
            alert("success", `${json.message}`);
        }
        else {
            alert("error", `${json.error}`);
        }
    }

    return (
        <div className='container'>
            <h1 className='my-5 text-light'>Signup to <span style={{ fontSize: '40px' }} id='logo-font'>TMS</span></h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="text-light form-label">Full Name:</label>
                    <input type="text" style={{ backgroundColor: '#061621', color: 'white' }} className="form-control" onChange={onChange} id="name" name='name' required />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label text-light">Email Address:</label>
                    <input type="email" style={{ backgroundColor: '#061621', color: 'white' }} className="form-control" onChange={onChange} id="exampleInputEmail1" name='email' aria-describedby="emailHelp" required />
                    <div id="emailHelp" style={{ color: '#a3a3a3' }} className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label text-light">Password:</label>
                    <input type="password" style={{ backgroundColor: '#061621', color: 'white' }} name='password' className="form-control" id="exampleInputPassword1" onChange={onChange} required minLength={5} />
                </div>
                <button type="submit" className="btn btn-outline-primary mt-2">Signup</button>
            </form>
        </div>
    )
}

export default Signup
