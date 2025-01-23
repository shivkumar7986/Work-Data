import React, { useState } from 'react';

import Axios from 'axios';
import { useNavigate } from 'react-router-dom';



const Login = () => {
    const [username, setUserName] = useState('');
    const [name, setName] = useState('');
    const [useremail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggedInUser, setLoggedInUser] = useState(null);

    const navigate = useNavigate();

    const formSubmit = () => {
        const dt = {username:username,name:name, email: useremail, password: password };

        Axios.post('http://localhost:4000/registor', dt)
            .then(res => {if(res.data){
                alert('accont created , you can login')
                navigate('/')
            }})
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
            <h1>Create New Account...</h1>
            <form action="#" onSubmit={submitHandler}>

                Username: <input type="text"  required onChange={(e) => { setUserName(e.target.value) }} />
                Name: <input type="text"  required onChange={(e) => { setName(e.target.value) }} />
                Email: <input type="email" id="email" required onChange={(e) => { setUserEmail(e.target.value) }} />
                Password: <input type="password" required onChange={(e) => { setPassword(e.target.value) }} />
                <button type="submit"  onClick={formSubmit}>Create Account</button>
        


            </form>
             


        </div>
    )
}

export default Login