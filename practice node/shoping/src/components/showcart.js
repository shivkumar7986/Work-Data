import React, { useEffect, useState } from 'react';
import Axios from 'axios';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [grossPrice, setGrossPrice] = useState(0);

    // Function to fetch cart items from backend
    const fetchCartItems = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await Axios.get('http://localhost:4000/cart', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCartItems(res.data.items || []);
            localStorage.setItem('cartItems' , JSON.stringify(res.data))
            findGross(res.data.items || []);
        } catch (error) {
            console.error("Failed to fetch cart items:", error);
            setCartItems([]);
        }
    };

    // Fetch cart items on component mount
    useEffect(() => {
        fetchCartItems();
    }, []);
    
    // Calculate gross price
    const findGross = (products) => {
        const total = products.reduce((sum, item) => sum + item.productPrice, 0);
        setGrossPrice(total);
        localStorage.setItem('gross' , total)
    };
    
    // Remove product and refetch cart items
    const removeProduct = async (e) => {
        const token = localStorage.getItem('token');
        const pid = e.target.id;
        try {
            await Axios.get(`http://localhost:4000/remove-cart-item/${pid}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            await fetchCartItems(); // Refetch cart items to get the latest data
        } catch (error) {
            console.error("Failed to remove product:", error);
        }
    };

    return (
        <div style={{ padding: '2vw' }}>
            <h2>Your Cart</h2>
            <table border={1}>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map((item, index) => (
                        <tr key={index}>
                            <td>
                                <img src={`/uploads/${item.productImg}`} alt={item.name} width="100" height="100" />
                            </td>
                            <td>{item.productName}</td>
                            <td>{item.productPrice}</td>
                            <td>{item.productQuantity}</td>
                            <td><button id={item._id} onClick={removeProduct}>Remove</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div style={{display:'flex', justifyContent:'space-between'}}>
            <h1>Gross Amount:  ₹{grossPrice}</h1>
            <a href='/showcart/payment'>make payment</a>
            </div>
        </div>
    );
};

export default Cart;
