import React, { useState } from 'react';
import './login.css';
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
        alert('Sign-in successful!');
        const userToken = res.data.token; // Assuming the response includes a token
        localStorage.setItem("token" , userToken)

        setLoggedInUser(res.data.user); // Set user data in state if needed
        console.log(res.data); // Show the response data

        if (useremail === 'admin@gmail.com') {
          navigate('/admin');
        } else {
          navigate('/');
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
    <>
    
      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 text-center mb-5">
              <h2 className="heading-section">Login .</h2>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-7 col-lg-5">
              <div className="wrap shadow-lg rounded">
                <div className=" rounded-top"></div>
                <div className="login-wrap p-4 p-md-5">
                  <div className="d-flex mb-4">
                    <div className="w-100">
                      <h3 className="mb-4">Sign In</h3>
                    </div>

                  </div>
                  <form action="#" className="signin-form" onSubmit={submitHandler}>
                    <div className="form-group mt-3">
                      <input type="email" className="form-control" id="email" required onChange={(e) => { setUserEmail(e.target.value) }} />
                      <label className="form-control-placeholder" htmlFor="email">Email</label>
                    </div>
                    <div className="form-group">
                      <input id="password-field" type="password" className="form-control" required onChange={(e) => { setPassword(e.target.value) }} />
                      <label className="form-control-placeholder" htmlFor="password-field">Password</label>
                      <span toggle="#password-field" className="fa fa-fw fa-eye field-icon toggle-password"></span>
                    </div>
                    <div className="form-group">
                      <button type="submit" className="form-control btn btn-primary rounded submit px-3" onClick={formSubmit}>Sign In</button>
                    </div>
                    <div className="form-group d-md-flex">

                      <div className="w-50 text-md-right">
                        <a href="#">Forgot Password</a>
                      </div>
                    </div>
                  </form>
                  <p className="text-center mt-4">Not a member? <a href="registor">Sign Up</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


    </>
  )
}

export default Login