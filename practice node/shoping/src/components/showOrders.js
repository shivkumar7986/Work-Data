import { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Coustomer = () => {
  const [allBills, setAllBills] = useState([]);
  const navigate = useNavigate()
  const fetchingBills = async () => {
    try {
      const orderData = await Axios.post('http://localhost:4000/admin/orders');
      // console.log("Order Data:", orderData.data);
      setAllBills(orderData .data);
    } catch (error) {
      console.error("Error fetching bills:", error);
    }
  };

  useEffect(() => {
    fetchingBills();
  }, []);


  const handleStatus = async (e)=>{
   const status = await Axios.post(`http://localhost:4000/admin/orders/status/${e.target.id}/${e.target.value}`)
   console.log(status.data)
   fetchingBills()
  }

  return (
    <div style={{ padding: "2vw" }}>
      <div>
        <div >
          <h1>All Orders...</h1>
          <button onClick={() => {
            navigate('/admin')
          }}>Back</button>
        </div>
        <br />
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
            {allBills.map((bill, index) => (
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
                  <select
                    id={bill.billNo}
                    onChange={handleStatus}
                    value={bill.orderStatus || 'pending'}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out For delevery">Out for delevery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Coustomer;
