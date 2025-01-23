import React from 'react'
import './login.css'

const Login = () => {
  return (
    <>
      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 text-center ">
              <h2 className="heading-section">Registor .</h2>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-7 col-lg-5">
              <div className="wrap shadow-lg rounded">
                
                <div className="login-wrap p-4 p-md-5">
                  <div className="d-flex mb-4">
                    <div className="w-100">
                      <h3 className="mb-4">Sign Up</h3>
                    </div>
                   
                  </div>
                  <form action="#" className="signin-form">
                    <div className="form-group mt-3">
                      <input type="text" className="form-control" id="username" required />
                      <label className="form-control-placeholder" htmlFor="username">Username</label>
                    </div>
                    <div className="form-group mt-3">
                      <input type="text" className="form-control" id="name" required />
                      <label className="form-control-placeholder" htmlFor="name">name</label>
                    </div>
                    <div className="form-group mt-3">
                      <input type="email" className="form-control" id="email" required />
                      <label className="form-control-placeholder" htmlFor="email">email</label>
                    </div>
                    <div className="form-group">
                      <input id="password-field" type="password" className="form-control" required />
                      <label className="form-control-placeholder" htmlFor="password-field">Password</label>
                      <span toggle="#password-field" className="fa fa-fw fa-eye field-icon toggle-password"></span>
                    </div>
                    <div className="form-group">
                      <button type="submit" className="form-control btn btn-primary rounded submit px-3">Sign In</button>
                    </div>
                    
                  </form>
                  <p className="text-center mt-4">Already a member? <a href="login">Sign In</a></p>
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