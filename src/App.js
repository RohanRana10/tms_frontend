import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import TaskState from './context/TaskState';
import Navbar from './components/Navbar';
import Error from './components/Error';
import LoadingBar from 'react-top-loading-bar';
import { useRef } from 'react';

function App() {

  const loaderRef = useRef(null);

  const updateLoader = (status) => {
    if(status === 'start'){
      loaderRef.current.continuousStart(2);
    }
    else{
      loaderRef.current.complete();
    }
  }

  const alert = (type, message) => {
    if (type === "success") {
      toast.success(message, {
        style: {
          border: '1px solid #FFFFFF',
          padding: '14px',
          color: '#FFFFFF',
          backgroundColor: '#061621'
        },
      });
    }
    else {
      toast.error(message, {
        style: {
          border: '1px solid #FFFFFF',
          padding: '14px',
          color: '#FFFFFF',
          backgroundColor: '#061621'
        }
      });
    }

  }
  return (
    <>
      <TaskState>
        <BrowserRouter>
          <Navbar alert={alert} updateLoader={updateLoader}/>
          <LoadingBar
            color='#f11946'
            ref={loaderRef}
          />
          <Routes>
            <Route exact path="/" element={<Home alert={alert} updateLoader={updateLoader}/>} />
            <Route exact path="/signup" element={<Signup alert={alert} updateLoader={updateLoader}/>} />
            <Route exact path="/login" element={<Login alert={alert} updateLoader={updateLoader}/>} />
            <Route path="*" element={<Error />} />
          </Routes>
        </BrowserRouter>
      </TaskState>
      <Toaster position="top-center" reverseOrder={false} />
    </>

  );
}

export default App;
