import React, { useState,useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { deleteUserAPI, getAllUsersAPI } from '../services/allAPI';

const Users = () => {

  const [allUsers,setAllUsers] = useState([])
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getAllUsers = async ()=>{
    try{
      const result = await getAllUsersAPI()
      if(result.status==200){
        setAllUsers(result.data)
      }
    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    getAllUsers()
  },[])

  const handleDeleteUser = async (id)=>{
    const token = sessionStorage.getItem("token")
    if(token){
      const reqHeader = {
          "Authorization":`Bearer ${token}`
      }
      try{
        const result = await deleteUserAPI(id,reqHeader)
        if(result.status==200){
            getAllUsers()
        }else{
          console.log(result);      
        }
      }catch(err){
        console.log(err);
      }
    }
  }

  return (
    <>
      <button onClick={handleShow} style={{ backgroundColor: "black" }} className="btn fw-bolder mx-3">
        <i className="fa-solid fa-users text-light"> Users</i>
      </button>
      <Modal size="lg" centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>All Users</Modal.Title>
        </Modal.Header>
        <Modal.Body className="shadow m-2" style={{maxHeight: '400px',overflowY: 'auto',}}>
          <div className="my-3">
            {
                allUsers?.length>0?
                allUsers.map(user=>(
                    <div style={{ backgroundColor: 'white' }} className="row d-flex p-3 m-2 shadow rounded align-items-center">
                    <div className="col text-light">
                      <h3 className="mb-0 text-dark">{user.username}</h3>
                      <h3 className="mb-0 text-primary">{user.email}</h3>
                    </div>
                    <div className="col-auto">
                      <button onClick={()=>handleDeleteUser(user?._id)} style={{ backgroundColor: "white" }} className="btn" aria-label="Delete User">
                        <i className="fa-solid fa-trash text-danger"></i>
                      </button>
                    </div>
                  </div>
                ))
                :
            <div></div>
            }
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">
            Save Story
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Users;
