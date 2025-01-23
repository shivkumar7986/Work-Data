import { useState, useEffect } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'; // for navigation after token verification failure

const Coustomer = () => {
    const [allprod, setAddprod] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState()
    const navigate = useNavigate(); // Hook to navigate to a different page (e.g., login)

    const data = async () => {
        const res = await Axios.get("http://localhost:4000/");
        setAddprod(res.data);

    };

    const user = async (e) => {
        const token = localStorage.getItem('token');

        if(!token){
            alert('you must be logged in....')
            navigate('/')
        }else{
            const pid = e.target.id
            console.log(pid);
    
            // Verify the token and fetch the products
            const res = await Axios.get(`http://localhost:4000/verify/${pid}`, {
                headers: {
                    Authorization: `Bearer ${token}` // Send token in header
                }
            });
            setLoggedInUser(res.data.user);
            localStorage.setItem('loggedInUser' , res.data.user)
            console.log(res.data.user);
        }

        
        

    };

    const showcart= ()=>{
        navigate('/showcart')
    }
    const findBill= ()=>{
        navigate('/coustomer/showbills')
    }

    const orders= ()=>{
        navigate('/coustomer/orders')
    }



    const logout= ()=>{
        localStorage.removeItem('token')
        localStorage.removeItem('loggedInUser')
        navigate('/')
    }

    useEffect(() => {
        data();
        
    }, []);



    return (
        <div style={{ padding: "2vw" }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h1>Welcome to our store</h1>
                <div>
                    <button onClick={logout}>Logout</button>
                    <button onClick={showcart}>ShowCart</button>
                    <button onClick={findBill}>ShowBill</button>
                    <button onClick={orders}>Orders</button>
                </div>
            </div>

            <table className="product-table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Cart</th>
                    </tr>
                </thead>
                <tbody>
                    {allprod.map((i) => (
                        <tr key={i.productId}>
                            <td>
                                <img
                                    src={`/uploads/${i.productImg}`}
                                    alt={`${i.productName} image`}
                                    className="product-image"
                                    height={100}
                                    width={100}
                                />
                            </td>
                            <td>{i.productName}</td>
                            <td>₹{i.productPrice}</td>
                            <td>
                                <button id={i.productId} onClick={user}  >Add To Cart</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Coustomer;


