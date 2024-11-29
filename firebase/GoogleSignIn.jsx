import React, { useEffect, useState } from 'react';
import { auth, provider } from './config';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { registerAPI, loginAPI } from '../src/services/allAPI';
import { useNavigate } from 'react-router-dom';

const GoogleSignIn = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  const handleClick = async () => {
    const customProvider = new GoogleAuthProvider();
    customProvider.setCustomParameters({ prompt: 'select_account' });

    try {
      const { user } = await signInWithPopup(auth, customProvider);

      // Prepare user data
      const userInfo = {
        username: 'fromGoogle',
        email: user.email,
        password: user.email, // Using email as a dummy password
        photoURL: user.photoURL,
      };

      setUserData(userInfo); // Update state with user info
      localStorage.setItem('userData', JSON.stringify(userInfo));

      // Registration logic
      try {
        const registerResult = await registerAPI(userInfo);
        if (registerResult.status === 200) {
          // Login logic after successful registration
          try {
            const loginResult = await loginAPI(userInfo);
            if (loginResult.status === 200) {
              sessionStorage.setItem('user', JSON.stringify(loginResult.data.user));
              sessionStorage.setItem('token', loginResult.data.token);
              alert(`Welcome ${registerResult.data.username}...!`);
              navigate('/');
              window.location.reload();
            }
          } catch (loginError) {
            console.error('Login error:', loginError);
            alert('Login failed. Please try again.');
          }
        } else if (registerResult.status === 406) {
          // User already registered, proceed with login logic
          try {
            const loginResult = await loginAPI(userInfo);
            if (loginResult.status === 200) {
              sessionStorage.setItem('user', JSON.stringify(loginResult.data.user));
              sessionStorage.setItem('token', loginResult.data.token);
              alert(`Welcome back ${loginResult.data.user.username}...!`);
              navigate('/');
              window.location.reload();
            }
          } catch (loginError) {
            console.error('Login error:', loginError);
            alert('Login failed. Please try again.');
          }
        }
      } catch (registerError) {
        console.error('Registration error:', registerError);
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during Google Sign-In:', error);
      alert('Failed to sign in with Google. Please try again.');
    }
  };

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  return (
    <>
      <div className='text-center'>
        <button className="google-login-btn" onClick={handleClick}>
          <img 
            src="https://banner2.cleanpng.com/20190228/qby/kisspng-google-logo-google-account-g-suite-google-images-g-icon-archives-search-png-1713904157115.webp" 
            alt="Google Logo" 
            className="google-icon" 
          />
          Login with Google
        </button>
      </div>
    </>
  );
};

export default GoogleSignIn;
