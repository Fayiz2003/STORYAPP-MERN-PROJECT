import React, { useContext, useEffect, useState } from "react";
import Edit from "../components/Edit";
import Add from "../components/Add";
import { adminStoryAPI, deleteStoryAPI } from "../services/allAPI";
import { addResponseContext, editResponseContext } from '../contexts/ContextShare';
import Users from "../components/Users";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const Navigate = useNavigate()
  const {editResponse,setEditResponse} = useContext(editResponseContext)
  const {addResponse,setAddResponse} = useContext(addResponseContext)
  const [adminStory,setAdminStory] = useState([])
  useEffect(()=>{
  getAdminStories()
  },[addResponse,editResponse])
  console.log(adminStory);
  
  const getAdminStories = async()=>{
    const token = sessionStorage.getItem("token")
    if(token){
      const reqHeader = {
        "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token}`
      }
      // api call
      try {
         const result = await adminStoryAPI(reqHeader)
        console.log(result);
        if(result.status==200){
          setAdminStory(result.data) 

        }else{
          console.log(result);
        }
      } catch (err) {
        console.log(err);
        
      }
    }
  }

  const handleDeleteStory = async (sid)=>{
    const token = sessionStorage.getItem("token")
    if(token){
      const reqHeader = {
        "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token}`
      }
      try{
        const result = await deleteStoryAPI(sid,reqHeader)
        if(result.status==200){
          getAdminStories()
        }else{
          console.log(result);      
        }
      }catch(err){
        console.log(err);
      }
    }
  }
  const logout = ()=>{
     sessionStorage.clear();
     localStorage.clear();
     Navigate('/');
  }

  return (
    <>
    <div className="container my-5">
        <h1>ADMIN PANNEL</h1>
        <Add/>
        <Users/>
        <button onClick={logout} style={{backgroundColor:'black'}} className='btn btn-lg ms-3 text-light my-1 py-2'>LOGOUT <i className="fa-solid fa-right-from-bracket"></i></button>    </div>
    <div className="container shadow pb-3">
        <h1 className="p-5">All Stories</h1>
        <div>
          {
            adminStory?.length>0?
            adminStory?.map(story=>(
          <div key={story?._id} style={{backgroundColor:'black'}} className="row d-flex p-3 m-4 shadow rounded align-items-center">
          <h3 className="col text-light">{story?.title}</h3>
          <div className="col-auto ms-auto">
              <Edit story={story} />
              <button onClick={()=>handleDeleteStory(story?._id)} style={{backgroundColor:"black"}} className="btn me-5"><i className="fa-solid fa-trash text-danger"></i></button>
          </div>
        </div>
            ))
            :
            <div></div>
          }
        
        </div>
    </div>
    </>
  )
}

export default Dashboard