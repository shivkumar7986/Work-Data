import React from 'react'
import { useNavigate } from 'react-router-dom';
import './nav.css'

const Nav = () => {
    const navigate = useNavigate();

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove the token from local storage
        alert('logging out....')
        navigate('/'); // Redirect to login page
    };
    return (
        <>
            <header id="header" className="header1 d-flex align-items-center fixed-top rounded-bottom-4 ">
                <a href="/" className="logo d-flex align-items-center">

                    <h1 className="sitename">DripSteps</h1>
                </a>

                <nav id="navmenu" className="navmenu">
                    <ul className='d-flex align-items-center'>
                        <li><a href="ahero" className="active">Home</a></li>
                        <li><a href="about">About</a></li>
                        <li><a href="services">Services</a></li>
                        <li><a href="login">login</a></li>
                        <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
                    </ul>
                    <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
                </nav>

            </header>
        </>
    )
}

export default Nav