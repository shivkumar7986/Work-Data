import React, { useEffect, useState } from 'react';

const Bill = () => {
  const [billData, setBillData] = useState(null);

  // Fetch the bill data from localStorage
  useEffect(() => {
    const storedBill = JSON.parse(localStorage.getItem('bill'));
    if (storedBill) {
      setBillData(storedBill);
    } else {
      alert('No bill found in localStorage.');
    }
  }, []);

  if (!billData) {
    return <p>Loading bill...</p>;
  }

  return (
    <div style={{ padding: '2vw' }}>
      <h1>Bill Summary</h1>
      <div>
        <p>
          <strong>Customer Name:</strong> {billData.customerName}
        </p>
        <p>
          <strong>Email:</strong> {billData.email}
        </p>
        <p>
          <strong>Total Amount:</strong> ₹{billData.totalAmount}
        </p>
        <p>
          <strong>Bill Number:</strong> ₹{billData.billNo}
        </p>
      </div>

      <h2>Purchased Items:</h2>
      <table border={1}>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {billData.items.map((item, index) => (
            <tr key={index}>
              <td>{item.productName}</td>
              <td>₹{item.productPrice}</td>
              <td>{item.productQuantity}</td>
              <td>₹{item.productPrice * item.productQuantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Bill;
