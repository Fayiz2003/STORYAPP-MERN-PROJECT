import React, { useContext, useEffect, useState } from 'react'
import serverUrl from '../services/serverUrl'
import { editUserAPI } from '../services/allAPI'
import profileimg from '../assets/profile.png'
import { profileResponseContext } from '../contexts/ContextShare'

const Profile = () => {

    const {profileResponse,setProfileResponse} = useContext(profileResponseContext)

    const [isHovered,setIsHovered] = useState(false)
    const [preview,setPreview] = useState("")
    const [existingUserImg,setExistingUserImg] = useState("")
    const [userData,setUserData] = useState({
      username:'',email:'',password:'',nickName:'',phoneNum:'',profilePic:''
    })
  
    const [open, setOpen] = useState(false);

    useEffect(()=>{
      if(sessionStorage.getItem("user")){
     const existingUserDetails = JSON.parse(sessionStorage.getItem("user"))
     setUserData({...userData,username:existingUserDetails.username,email:existingUserDetails.email,password:existingUserDetails.password,nickName:existingUserDetails.nickName,phoneNum:existingUserDetails.phoneNum})
     setExistingUserImg(existingUserDetails.profilePic)
      }
    },[open])
  
    useEffect(() => {
      if (userData.profilePic) {
          const imageUrl = URL.createObjectURL(userData.profilePic);
          setPreview(imageUrl);
          setProfileResponse(imageUrl); // Set context state
      } else {
          setPreview("");
          setProfileResponse(""); // Set context state
      }
  }, [userData.profilePic]);
  
    const handleUpdateProfile = async ()=>{
      const {username,email,password,nickName,phoneNum,profilePic} = userData
      if(nickName && phoneNum){
        const reqBody = new FormData()
        reqBody.append("username",username)
        reqBody.append("email",email)
        reqBody.append("password",password)
        reqBody.append("nickName",nickName)
        reqBody.append("phoneNum",phoneNum)
        preview ? reqBody.append("profilePic",profilePic) : reqBody.append("profilePic",existingUserImg)
        const token = sessionStorage.getItem("token")
        if(token){
          const reqHeader = {
            "Content-Type":preview?"multipart/form-data:" : "application/json",
            "Authorization":`Bearer ${token}`
          }
          //api call
          try{
            const result = await editUserAPI(reqBody,reqHeader)
            if(result.status==200){
              sessionStorage.setItem("user",JSON.stringify(result.data))
              alert("Profile photo Updated successfully")
              setProfileResponse(result.data)
            }else{
              console.log(result);
            }
          }catch(err){
            console.log(err); 
          }
        }
      }else{
        alert("Please fill the form completely!!!")
      }
    }  

  return (
    <>
    <div className="container">
      <div style={{ height: "100vh" }} className="row align-items-center">
        <div className="col-lg-2"></div>
        <div className="col-lg-4">
        <h3 className='RED' style={{ position: "absolute", top: "15%", left: "28%", transform: "rotate(-45deg) translate(-50%, -50%)", transformOrigin: "left center", fontSize: "8rem", color: "#dc3545", whiteSpace: "nowrap",}}>
        <i className="fa-solid fa-ghost text-danger"></i>
      </h3>
          <div className="shadow border rounded p-5 mt-5">
            <div className="mb-5 text-center">
              <h3>
              <i className="fa-solid fa-ghost text-danger"></i> STORYVERSE
              </h3>
            </div>
            <div className="mb-4 text-center">
            <label >
                 <input onChange={e=>setUserData({...userData,profilePic:e.target.files[0]})} style={{display:'none'}} type="file" />
                 {
                  existingUserImg==""?
                  <img width={'180px'} src={preview?preview:profileimg} alt="" />
                  :
                  <img width={'180px'} src={preview?preview:`${serverUrl}/uploads/${existingUserImg}`} alt="" />
                 }
                 <p className='text-dark'>*Upload Only the following file types <span className='text-danger'>(jpeg, jpg, png)</span> here!!! </p>
               </label>
            </div>
            <div className="mb-3">
              <input value={userData.nickName} onChange={e=>setUserData({...userData,nickName:e.target.value})} className="form-control" type="text" placeholder="Update Name" />
            </div>
            <div className="mb-4">
              <input value={userData.phoneNum} onChange={e=>setUserData({...userData,phoneNum:e.target.value})} className="form-control" type="text" placeholder="Phone Number" />
            </div>
            <div className="d-grid">
            <button  onClick={handleUpdateProfile} style={{backgroundColor: isHovered ? 'black' : '',color: isHovered ? 'white' : ''}} className='btn  my-1'
            onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>Update Profile</button>
            </div>
          </div>
        </div>
        <div className="col-lg-1"></div>
        <div className="col-lg-4 RED">
          <h1>Set Your Profile</h1>
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
    </>
  )
}

export default Profile