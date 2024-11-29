import React, { useState,useEffect } from 'react'
import Landing from '../assets/img1.png'
import {Card } from 'react-bootstrap'
import Storycard from '../components/Storycard'
import { Link, useNavigate } from 'react-router-dom'
import { homeStoriesAPI } from '../services/allAPI'

const Home = () => {
    const [isHovered,setIsHovered] = useState(false)
    const [allHomeStories,setAllHomeStories] = useState([])
    const navigate =  useNavigate()

// console.log(allHomeStories);
useEffect(()=>{
  getAllHomeStories()
},[])

  const getAllHomeStories = async ()=>{
    try{
      const result = await homeStoriesAPI()
      if(result.status==200){
        setAllHomeStories(result.data)
      }
    }catch(err){
      console.log(err);
    }
  }

  return (
    <>
   <div style={{height:'100vh'}} className="d-flex jutify-content-center align-items-center rounded shadow w-100">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <h1 id='LOGO'><i className="fa-solid fa-ghost text-danger"></i> STORYVERSE</h1>
            <p style={{textAlign:'justify'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio eveniet, alias inventore corporis beatae nihil aspernatur deleniti praesentium nam possimus, laborum, et quod voluptas odit? Corporis dolore animi mollitia dolorem?</p>
            {
          sessionStorage.getItem("token") ?
          <button onClick={() => {const collectionSection = document.getElementById("collection");
            if (collectionSection) {
              collectionSection.scrollIntoView({ behavior: "smooth" });
            }
            }}style={{backgroundColor: isHovered ? "black" : "",color: isHovered ? "white" : "",}}className="btn my-1"
              onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>START READING</button> 
          :
          <Link to={'/login'} style={{backgroundColor: isHovered ? 'black' : '',color: isHovered ? 'white' : ''}} className='btn  my-1'
          onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>START TO EXPLORE</Link>
           }        
          </div>
          <div className="col-lg-6">
            <img id='LOGOIMG' className='img-fluid ' src={Landing} alt="" />
          </div>
        </div>
      </div>
    </div>
    {/* next */}
    <div className="container mt-5">
    <h2 id='collection' className='text-center'>OUR COLLECTIONS</h2>
    <div className="row gx-4 gx-lg-5 row-cols-2 gap-5 row-cols-md-3 row-cols-xl-4 justify-content-center mt-5">
        {
            allHomeStories?.length > 0 &&
            allHomeStories?.map(story => (
                <div key={story?._id} className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center align-items-center">
                    <div className="w-100">
                        <Storycard displayData={story} />
                    </div>
                </div>
            ))
        }
    </div>
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        {
            sessionStorage.getItem("token") ?
            <Link to={'/stories'} className='flex-right text-danger me-5 fs-3'>SEE MORE</Link>
            :
            <Link to={'/login'} className='flex-right text-danger me-5'>SEE MORE</Link>
        }
    </div>
</div>
    {/*  next*/}
    <div className="container my-5">
    <h2 className='text-center'>OUR USER REVIEWS</h2>
        <div className="row gx-4  gx-lg-5 row-cols-2 gap-5 row-cols-md-3 row-cols-xl-4 justify-content-center mt-5">
        <Card className='shadow' style={{ width: '18rem' }}>
         <Card.Body>
           <Card.Title className='d-flex justify-content-center align-items-center flex-column'>
            <img width={'60px'} height={'60px'}  src="https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-File.png" alt="" />
            <span>Max Miller</span>
           </Card.Title>
           <Card.Text>
           <div className='d-flex justify-content-center align-items-center'>
            <i className='fa-solid fa-star text-warning'></i>
            <i className='fa-solid fa-star text-warning'></i>
            <i className='fa-solid fa-star text-warning'></i>
            <i className='fa-solid fa-star text-warning'></i>
           </div>
             Some quick example text to build on the card title and make up the
             bulk of the card's content.
           </Card.Text>
         </Card.Body>
        </Card>
        <Card className='shadow' style={{ width: '18rem' }}>
         <Card.Body>
           <Card.Title className='d-flex justify-content-center align-items-center flex-column'>
            <img width={'60px'} height={'60px'}  src="https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Photo.png" alt="" />
            <span>Allen Smith</span>
           </Card.Title>
           <Card.Text>
           <div className='d-flex justify-content-center align-items-center'>
            <i className='fa-solid fa-star text-warning'></i>
            <i className='fa-solid fa-star text-warning'></i>
            <i className='fa-solid fa-star text-warning'></i>
            <i className='fa-solid fa-star text-warning'></i>
           </div>
             Some quick example text to build on the card title and make up the
             bulk of the card's content.
           </Card.Text>
         </Card.Body>
        </Card>
        <Card className='shadow' style={{ width: '18rem' }}>
         <Card.Body>
           <Card.Title className='d-flex justify-content-center align-items-center flex-column'>
            <img width={'60px'} height={'60px'}  src="https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Images-HD.png" alt="" />
            <span>Sonia Jacob</span>
           </Card.Title>
           <Card.Text>
           <div className='d-flex justify-content-center align-items-center'>
            <i className='fa-solid fa-star text-warning'></i>
            <i className='fa-solid fa-star text-warning'></i>
            <i className='fa-solid fa-star text-warning'></i>
            <i className='fa-solid fa-star text-warning'></i>
           </div>
             Some quick example text to build on the card title and make up the
             bulk of the card's content.
           </Card.Text>
         </Card.Body>
        </Card>
        </div>
    </div>
    </>
  )
}

export default Home