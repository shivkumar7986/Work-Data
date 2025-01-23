import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Payment = () => {

  const navigate = useNavigate()

  const [userdt, setUserdt] = useState({
    user: { name: '', email: '' },
    items: []
  });



  const findUser = () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || { user: { name: '', email: '' }, items: [] };
    setUserdt(cartItems);
  };

  useEffect(() => {
    findUser();
  }, []);

  const handlePayment = async () => {
    const data = {
      username: userdt.user.username,
      name: userdt.user.name,
      email: userdt.user.email,
      product: userdt.items,
    };

    try {
      const response = await Axios.post('http://localhost:4000/showcart/payment', data);
      console.log('Payment Successful:', response.data);

     
     

      alert('Payment successful! Cart is now empty.');
    } catch (error) {
      console.error('Payment Failed:', error.response?.data || error.message);
      alert(error.response?.data?.error || 'Payment failed. Please try again.');
    }
  };

  const handleGenerateBill = () => {
    const { user, items } = userdt;

    // Calculate total amount
    const totalAmount = items.reduce(
      (total, item) =>
        total + parseInt(item.productPrice) * parseInt(item.productQuantity),
      0
    );

    // Create bill object
    const bill = {
      customerName: user.name,
      email: user.email,
      items,
      totalAmount,
    };

    // Store bill in localStorage
    localStorage.setItem('bill', JSON.stringify(bill));

    alert('Bill generated and stored in localStorage.');
    console.log('Generated Bill:', bill);
    navigate('/showcart/bill')
  };

  return (
    <div style={{ padding: '2vw' }}>
      <h1>Make Payment</h1>
      <form onSubmit={(e) => { e.preventDefault(); handlePayment(); }}>
        <div>
          Customer Name: <input type="text" value={userdt.user.name} readOnly />
        </div>
        <div>
          Email: <input type="email" value={userdt.user.email} readOnly />
        </div>
        <div>
          Total Amount: <input type="number" value={localStorage.getItem('gross')} readOnly />
        </div>
        <br />
        <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '2vw' }}>
          <button type="submit">Submit Payment</button>
          <button onClick={handleGenerateBill}>Generate Bill</button>
          <button onClick={() => {
            navigate('/coustomer')
          }}>continue shopping</button>
        </div>
      </form>

      <h2>Cart Products:</h2>
      <table border={1}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {userdt.items.map((item, index) => (
            <tr key={index}>
              <td>
                <img src={`/uploads/${item.productImg}`} alt={item.name} width="50" height="50" />
              </td>
              <td>{item.productName}</td>
              <td>{item.productPrice}</td>
              <td>{item.productQuantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Payment;
