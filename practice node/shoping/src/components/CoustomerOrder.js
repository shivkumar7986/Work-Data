import React, { useEffect, useState } from 'react'
import Axios from 'axios'

const Coustomerfindbill = () => {

    
    const [orderData, setOderData] = useState([])
    // const [loggedInUser , setLoggedInUser] = useState([])

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem('token');
            // console.log("Token:", token);
    
            const res = await Axios.post(
                'http://localhost:4000/coustomer/orders',
                {}, // POST body (empty here)
                {
                    headers: { Authorization: `Bearer ${token}` }, // Headers in config
                }
            );
            
            setOderData(res.data)
            console.log("Response Data:", res.data);
        } catch (error) {
            console.error("Failed to fetch items:", error);
        }
    };
    

    

    useEffect(() => {
        fetchOrders()
    }, [])
    

    return (
        <div style={{padding:'1vw'}}>
            <h1> Your Orders.</h1>
            <table border={1} style={{ width: "100%", textAlign: 'center' }}>
          <thead>
            <tr>
              <th>Bill Number</th>
              <th>CreatedAt</th>
              <th>Customer Name</th>
              <th>Customer Username</th>
              <th>Customer Email</th>
              <th>Total Amount</th>
              <th>Products</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orderData.map((bill, index) => (
              <tr key={index}>
                <td>{bill.billNo}</td>
                <td>{new Date(bill.createdAt).toLocaleDateString()}</td>
                <td>{bill.name}</td>
                <td>{bill.username}</td>
                <td>{bill.email}</td>
                <th>{bill.totalAmount}</th>
                <td>
                  {/* Nested Table for Products */}
                  <table border={1} style={{ width: "100%", margin: "1rem 0" }}>
                    <thead>
                      <tr>
                        <th>Product ID</th>
                        <th>Product Image</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bill.products?.map((product, idx) => (
                        <tr key={idx}>
                          <td>{product.productId}</td>
                          <td><img src={`/uploads/${product.productImg}`} height={30} width={30}></img></td>
                          <td>{product.productName}</td>
                          <td>{product.productQuantity}</td>
                          <td>{product.productPrice}</td>
                        </tr>
                      )) || (
                          <tr>
                            <td colSpan={4}>No products</td>
                          </tr>
                        )}
                    </tbody>
                  </table>
                </td>
                <td>
                  {bill.orderStatus}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
            

        </div>
    )
}

export default Coustomerfindbill