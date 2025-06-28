import Button from 'react-bootstrap/Button';
import React from 'react'
import { completeTaskAPI, GetCompletedAPI } from '../services/allApi'
import { Slide, toast } from 'react-toastify';
import { FaCheck } from 'react-icons/fa';

function CompleteTask({ id, refresh }) {
    
    const handleComplete = async () => {
        try {
            const result = await completeTaskAPI(id, { "Content-Type": "application/json" });
            console.log(result);
            if (result.status === 200) {
                toast.success(result.data.message || "Task was Completed!", {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                theme: 'dark',
                transition: Slide,
            });
                refresh();
            }
        } catch (err) {
            console.log("Error completing task:", err);
            alert("Something went wrong");
        }
    };

    return (
        <div>
            <Button variant="outline-success" onClick={handleComplete}><FaCheck /></Button>
        </div>
    );
}


export default CompleteTask