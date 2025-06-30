import React from 'react'
import { useState } from 'react'
import { updateTaskAPI } from '../services/allApi'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Slide, toast } from 'react-toastify';
import { FaEdit } from 'react-icons/fa';

function EditTask({ tasks, refresh }) {

    const [taskData, setTaskData] = useState({
        taskName: tasks?.taskName,
        taskDescription: tasks?.taskDescription
    })

    const handleEditTask = async ()=>{
        const {taskName,taskDescription} = taskData
        console.log(taskName,taskDescription)
        if(taskData){
            const body = {taskName,taskDescription}
            const headers = {'Content-Type':'application/json'};

            const result = await updateTaskAPI(tasks._id,body,headers)
            console.log(result);
            refresh();
            toast.warn(result.data.message || "Task was Edited!", {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                theme: 'dark',
                transition: Slide,
            });
        }else{
            alert("Something went wrong")
        }
    }

    const [show,setShow] = useState(false)
    const handleClose = ()=> setShow(false)
    const handleShow = ()=> setShow(true)

    return (
        <div>
            <Button variant="outline-warning" onClick={handleShow}><FaEdit/></Button>
            <Modal show={show} onHide={handleClose} className='text-light'>
                <Modal.Header closeButton>
                    <Modal.Title className='text-light'>Edit Task</Modal.Title>
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
                                value={taskData.taskName}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Task description</Form.Label>
                            <Form.Control as="textarea" rows={3}
                                onChange={(e) => setTaskData({ ...taskData, taskDescription: e.target.value })} 
                                value={taskData.taskDescription}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" onClick={()=>{handleEditTask(); handleClose();}}>
                        Save changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
        
    )
}

export default EditTask