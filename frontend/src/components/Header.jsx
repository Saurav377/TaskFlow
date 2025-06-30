import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AddTaskButton from './AddTaskButton';
import { Slide, toast } from 'react-toastify';
import { FaPowerOff } from 'react-icons/fa';

function Header({ refresh }) {
    const navigate = useNavigate();
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    // Actual logout logic
    const handleLogout = () => {
        localStorage.removeItem("existingUser");
        localStorage.removeItem("token");

        toast.success("Logout Successful!", {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            theme: 'dark',
            transition: Slide,
        });

        setShowLogoutModal(false); // Close modal
        setTimeout(() => {
            navigate("/");
        }, 500);
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg fixed-top" data-bs-theme="dark" style={{ backgroundColor: '#0b4353' }}>
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
                                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                                    style={{ fontSize: '25px' }}
                                >
                                    Current
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    to="/completed"
                                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                                    style={{ fontSize: '25px' }}
                                >
                                    Completed
                                </NavLink>
                            </li>
                        </ul>
                        <AddTaskButton refreshPage={refresh} />
                        <Button variant="danger" className="m-3" size="lg" onClick={() => setShowLogoutModal(true)}>
                            <FaPowerOff />
                        </Button>
                    </div>
                </div>
            </nav>

            {/* Logout Confirmation Modal */}
            <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)} centered>
                <Modal.Header closeButton >
                    <Modal.Title  className='text-light'>Confirm Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body  className='text-light'>
                    Do you want to logout?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleLogout}>
                        Yes, Logout
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Header;
