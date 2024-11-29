import React, { useState, useEffect, useContext } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import profileimg from '../assets/profile.png'; // Default profile image
import { getSingleUserAPI } from '../services/allAPI';
import serverUrl from '../services/serverUrl';
import { profileResponseContext } from '../contexts/ContextShare';

const Header = () => {
    const { profileResponse, setProfileResponse } = useContext(profileResponseContext);

    const [userData, setUserData] = useState(null); // State to hold user data
    const Navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);

    const fetchUserData = async () => {
        const token = sessionStorage.getItem('token');
        if (token) {
            const reqHeader = {
                Authorization: `Bearer ${token}`,
            };
            try {
                const result = await getSingleUserAPI(reqHeader);
                if (result?.status === 200) {
                    setUserData(result.data); // Store user data
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [profileResponse]);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const logout =  () => {
        // Clear session and local storage
        sessionStorage.clear();
        localStorage.clear();
        // Navigate to the login page
        Navigate('/');
        window.location.reload();
    };

    const gData = localStorage.getItem("userData"); // Retrieve the string
    if (gData) {
            const parsedData = JSON.parse(gData); // Parse the JSON string
            const photoURL = parsedData.photoURL; // Access the photoURL
            console.log(photoURL); // Verify the value
    }
    
    return (
        <div>
            <Navbar expand="lg" className="shadow">
                <Container>
                    <Navbar.Brand className="d-flex align-items-center">
                        <i className="fa-solid fa-ghost text-danger me-2 fs-2"></i> <span>STORYVERSE</span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto d-flex align-items-center">
                            <Link to={'/favourites'} className="me-3 pt-1">
                                <i className="fa-solid fa-heart text-danger fs-3"></i>
                            </Link>
                            <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="position-relative">
                                <Link to={'/profile'}>
                                    <img
                                        width="40px"
                                        height="40px"
                                        src={userData?.profilePic ? `${serverUrl}/uploads/${userData.profilePic}` : profileimg }
                                        alt="User Avatar"
                                        className="me-3 rounded-circle"
                                    />
                                </Link>
                            </div>
                            <button onClick={logout} className="logout-btn text-decoration-none">
                                LOGOUT <i className="fa-solid fa-right-from-bracket"></i>
                            </button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default Header;
