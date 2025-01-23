import Axios from 'axios';
import React, { useEffect, useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import "./viewproduct.css"

import Nav from '../components/nav'



const ViewProduct = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [product, setProduct] = useState();

  //product fetching
  const fetchProduct = async () => {
    try {
      const prod = await Axios.get(`http://localhost:4000/viewproduct/${id}`);
      setProduct(prod.data);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };
  
  useEffect(() => {
    // fetchProduct();

  }, []);

  //add to cart

  // const addToCart = ()=>{
  //   const token = localStorage.getItem('token')
  //   console.log(token);
  //   if(!token){
  //     navigate('/login')
  //   }
  //   else{
  //     alert('thanks')
  //   }
  // }
 



if (!product) return <div>Loading...</div>;

return (
  <>
    <Nav />
    <div className="container1">
      {/* Product Image */}
      <div className="imageContainer">
        <img src={`/uploads/${product.productImg}`} alt={product.productName} className="image" />
      </div>

      {/* Product Details */}
      <div className="detailsContainer">
        <h1 className="productName">{product.productName}</h1>
        <p className="price">Price: ₹{product.productPrice}</p>
        <button className="button" >Add to Cart</button>
      </div>
    </div>
  </>
);
};

export default ViewProduct;
