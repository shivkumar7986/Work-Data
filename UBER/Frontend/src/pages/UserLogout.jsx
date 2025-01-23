import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.warn("No token found in localStorage, redirecting to login...");
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          console.log("Logout successful.");
          localStorage.removeItem('token');
          navigate('/login');
        }
      } catch (error) {
        console.error("Error during logout:", error.response?.data || error.message);
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    logoutUser();

    return () => {
      console.log("Cleanup: Preventing extra calls.");
    };
  }, [navigate]);

  return <div>UserLogout</div>;
};

export default UserLogout;
