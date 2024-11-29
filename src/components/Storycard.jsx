import React, { useState } from 'react'
import { Card,Button,Modal } from 'react-bootstrap'
import serverUrl from '../services/serverUrl'
import { useNavigate } from 'react-router-dom'

const Storycard = ({displayData}) => {

    const Navigate = useNavigate()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const token = sessionStorage.getItem("token")

    const handleview = ()=>{
      Navigate(`/story/${displayData._id}`)
    }
  return (
    <>
     <Card className='mb-3 shadow p-2' style={{ width: '20rem' }}>
          <Card.Img src= {`${serverUrl}/uploads/${displayData?.storyImg}`} width={'200px'} height={'200px'} className='pt-3 ' variant="top" />
          <Card.Body>
            <Card.Title className='text-dark fs-3'>{displayData?.title}</Card.Title>
            <h6 className='text-dark'>Category : <span className='text-danger'>{displayData?.category}</span></h6>
            <Card.Text>{displayData?.description}</Card.Text>
            {
              token?
              <Button onClick={handleview} style={{backgroundColor:'black',color:'white'}} variant="primary">Start Reading</Button>
              :
              <Button onClick={handleShow} style={{backgroundColor:'black',color:'white'}} variant="primary">Start Reading</Button>
            }
          </Card.Body>
        </Card>
        <Modal centered size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        <Modal.Title>{displayData?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto",wordWrap: 'break-word',}}>
         <img width={'100%'} height={"50px"} src={`${serverUrl}/uploads/${displayData?.storyImg}`}  alt="" className="img-fluid mb-3" />
         <h3>Author : {displayData?.author}</h3>
         <h3>Published at : {displayData?.date}</h3>
         <h3>{displayData?.description}</h3>
         <h4>Story : {displayData?.paragraph}</h4>
      </Modal.Body>
      <Modal.Footer>
    <Button variant="secondary" onClick={handleClose}>Close</Button>
    </Modal.Footer>
   </Modal>

    </>
  )
}

export default Storycard