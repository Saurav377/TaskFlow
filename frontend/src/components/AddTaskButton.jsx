import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { AddTaskAPI } from '../services/allApi';
import { Bounce, Slide, ToastContainer, toast } from 'react-toastify';

function AddTask({ refreshPage }) {

    const [taskData, setTaskData] = useState({
        taskName: "",
        taskDescription: ""
    })

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        setTaskData({
            taskName: "",
            taskDescription: ""
        });
    };

    const handleShow = () => setShow(true);

    const handleAddTask = async (e) => {
        const notify = () => {
            toast.warn('Please enter a Task name', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
                transition: Slide,
            });
        };
        const { taskName, taskDescription } = taskData
        // Check if task name is empty
        if (!taskName.trim()) {
            notify();
            return;
        }
        console.log(taskName, taskDescription);
        e.preventDefault();

        const body = { taskName, taskDescription };
        const headers = { "Content-Type": "application/json" }

        try {
            const result = await AddTaskAPI(body, headers);
            toast.success(result.data.message || "Task was Added!", {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                theme: 'dark',
                transition: Slide,
            });
            refreshPage()
        } catch (err) {
            console.log("Error: ", err);
            alert("Something went wrong");
        }

    }
    return (
        <div>

            <Button variant="success" className='m-3' size="lg" onClick={handleShow}>
                +Add Task
            </Button>
            <Modal show={show} onHide={handleClose} className='text-light'>
                <Modal.Header closeButton>
                    <Modal.Title className='text-light'>Add new Task</Modal.Title>
                </Modal.Header>
                <Modal.Body className='text-light'>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Task Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Do Homework / Workout / Read"
                                autoFocus
                                onChange={(e) => setTaskData({ ...taskData, taskName: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Task description</Form.Label>
                            <Form.Control as="textarea" rows={3}
                                onChange={(e) => setTaskData({ ...taskData, taskDescription: e.target.value })} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" onClick={handleAddTask}>
                        Add Task
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AddTask