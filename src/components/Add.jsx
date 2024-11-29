import { Modal,Button } from 'react-bootstrap'
import React, { useContext, useEffect, useState } from 'react'
import storyPic from '../assets/img3.jpg'
import { addStoryAPI } from '../services/allAPI'
import { addResponseContext } from '../contexts/ContextShare';

const Add = () => {

  const {addResponse,setAddResponse}  =  useContext(addResponseContext)
  const [imageFileStatus,setImageFileStatus] = useState(false)
  const [preview , setPreview] = useState(storyPic)
  const [storyData,setStoryData] = useState({
    title:'',author:'',date:'',category:'',description:'',paragraph:'',storyImg:'' 
  })
  console.log(storyData);
  
  const [show, setShow] = useState(false);


  useEffect(()=>{
     if(storyData.storyImg.type=="image/png" || storyData.storyImg.type=="image/jpg" || storyData.storyImg.type=="image/jpeg"){
      setImageFileStatus(true)
      setPreview(URL.createObjectURL(storyData.storyImg))
     }else{
      setImageFileStatus(false)
      setPreview(storyPic)
      setStoryData({...storyData,storyImg:""})
     }
  },[storyData.storyImg])
  const handleClose = () => {
    setShow(false);
    setStoryData({  title:'',author:'',date:'',category:'',description:'',paragraph:'',storyImg:'' })
  }

  const handleShow = () => setShow(true);

  const handleSaveStory = async ()=>{
    const {title,author,date,category,description,paragraph,storyImg} = storyData
    if(title && author && date && category && description && paragraph && storyImg){
      
      // reqBody must be in form data since data contains files
      const reqBody = new FormData()
      reqBody.append("title",title)
      reqBody.append("author",author)
      reqBody.append("date",date)
      reqBody.append("category",category)
      reqBody.append("description",description)
      reqBody.append("paragraph",paragraph)
      reqBody.append("storyImg",storyImg)

      const token = sessionStorage.getItem("token")
      if(token){
        const reqHeader = {
          "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token}`
        }
        // api call - post request
        try{
          const result = await addStoryAPI(reqBody,reqHeader)
          console.log(result);
          if(result.status==200){
           handleClose()
          //  alert("Story Added Successfully!!!")
          // share result using context
          setAddResponse(result)
          }else{
            alert(result.response.data)
          } 
        }catch(err){
          console.log(err);
        }
      }
    }else{
      alert ("please fitt the form completely...")
    }
  }

  return (
    <>
      <button onClick={handleShow} style={{backgroundColor:'black'}} className='btn btn-lg ms-3 text-light my-1 py-2'>Add STORY <i className="fa-solid fa-plus"></i></button>
      <Modal size='lg' centered  show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Story</Modal.Title>
          </Modal.Header>
          <Modal.Body className='shadow m-2'>
            <div className="row my-3">
              <div className="col-4">
               <label >
                 <input onChange={e=>setStoryData({...storyData,storyImg:e.target.files[0]})}  style={{display:'none'}} type="file" />
                 <img width={'250px'} height={'250px'} src={preview} alt="" />
                 { !imageFileStatus &&
                   <p className='text-dark'>*Upload Only the following file types <span className='text-danger'>(jpeg, jpg, png)</span> here!!! </p>
                 }
               </label>
              </div>
              <div className="col-8">
                <input value={storyData.title}  onChange={e=>setStoryData({...storyData,title:e.target.value})} className='form-control mb-3' type="text" placeholder='Story Title' />
                <input value={storyData.author}  onChange={e=>setStoryData({...storyData,author:e.target.value})} className='form-control mb-3' type="text" placeholder='Author Name' />
                <div className='row'>
                  <div className="col-6">
                  <input value={storyData.date}  onChange={e=>setStoryData({...storyData,date:e.target.value})} className='form-control mb-3' type="date" placeholder='Published At' />
                  </div>
                  <div className="col-6">
                  <input value={storyData.category}  onChange={e=>setStoryData({...storyData,category:e.target.value})} className='form-control mb-3' type="text" placeholder='Category' />
                  </div>
                </div>
                <input value={storyData.description}  onChange={e=>setStoryData({...storyData,description:e.target.value})} className='form-control mb-3' type="text" placeholder='Description' />
                <textarea value={storyData.paragraph}  onChange={e=>setStoryData({...storyData,paragraph:e.target.value})} className='form-control' type="text" placeholder='Paragraph' />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
           <Button variant="secondary" onClick={handleClose}>Close</Button>
           <Button variant="primary" onClick={handleSaveStory}>Save Story</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Add