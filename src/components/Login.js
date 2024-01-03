import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const navigate = useNavigate();
    const { alert } = props;
    useEffect(() => {
        if (localStorage.getItem('authtoken') !== null) {
            navigate("/");
        }

        document.title = "Login | Task Management System";
        // eslint-disable-next-line
    }, []);

    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    })



    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const host = process.env.REACT_APP_BASE_URL;

        let { email, password } = credentials;
        const response = await fetch(`${host}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password })
        });

        const json = await response.json();
        console.log(json);

        if (json.success) {
            localStorage.setItem('authtoken', json.authtoken);
            navigate("/");
            alert("success",`${json.message}`)
        }
        else{
            alert("error",`${json.error}`);
        }

    }

    return (
        <div className='container'>
            <h1 className='my-5'>Login to TMS</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" onChange={onChange} id="exampleInputEmail1" name='email' aria-describedby="emailHelp" required />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" name='password' className="form-control" id="exampleInputPassword1" onChange={onChange} required minLength={5} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
