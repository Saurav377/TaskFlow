import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Header from './components/Header';
import Completed from './pages/Completed';
import Current from './pages/Current';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { GetTaskAPI } from './services/allApi';
import { Slide, toast, ToastContainer } from 'react-toastify';
import Auth from './pages/Auth';
import PrivateRoute from './pages/PrivateRoute';

function App() {
  const [tasksData, setTasksData] = useState([]);
  const location = useLocation();

  const getTasksData = async () => {
    const result = await GetTaskAPI();
    console.log(result);
    if (Array.isArray(result?.data)) {
      setTasksData(result.data);
    } else {
      console.error("Invalid data format", result);
      setTasksData([]); // Fallback to empty array
    }
  };

  useEffect(() => {
    getTasksData();
  }, []);

  return (
    <>
      {!['/login', '/register'].includes(location.pathname) && (
        <Header refresh={getTasksData} />
      )}
      <Routes>
        <Route
          path="/"
          element={
            localStorage.getItem('existingUser') ? <Navigate to="/current" /> : <Navigate to="/login" />
          }
        />
        <Route path="/login" element={<Auth register={false} refresh={getTasksData} />} />
        <Route path="/register" element={<Auth register={true} refresh={getTasksData} />} />
        <Route
          path="/current"
          element={
            <PrivateRoute>
              <Current tasksData={tasksData} refresh={getTasksData} />
            </PrivateRoute>
          }
        />
        <Route
          path="/completed"
          element={
            <PrivateRoute>
              <Completed />
            </PrivateRoute>
          }
        />
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Slide}
        style={{ zIndex: 2000 }}
        limit={3}
      />
    </>
  );
}

export default App;
