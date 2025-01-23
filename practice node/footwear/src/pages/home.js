import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import './home.css'
import Nav from '../components/nav'
import Footer from '../components/footer'

const Home =  () => {
    const [allprod, setAddprod] = useState([])

    useEffect(async() => {
        const res = await Axios.get("http://localhost:4000/")
        setAddprod(res.data)
        console.log(res.data);
        
    }, [])

    

    return (
        <>
            <div classNameName='index-page'>
                <Nav />

                <main className="main">

                    {/* <!-- Hero Section --> */}
                    <section id="hero" className="hero section light-background pb-5 rounded-bottom-5 mt-3 "   >
                        <div id="hero-carousel" data-bs-interval="5000" className="container carousel carousel-fade mt-4 " data-bs-ride="carousel"   >

                            {/* Slide 1 */}
                            <div className="carousel-item active"  >
                                <div className="carousel-container"  >
                                    <img src="https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Slide 1" className="d-block w-100 " style={{ height: '80vh', objectFit: 'cover', borderRadius: '20px', }} />
                                </div>
                            </div>

                            {/* Slide 2 */}
                            <div className="carousel-item">
                                <div className="carousel-container">
                                    <img src="https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Slide 2" className="d-block w-100" style={{ height: '80vh', objectFit: 'cover', borderRadius: '20px', }} />
                                </div>
                            </div>

                            <div className="carousel-item ">
                                <div className="carousel-container">
                                    <img src="https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Slide 3" className="d-block w-100" style={{ height: '80vh', objectFit: 'cover', borderRadius: '20px', }} />
                                </div>
                            </div>

                            {/* Slide 3 */}
                            <div className="carousel-item ">
                                <div className="carousel-container">
                                    <img src="https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Slide 3" className="d-block w-100" style={{ height: '80vh', objectFit: 'cover', borderRadius: '20px', }} />
                                </div>
                            </div>

                            {/* Slide 4 */}
                            <div className="carousel-item ">
                                <div className="carousel-container">
                                    <img src="https://images.unsplash.com/photo-1518002171953-a080ee817e1f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Slide 3" className="d-block w-100" style={{ height: '80vh', objectFit: 'cover', borderRadius: '20px', }} />
                                </div>
                            </div>
                            <a className="carousel-control-prev" href="#hero-carousel" role="button" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon bi bi-chevron-left" aria-hidden="true"></span>
                            </a>

                            <a className="carousel-control-next" href="#hero-carousel" role="button" data-bs-slide="next">
                                <span className="carousel-control-next-icon bi bi-chevron-right" aria-hidden="true"></span>
                            </a>

                        </div>
                    </section>

                    <section className='hero section light-background p-5'  >
                        {/* <!-- Section Title --> */}
                        <div className="container section-title" >
                            <h2>Prodcuts</h2>
                            <p> Because shoes are a culture!</p>
                        </div>
                        {/* <!-- End Section Title --> */}

                        <div className="container">

                            <div className="row">

                                {allprod.map((i) => (
                                    <div className="col-lg-4 col-md-6 d-flex" key={i.id}>
                                        <div className="product-card">
                                            <a href={`/viewproduct/${i._id}`}>
                                                <img src={`/uploads/${i.productImg}`} alt="p-img" className="product-image" />
                                            </a>
                                            <div className="product-content">
                                                <h4 className="product-name">{i.productName}</h4>
                                                <p className="product-price">₹{i.productPrice}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </div>

                        </div>
                    </section>

                    <Footer />




                </main>




            </div>
        </>
    )
}

export default Home