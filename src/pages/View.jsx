import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { addToFavouriteAPI, viewStoryAPI } from '../services/allAPI'; // Import the API function

const View = () => {
  const { storyId } = useParams(); // Get the story ID from URL parameters
  const [viewStory, setViewStory] = useState(null); // Store the fetched story
  const [error, setError] = useState(null); // Store any errors

  // Fetch story details on component mount
  useEffect(() => {
    const fetchStory = async () => {
      const token = sessionStorage.getItem('token'); // Retrieve token
      if (token) {
        const reqHeader = {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        };
        try {
          const response = await viewStoryAPI(storyId, reqHeader);
          if (response.status === 200) {
            setViewStory(response.data); // Update state with story details
          } else {
            setError('Failed to fetch story. Please try again.');
          }
        } catch (err) {
          console.error('Error fetching story:', err);
          setError('An error occurred. Please try again later.');
        }
      } else {
        setError('User is not authenticated.');
      }
    };

    fetchStory();
  }, [storyId]);

  const handleFavourite = async () => {
    const token = sessionStorage.getItem('token'); // Retrieve token
    if (!token) {
      setError('User is not authenticated.');
      return;
    }
    const reqHeader = {
      "Authorization": `Bearer ${token}`,
      'Content-Type': 'multipart/form-data"',
    };

    const reqBody = new FormData()
    reqBody.append("id",viewStory._id)
    reqBody.append("title",viewStory.title)
    reqBody.append("category",viewStory.category)
    reqBody.append("storyImg",viewStory.storyImg)
    // {
    //   id: viewStory._id,
    //   title: viewStory.title,
    //   category: viewStory.category,
    //   storyImg: viewStory.storyImg,
    // };

    try {
      const response = await addToFavouriteAPI(reqBody, reqHeader);
      if (response.status == 200) {
        alert('Story added to favourites successfully!');
      } else if(response.status == 406) {
        alert('Item already in Favourites');
      }
    } catch (err) {
      console.error('Error adding to favourites:', err);
      alert('An error occurred while adding to favourites. Please try again later.');
    }
  };

  if (error) {
    return <div className="text-center my-5 text-danger">{error}</div>;
  }
  if (!viewStory) {
    return <div className="text-center my-5">Loading story...</div>;
  }

  return (
    <>
      <div className="container my-5 shadow pt-2">
        <div className="d-flex">
          <Link to={'/stories'} className="ms-auto text-decoration-none fs-5">
            <i className="fa-solid fa-arrow-left"></i> Back
          </Link>
        </div>
        <div className="row align-items-center">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <img
              src={`http://localhost:3000/uploads/${viewStory.storyImg}`}
              alt={viewStory.title}
              className="img-fluid rounded shadow"
            />
          </div>
          <div className="col-lg-6">
            <div className="d-flex justify-content-between">
              <h1 className="mb-3">{viewStory.title}</h1>
              <button onClick={handleFavourite} className="btnX">
                Favourite
              </button>
            </div>
            <h6 className="text-dark mb-2">Author: {viewStory.author}</h6>
            <p className="text-dark mb-3">
              Published on: <span>{new Date(viewStory.date).toDateString()}</span>
            </p>
            <h5 className="text-danger">Category: {viewStory.category}</h5>
            <p className="mt-4 text-dark">
              <strong>Description:</strong>
              <br />
              {viewStory.description}
            </p>
          </div>
        </div>
        <div className="row">
        <p className="my-5 px-3 text-dark" style={{ textAlign: 'justify', wordWrap: 'break-word' }}>
         <strong>Story Content:</strong>
         <br />
        {viewStory.paragraph}
        </p>
        </div>
      </div>
    </>
  );
};

export default View;
