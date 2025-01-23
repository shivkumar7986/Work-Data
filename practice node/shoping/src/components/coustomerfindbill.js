import React, { useState } from 'react'
import Axios from 'axios'

const Coustomerfindbill = () => {

    const [billNo, setbillNo] = useState()
    const [email, setEmail] = useState()
    const [billData, setBillData] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = { billNo: billNo, email: email }
        const dt = await Axios.post('http://localhost:4000/coustomer/bill', data)
        console.log(dt.data);
        setBillData(dt.data)
    }

    return (
        <div>
            <h1>Search Your Bill.</h1>
            <form onSubmit={handleSubmit}>
                Bill No. <input type='number' onChange={(e) => { setbillNo(e.target.value) }} />
                Email <input type='email' onChange={(e) => { setEmail(e.target.value) }} />
                <button>Search</button>
            </form>
            <table border={1} style={{ width: "100%", marginTop:'2vw' }}>
                <thead>
                    <tr>
                        <th>Bill Number</th>
                        <th>CreatedAt</th>
                        <th>Customer Name</th>
                        <th>Customer Username</th>
                        <th>Customer Email</th>
                        <th>Total Amount</th>
                        <th>Products</th>
                    </tr>
                </thead>
                <tbody>
                    {billData.map((bill, index) => (
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
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default Coustomerfindbill