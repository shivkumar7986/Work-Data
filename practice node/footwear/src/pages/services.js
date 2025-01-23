import React from 'react';

import { Link } from 'react-router-dom'; // If you are using React Router

const ServiceDetails = () => {
  return (
    <>
     

      <main className="main">
        {/* Page Title */}
        <div className="page-title dark-background">
          <div className="container position-relative">
            <h1>Our Services</h1>
            <p>Discover how DripSteps can elevate your sneaker game with premium shoe services and products.</p>
            <nav className="breadcrumbs">
              <ol>
                <li><Link to="/">Home</Link></li>
                <li className="current">Services</li>
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

      <footer className="footer light-background">
        <div className="container">
          <h3 className="sitename">DripSteps</h3>
          <p>Your go-to destination for all things sneakers. Step up your style with DripSteps.</p>
          <div className="social-links d-flex justify-content-center">
            <a href="#"><i className="bi bi-twitter"></i></a>
            <a href="#"><i className="bi bi-facebook"></i></a>
            <a href="#"><i className="bi bi-instagram"></i></a>
            <a href="#"><i className="bi bi-linkedin"></i></a>
          </div>
          <div className="container">
            <div className="copyright">
              <span>© 2024</span> <strong className="px-1 sitename">DripSteps</strong> <span>All Rights Reserved</span>
            </div>
            <div className="credits">
              Designed by DripSteps Team
            </div>
          </div>
        </div>
      </footer>

      <a href="#" className="scroll-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>
    </>
  );
};

export default ServiceDetails;
