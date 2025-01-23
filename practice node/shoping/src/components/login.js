import React, { useState } from 'react';

import Axios from 'axios';
import { useNavigate } from 'react-router-dom';



const Login = () => {
    const [useremail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggedInUser, setLoggedInUser] = useState(null);

    const navigate = useNavigate();

    const formSubmit = () => {
        const dt = { email: useremail, password: password };

        Axios.post('http://localhost:4000/login', dt)
            .then(res => {
                
                const userToken = res.data.token; // Assuming the response includes a token
                localStorage.setItem("token", userToken)

                setLoggedInUser(res.data.user); // Set user data in state if needed
                console.log(res.data); // Show the response data

                if (useremail === 'admin@gmail.com') {
                    navigate('/admin');
                } else {
                    navigate('/coustomer');
                }
            })
            .catch(err => {
                if (err.response) {
                    alert(err.response.data);
                } else {
                    alert("Error logging in. Please try again.");
                }
            });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        formSubmit(); // Call formSubmit on form submission
    };


    return (
        <div style={{padding:'2vw'}}>
            <h1>Login Here...</h1>
            <form action="#" onSubmit={submitHandler} style={{marginBottom:'3vw'}}>

                Email: <input type="email" id="email" required onChange={(e) => { setUserEmail(e.target.value) }} />
                Password: <input type="password" required onChange={(e) => { setPassword(e.target.value) }} />
                <button type="submit"  onClick={formSubmit}>Sign In</button>



            </form>
             <a href='registor' style={{textDecoration:'none' , backgroundColor:'purple', borderRadius:'20px', padding:'0.5vw 1vw', color:'white', marginTop:'3vw'}}>Create Account.</a>


        </div>
    )
}

export default Login