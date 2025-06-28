import React from 'react'
import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import AddTaskButton from './AddTaskButton'

function Header({refresh}) {
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-primary fixed-top" data-bs-theme="dark">
                <div className="container-fluid px-5">
                    <NavLink className="navbar-brand m-20 fw-bold" style={{ fontSize: '50px' }} to="/current">
                        TaskFlow
                    </NavLink>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarColor01"
                        aria-controls="navbarColor01"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarColor01">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <NavLink
                                    to="/current"
                                    className={({ isActive }) =>
                                        `nav-link ${isActive ? 'active' : ''}`
                                    }
                                    style={{ fontSize: '25px' }}
                                >
                                    Current
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    to="/completed"
                                    className={({ isActive }) =>
                                        `nav-link ${isActive ? 'active' : ''}`
                                    }
                                    style={{ fontSize: '25px' }}
                                >
                                    Completed
                                </NavLink>
                            </li>
                        </ul>
                        <AddTaskButton refreshPage={refresh}/>
                    </div>
                </div>
            </nav>
            
        </div>
    )
}

export default Header