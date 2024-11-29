import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { deleteFavouriteAPI, getFavouriteAPI } from '../services/allAPI';
import serverUrl from '../services/serverUrl';
import { useNavigate } from 'react-router-dom';

const Favourites = () => {
  const navigate = useNavigate(); // Corrected variable name to camel case
  const [allStories, setAllStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getFavouriteStories();
  }, []);

  const getFavouriteStories = async () => {
    const token = sessionStorage.getItem('token');
    if (token) {
      const reqHeader = {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`,
      };
      try {
        const result = await getFavouriteAPI(reqHeader);
        if (result.status === 200) {
          setAllStories(result.data);
        } else {
          setError(result.response.data || 'Failed to fetch stories.');
        }
      } catch (err) {
        console.error('Error fetching stories:', err);
        setError('Failed to fetch stories.');
      } finally {
        setLoading(false);
      }
    } else {
      setError('No token found. Please log in.');
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center my-5">Loading...</div>;
  }
  if (error) {
    return <div className="text-center text-danger my-5">{error}</div>;
  }
  if (allStories.length === 0) {
    return <div className="text-center my-5">No saved stories found.</div>;
  }

  const handleView = (storyId) => {
    navigate(`/story/${storyId}`); // Navigate to the story view page using story ID
  }; 
  
  const handleDelete = async (id)=>{
    const token = sessionStorage.getItem("token")
    if(token){
      const reqHeader = {
          "Authorization":`Bearer ${token}`
      }
      try{
        const result = await deleteFavouriteAPI(id,reqHeader)
        if(result.status==200){
          getFavouriteStories()
        }else{
          console.log(result); 
          alert(result)
        }
      }catch(err){
        console.log(err);
      }
    }
  }



  return (
    <div className="container my-5">
      <h2>Your Saved Stories</h2>
      <div className="row">
        {allStories.map((story) => (
          <div key={story._id} className="col-md-4 mb-4">
            <Card className="shadow">
              <Card.Img
                variant="top"
                src={`${serverUrl}/uploads/${story?.storyImg}`}
                alt="Story Image"
                onError={(e) => {
                  e.target.src = 'placeholder.jpg'; // Fallback to placeholder image if loading fails
                }}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <Card.Body>
                <Card.Title>{story.title}</Card.Title>
                <Card.Text>{story.category}</Card.Text>
                <div className='d-flex justify-content-between'>
                <Button onClick={() => handleView(story.storyId)} variant="primary">View Story</Button>
                <button onClick={()=>handleDelete(story?._id)} className='btn'><i className='fa-solid fa-trash text-danger'></i></button>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favourites;
