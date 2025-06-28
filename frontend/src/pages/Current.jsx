import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { deleteTasksAPI, GetTaskAPI } from '../services/allApi';
import { useEffect } from 'react';
import { useState } from 'react';
import { Slide, toast } from 'react-toastify';
import EditTask from '../components/EditTask';
import CompleteTask from '../components/CompleteTask';
import { FaTrash } from 'react-icons/fa';

function Current({ tasksData, refresh }) {

    const handleDelete = async (id) => {
        try {
            const result = await deleteTasksAPI(id);
            console.log("Delete response:", result);
            if (result.status == 200) {
                toast.error('Task was Deleted!', {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Slide,
                });
                refresh()
            } else {
                //alert("Something went wrong")
            }
        } catch (err) {
            console.log("Error deleting", err);
            alert(err.message || "Something went wrong")
        }
    }

    return (
        <div>
            <div className="row" style={{ marginTop: '100px' }}>
                <div className="col-2"></div>
                <div className="col-8 mt-5" style={{ fontSize: '20px' }}>
                    <h3 className='text-center'>Current Tasks</h3>
                </div>
                <div className="col-2"></div>
            </div>

            {/* Cards Grid */}
            <div className="row m-5">
                {tasksData.map((tasks, index) => (
                    <div className="col-md-3 mb-4" key={index}>
                        <Card border="primary" style={{ width: '18rem' }}>
                            <Card.Header>{tasks?.taskName}</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    {tasks?.taskDescription}
                                </Card.Text>
                                <div className='d-flex justify-content-around'>
                                    <CompleteTask id={tasks._id} refresh={refresh} />
                                    <EditTask tasks={tasks} refresh={refresh}/>
                                    <Button variant="outline-danger" onClick={() => handleDelete(tasks._id)}><FaTrash /></Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Current