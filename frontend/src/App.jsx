import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import Completed from './pages/Completed'
import Current from './pages/Current'
import { Navigate, Route, Routes } from 'react-router-dom'
import { GetTaskAPI } from './services/allApi'
import { Slide, toast, ToastContainer } from 'react-toastify'

function App() {
  const [count, setCount] = useState(0)

  const [tasksData, setTasksData] = useState([])

  const getTasksData = async () => {
    const result = await GetTaskAPI()
    console.log(result);
    if (Array.isArray(result?.data)) {
      setTasksData(result.data);
    } else {
      console.error("Invalid data format", result);
      setTasksData([]); // Fallback to empty array
    }
  }
  useEffect(() => {
    getTasksData()
  }, [])

  return (
    <>
      <Header refresh={getTasksData} />
      <Routes>
        <Route path="/" element={<Navigate to="/current" />} />
        <Route path='/current' element={<Current tasksData={tasksData} refresh={getTasksData} />} />
        <Route path='/completed' element={<Completed />} />
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
  )
}

export default App
