import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserByEmailAPI, loginAPI } from "../services/allAPI";
import GoogleSignIn from "../../firebase/GoogleSignIn";

function Login() {
  const [isHovered,setIsHovered] = useState(false)
  const [userData, setUserData] = useState("")
  const [invalid,setInvalid] = useState(0)

  const Navigate = useNavigate()
  const [loginData, setLoginData] = useState({
    email:"",password:""
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    //API call
    if(loginData.email && loginData.password){
      // alert("login success!");
      // to set value to localstorage
      try{
        const output = await getUserByEmailAPI()
        if(output.status==200){
          setUserData(output.data)
          const DATA = output.data.user.find((user) => user.email == loginData.email)
          console.log(DATA);
          localStorage.setItem("singleUser",JSON.stringify(DATA))
        }
      }catch(err){
        console.log(err);
      }
      //
      try{
        const result = await loginAPI(loginData)
        if(result.status==200){
          sessionStorage.setItem("user",JSON.stringify(result.data.user))
          sessionStorage.setItem("token",result.data.token)
          // 
          
          // 
          setLoginData({email:"",password:""})
          // console.log(result);
          if(result.data.user.role == "admin"){
            Navigate('/dashboard')
          }else{
            Navigate('/')
            window.location.reload();
          }
        }else{
          if(result.response.status==404){
            // alert(result.response.data)
            alert("Invalid Email/Password")
            setInvalid(1)
          }
        }
      }catch(err){
        console.log(err);
      }
    }else{
      alert("please fill the form completely")
    }
  };
  

  return (
    <div style={{ height: "100vh", position: "relative" }}
      className="container d-flex justify-content-center align-items-center flex-column">
      <h3 className="RED" style={{ position: "absolute", top: "25%", left: "40%", transform: "rotate(-45deg) translate(-50%, -50%)", transformOrigin: "left center", fontSize: "8rem", color: "#dc3545", whiteSpace: "nowrap",}}>
        <i className="fa-solid fa-ghost text-danger"></i>
      </h3>
      <h1>Login</h1>
      <p>More than 100+ Stories from around the world</p>
      <div style={{ width: "400px" }} className="shadow border rounded p-5 mt-5">
        <form onSubmit={handleSubmit}>
        <div className="mb-5 text-center">
          <h3>
            <i className="fa-solid fa-ghost text-danger"></i> STORYVERSE
          </h3>
        </div>
        <div className="mb-4">
          <input value={loginData.email} onChange={e=>setLoginData({...loginData,email:e.target.value})} className="form-control" type="text" placeholder="E Mail" />
        </div>
        <div className="mb-3">
          <input value={loginData.password} onChange={e=>setLoginData({...loginData,password:e.target.value})} className="form-control" type="password" placeholder="Password" />
        </div>
        {
          invalid == 1 &&
          <div className="mb-2">
                      <Link to={'/forgotpassword'} color="blue">Forgot Password</Link>
          </div>
        }
        <div className="d-grid">
        <button type="submit" style={{backgroundColor: isHovered ? 'black' : '',color: isHovered ? 'white' : ''}} className='btn  my-1'
            onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>Login</button>
        </div>
        <p className="text-center mt-3">
              Don't have an account?
              <Link to={'/register'}> Create an Account</Link>
            </p>
        </form>
        <div className="text-center align-items-center justify-content-center">
            <div><GoogleSignIn/></div>
            </div>
      </div>
    </div>
  );
}

export default Login;
