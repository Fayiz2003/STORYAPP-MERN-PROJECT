import React, { useEffect, useState } from 'react'
import Storycard from '../components/Storycard'
import { allStoriesAPI } from '../services/allAPI'

const Stories = () => {

  const [searchKey, setSearchKey] = useState("")
  const [allStories, setAllStories] = useState([])

  //pagination
  const [currentPage,setCurrentPage] = useState(1)
  const storyPerPage = 6
  const totalPages = Math.ceil(allStories.length/storyPerPage)
  const currentPageLastStoryIndex = currentPage * storyPerPage
  const currentPageStartStoryIndex = currentPageLastStoryIndex - storyPerPage
  const visibleStoryCards = allStories?.slice(currentPageStartStoryIndex,currentPageLastStoryIndex)

  //navigate to next page
  const navigateToNextPage = ()=>{
    if(currentPage!=totalPages){
      setCurrentPage(currentPage+1)
    }
  }
  //navigate to previous page
  const navigateToPrevPage = ()=>{
    if(currentPage!=1){
      setCurrentPage(currentPage-1)
    }
  }

  useEffect(() => {
    getAllStories()
  }, [searchKey])

  const getAllStories = async () => {
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
      try {
        const result = await allStoriesAPI(searchKey, reqHeader)
        if (result.status === 200) {
          setAllStories(result.data)
        } else {
          console.log(result.response.data)
        }
      } catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <>
      <div className="container my-5 d-flex justify-content-between align-items-center">
        <h1 id='storyH'>Explore the Stories</h1>
        <input onChange={(e) => setSearchKey(e.target.value)} className='form-control w-25' type="text" placeholder='Search Stories By Category'/>
      </div>
      <div className="container shadow p-5 mb-5">
        <div className="row justify-content-center gap-5">
          {
            allStories?.length > 0 ?
              visibleStoryCards.map(story => (
                <div key={story?._id}
                  className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center">
                  <Storycard displayData={story} />
                </div>
              ))
              :
              <div className="fw-bolder text-danger text-center m-5">Story not found !!!</div>
          }
           {/* {pagination} */}
           <div className="d-flex justify-content-center align-items-center mt-5 mb-5">
            <span onClick={navigateToPrevPage} style={{ cursor: 'pointer' }}><i className="fa-solid fa-backward me-5 text-dark"></i></span>
            <span className="font-bold text-dark"> {currentPage} of {totalPages}</span>
            <span onClick={navigateToNextPage} style={{ cursor: 'pointer' }}><i className="fa-solid fa-forward ms-5 text-dark"></i></span>
           </div>
        </div>
      </div>
    </>
  )
}

export default Stories
