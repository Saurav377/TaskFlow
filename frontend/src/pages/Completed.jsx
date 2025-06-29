import React, { useEffect, useState } from 'react'
import {deleteTasksAPI, GetCompletedAPI } from '../services/allApi';
import Card from 'react-bootstrap/Card';
import { Slide, toast } from 'react-toastify';
import Button from 'react-bootstrap/esm/Button';
import { FaTrash } from 'react-icons/fa';

function Completed() {
  const [completedData, setCompletedData] = useState([])

  const getCompletedData = async () => {
    const result = await GetCompletedAPI()
    console.log(result);
    if (Array.isArray(result?.data)) {
      setCompletedData(result.data);
    } else {
      console.error("Invalid data format", result);
      setCompletedData([]); // Fallback to empty array
    }
  }
  useEffect(() => {
    getCompletedData()
  }, [])

  const handleDelete = async (id) => {
    try {
      const result = await deleteTasksAPI(id);
      console.log("Delete response:", result);
      if (result.status == 200) {
        toast.error('Deleted!', {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
          
        });
        getCompletedData()
      } else {
        alert("Something went wrong")
      }
    } catch (err) {
      console.log("Error deleting", err);
      alert(err.message || "Something went wrong")
    }
  }

  return (
    <div>
      <div>
        <div className="row" style={{ marginTop: '100px' }}>
          <div className="col-2"></div>
          <div className="col-8 mt-5" style={{ fontSize: '20px' }}>
            <h3 className='text-center'>Completed Tasks</h3>
          </div>
          <div className="col-2"></div>
        </div>
        {/* Cards Grid */}
        <div className="row m-5">
          {completedData.reverse().map((completed, index) => (
            <div className="col-md-3 mb-4" key={index}>
              <Card border="primary" style={{ width: '18rem' }}>
                <Card.Header>{completed?.taskName}</Card.Header>
                <Card.Body>
                  <Card.Text>
                    {completed?.taskDescription}
                  </Card.Text>
                  <div className='d-flex justify-content-around'>
                    <Button variant="outline-danger" onClick={() => handleDelete(completed._id)}>
                      <FaTrash />
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Completed