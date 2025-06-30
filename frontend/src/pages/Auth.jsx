import React, { useState } from 'react'
import taskFlowLogo from '../assets/taskflow.png'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { loginAPI, registerAPI } from '../services/allApi'
import { Slide, toast } from 'react-toastify'

function Auth({ register, refresh }) {

  const navigate = useNavigate()

  const [userDetails, setUserDetails] = useState({
    username: '',
    email: '',
    password: ''
  })

  const handleRegister = async () => {
    const { username, email, password } = userDetails
    if (!username || !email || !password) {
      toast.warn("Please fill data completely", {
        position: "bottom-right",
        autoClose: 3000,
        theme: 'dark',
        transition: Slide,
      });
    } else {
      const result = await registerAPI(userDetails)
      if (result.status === 200) {
        toast.success("Registered Successfully", {
          position: "bottom-right",
          autoClose: 3000,
          theme: 'dark',
          transition: Slide,
        });
        setUserDetails({ username: "", email: '', password: '' })
        navigate('/login')
      } else if (result.status === 406) {
        toast.error(result.response.data, {
          position: "bottom-right",
          autoClose: 3000,
          theme: 'dark',
          transition: Slide,
        });
      } else {
        alert('Something went wrong')
      }
    }
  }

  const handleLogin = async () => {
    const { username, password } = userDetails
    if (!username || !password) {
      toast.warn("Please fill data completely", {
        position: "bottom-right",
        autoClose: 3000,
        theme: 'dark',
        transition: Slide,
      });
    } else {
      const result = await loginAPI({ username, password })
      if (result.status === 200) {
        toast.success(result.data.message || "Login Successful!", {
          position: "bottom-right",
          autoClose: 3000,
          theme: 'dark',
          transition: Slide,
        });

        sessionStorage.setItem('existingUser', JSON.stringify(result.data.existingUser))
        sessionStorage.setItem("token", result.data.token)
        refresh && refresh()

        setUserDetails({ username: "", email: '', password: '' })
        setTimeout(() => {
          navigate('/current')
        }, 500)
      } else if (result.status === 406) {
        alert(result.response.data)
        setUserDetails({ username: '', email: '', password: '' })
      } else {
        alert('Something went wrong')
        setUserDetails({ username: '', email: '', password: '' })
      }
    }
  }

  return (
    <div style={{ marginTop: '100px', overflowX: 'hidden' }}>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg bg-primary fixed-top" data-bs-theme="dark">
        <div className="container-fluid px-5">
          <NavLink className="navbar-brand m-20 fw-bold" style={{ fontSize: '50px' }} to="/current">
            TaskFlow
          </NavLink>
        </div>
      </nav>

      {/* Content Area */}
      <div className="container-fluid px-3">
        <div className="row min-vh-100">
          {/* Logo for Desktop only */}
          <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center">
            <img src={taskFlowLogo} style={{ width: "400px" }} alt="TaskFlow Logo" />
          </div>

          {/* Auth Form */}
          <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
            <div className="w-100" style={{ maxWidth: '400px' }}>
              <h1 className='m-3 text-center'>{register ? 'Register' : 'Login'}</h1>

              <input type="text" className='form-control m-3' placeholder='Username'
                onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}
                value={userDetails.username} />

              {register &&
                <input type="text" className='form-control m-3' placeholder='Email'
                  onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                  value={userDetails.email} />}

              <input type="password" className='form-control m-3' placeholder='Password'
                onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
                value={userDetails.password} />

              {!register ? (
                <>
                  <button className='btn btn-light m-3' style={{ color: 'black' }} onClick={handleLogin}>Login</button>
                  <p className='m-3'>New user? <Link to="/register">Register</Link></p>
                </>
              ) : (
                <>
                  <button className='btn btn-light m-3' style={{ color: 'black' }} onClick={handleRegister}>Register</button>
                  <p className='m-3'>Already have an account? <Link to="/login">Login</Link></p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth
