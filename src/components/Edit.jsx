import { Modal,Button } from 'react-bootstrap'
import React, { useContext, useEffect, useState } from 'react'
import serverUrl from '../services/serverUrl';
import { editStoryAPI } from '../services/allAPI';
import { editResponseContext } from '../contexts/ContextShare'


const Edit = ({story}) => {

  const {editResponse,setEditResponse} = useContext(editResponseContext)
  const [imageFileStatus,setImageFileStatus] = useState(false)
  const [preview , setPreview] = useState("")
  const [storyData,setStoryData] = useState({
    id:story?._id, title: story?.title,author:story?.author,date:story?.date,category:story?.category,description:story?.description,paragraph:story?.paragraph,storyImg:'' 
  })
 console.log(storyData);
 
    const [show, setShow] = useState(false);

    useEffect(()=>{
      if(storyData.storyImg.type=="image/png" || storyData.storyImg.type=="image/jpg" || storyData.storyImg.type=="image/jpeg"){
       setImageFileStatus(true)
       setPreview(URL.createObjectURL(storyData.storyImg))
      }else{
       setImageFileStatus(false)
       setPreview("")
       setStoryData({...storyData,storyImg:""})
      }
   },[storyData.storyImg])


  const handleClose = () =>{
    setShow(false);
    setStoryData({
      id:story?._id, title: story?.title,author:story?.author,date:story?.date,category:story?.category,description:story?.description,paragraph:story?.paragraph,storyImg:''     })
  }

  const handleUpdateStory = async ()=>{
    const {id,title,author,date,category,description,paragraph,storyImg} = storyData
    if(title && author && date && category && description &&  paragraph){
    
      const reqBody = new FormData()
      reqBody.append("title",title)
      reqBody.append("author",author)
      reqBody.append("date",date)
      reqBody.append("category",category)
      reqBody.append("description",description)
      reqBody.append("paragraph",paragraph)
      preview?reqBody.append("storyImg",storyImg):reqBody.append("storyImg",story?.storyImg)

      const token = sessionStorage.getItem("token")
      if(token){
        const reqHeader = {
          "Content-Type":preview?"multipart/form-data:" : "application/json",
          "Authorization":`Bearer ${token}`
        }
        // api call - put request
        try {
          const result = await editStoryAPI(id,reqBody,reqHeader)
          if(result.status==200){
            // alert("story updated successfully!!!")
            handleClose()
            setEditResponse(result)
          }else{
            console.log(result);
            
          }
        } catch (err) {
         console.log(err);
                   
        }
      }else{
        alert("please fill the form completely")
      }
    }
  }
  const handleShow = () => {
    setShow(true)
    setStoryData({
      id:story?._id,
      title:story?.title,
      author:story?.author,
      date:story?.date,
      category:story?.category,
      description:story?.description,
      paragraph:story?.paragraph,
      storyImg:''
    })
  };

  return (
    <>
       <button onClick={handleShow} style={{backgroundColor:"black"}} className="btn me-3"><i className="fa-solid fa-edit text-light"></i></button>
       <Modal size='lg' centered  show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Story</Modal.Title>
          </Modal.Header>
          <Modal.Body className='shadow m-2'>
            <div className="row my-3">
              <div className="col-4">
              <label >
                 <input onChange={e=>setStoryData({...storyData,storyImg:e.target.files[0]})}  style={{display:'none'}} type="file" />
                 <img width={'250px'} height={'250px'} src={preview?preview:`${serverUrl}/uploads/${story?.storyImg}`} alt="" />
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
           <Button variant="primary" onClick={handleUpdateStory}>Save Story</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Edit