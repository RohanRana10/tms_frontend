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

function App() {

  const alert = (type, message) => {
    if (type === "success") {
      toast.success(message, {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        }
      });
    }
    else {
      toast.error(message, {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        }
      });
    }

  }
  return (
    <>
      <TaskState>
        <BrowserRouter>
          <Navbar alert={alert} />
          <Routes>
            <Route exact path="/" element={<Home alert={alert} />} />
            <Route exact path="/signup" element={<Signup alert={alert} />} />
            <Route exact path="/login" element={<Login alert={alert} />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </BrowserRouter>
      </TaskState>
      <Toaster position="bottom-right" reverseOrder={false} />
    </>

  );
}

export default App;
