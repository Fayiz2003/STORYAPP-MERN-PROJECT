import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerAPI } from "../services/allAPI";

function Register() {
  const [isHovered,setIsHovered] = useState(false)

  const Navigate = useNavigate()
  const [userData, setUserData] = useState({
    username:"",email:"",password:""
  });
  console.log(userData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //API call
    if(userData.username && userData.email && userData.password){
      console.log(userData);
    try{
      const result = await registerAPI(userData)
      // console.log(result);
      if(result.status==200){
        alert(`welcome ${result?.data?.username}...please login!!`)
        setUserData({username:"",email:"",password:""})
        Navigate('/login')
      }else{
        if(result.response.status==406){
          alert(result.response.data)
          setUserData({username:"",email:"",password:""})
        }
      }
    }catch(err){
      console.log(err);
    } 
    }else{
      alert("Please fill the Form completely!");
    }
  };

  return (
    <div className="container">
      <div style={{ height: "100vh" }} className="row align-items-center">
        <div className="col-lg-2"></div>
        <div className="col-lg-4">
        <h3 className="RED" style={{ position: "absolute", top: "15%", left: "27%", transform: "rotate(-45deg) translate(-50%, -50%)", transformOrigin: "left center", fontSize: "8rem", color: "#dc3545", whiteSpace: "nowrap",}}>
        <i className="fa-solid fa-ghost text-danger"></i>
      </h3>
      <form onSubmit={handleSubmit}>
          <div className="shadow border rounded p-5 mt-5">
            <div className="mb-5 text-center">
              <h3>
              <i className="fa-solid fa-ghost text-danger"></i> STORYVERSE
              </h3>
            </div>
            <div className="mb-4">
              <input value={userData.username} onChange={e=>setUserData({...userData,username:e.target.value})} className="form-control" type="text" placeholder="Username" />
            </div>
            <div className="mb-4">
              <input value={userData.email} onChange={e=>setUserData({...userData,email:e.target.value})} className="form-control" type="text" placeholder="E Mail" />
            </div>
            <div className="mb-5">
              <input value={userData.password} onChange={e=>setUserData({...userData,password:e.target.value})} className="form-control" type="password" placeholder="Password" />
            </div>
            <div className="d-grid">
            <button type="submit" style={{backgroundColor: isHovered ? 'black' : '',color: isHovered ? 'white' : ''}} className='btn  my-1'
            onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>Register</button>
            </div>
            <p className="text-center mt-3">
              Already have an account?
              <Link to={'/login'}> Login here</Link>
            </p>
          </div>
      </form>
        </div>
        <div className="col-lg-1"></div>
        <div className="col-lg-4">
          <h1 className="RED my-2">Create New Account</h1>
          <h5>What you will get?</h5>
          <ul className="mt-5">
            <li>Discover Unique Stories</li>
            <li>Easy Access to New Chapters</li>
            <li>Save Your Favorite Stories</li>
            <li>Download Stories for Offline Reading</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Register;
