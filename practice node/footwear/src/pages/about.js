import React from 'react';

import { Link } from 'react-router-dom'; // If you are using React Router

const ServiceDetails = () => {
  return (
    <>
     

      <main className="main">
        {/* Page Title */}
        <div className="page-title dark-background">
          <div className="container position-relative">
            <h1>Our Objective</h1>
            <p>Discover how DripSteps can elevate your sneaker game with premium shoe services and products.</p>
            <nav className="breadcrumbs">
              <ol>
                <li><Link to="/">Home</Link></li>
                <li className="current">About</li>
              </ol>
            </nav>
          </div>
        </div>

        {/* Service Details Section */}
        <section className="service-details section">
          <div className="container">
            <div className="row gy-4">
              <div className="col-lg-4" data-aos="fade-up" data-aos-delay="100">
                <div className="services-list">
                  <a href="#" className="active">Shoe Customization</a>
                  <a href="#">Shoe Cleaning</a>
                  <a href="#">Sneaker Repair</a>
                  <a href="#">Product Management</a>
                  <a href="#">Marketing</a>
                </div>
                <h4>Unleash Your Style</h4>
                <p>Whether you're looking to add a unique flair or restore your favorite kicks, we've got you covered.</p>
              </div>

              <div className="col-lg-8" data-aos="fade-up" data-aos-delay="200">
                <img src="assets/img/services.jpg" alt="DripSteps Services" className="img-fluid services-img" />
                <h3>Your Shoes, Your Identity</h3>
                <p>
                  At DripSteps, we believe that every pair of shoes tells a story. Our expert team helps you express yourself through your kicks.
                </p>
                <ul>
                  <li><i className="bi bi-check-circle"></i> <span>Custom designs tailored to your style.</span></li>
                  <li><i className="bi bi-check-circle"></i> <span>Premium cleaning and maintenance.</span></li>
                  <li><i className="bi bi-check-circle"></i> <span>Professional repair services for longevity.</span></li>
                </ul>
                <p>
                  Our services are dedicated to sneakerheads and enthusiasts who value quality, durability, and style.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      

      <a href="#" className="scroll-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>
    </>
  );
};

export default ServiceDetails;
