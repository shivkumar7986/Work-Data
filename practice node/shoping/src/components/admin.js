import { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Admin = () => {
    const navigate = useNavigate(); // useNavigate hook should be called at the top level
    const [allproduct, setAllproduct] = useState([])

    const isloggedin = () => {
        const token = localStorage.getItem('token')
        if (!token) {
            navigate('/')
        }
        else {
            navigate('/admin')
        }
    }

    useEffect(() => {
        isloggedin()
    }, [])

    useEffect(() => {
        
        const fetchProduct = async () => {
            try {
                const rawdt = await fetch('http://localhost:4000/admin', {
                    credentials: 'include',
                });

                if (!rawdt.ok) {
                    const errorText = await rawdt.text();
                    throw new Error(errorText);
                }

                const dt = await rawdt.json();
                setAllproduct(dt);
            } catch (error) {
                console.error("Error fetching product data:", error.message);
            }
        };

        fetchProduct();
    }, []);

    const [productImg, setProductImg] = useState(null);
    const [productId, setProductId] = useState('');
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create a FormData object
        const formData = new FormData();
        formData.append('img', productImg);
        formData.append('pid', productId);
        formData.append('pname', productName);
        formData.append('pprice', productPrice);

        try {
            // Send form data with Axios
            const response = await Axios.post('http://localhost:4000/admin/addproducts', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },

            });


        } catch (error) {
            console.error("Error adding product:", error.message);
        }
        window.location.reload()
    };

    const handleLogout = ()=>{
        localStorage.removeItem('token')
        navigate('/')
    }

    const navigateToBills = ()=>{
        navigate('/admin/showorders')
    }

    const handleDelete = async (pid) => {
        try {
            const response = await fetch(`http://localhost:4000/admin/deleteproducts/${pid}`, {
                method: 'GET',
                credentials: 'include',
            });

            if (response.ok) {
                setAllproduct((prevProducts) =>
                    prevProducts.filter((product) => product.productId !== productId)
                );
                alert('Product deleted successfully')
                window.location.reload()
            } else {
                console.error("Failed to delete product");
            }
        } catch (error) {
            console.error("Error deleting product:", error.message);
        }


        
    };
    return (
        <div style={{padding:'1vw'}}>
            <div style={{display:'flex', alignItems:'center' , justifyContent:'space-between'}}>
            <h1>welcome To Admin Panel.</h1>
            <div>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={navigateToBills} >Show Orders</button>

            </div>
            </div>

            <div style={{ marginBottom: '2vw' }}>
                <form onSubmit={handleSubmit} encType="multipart/form-data" >
                    ProductImg: <input type="file" onChange={(e) => setProductImg(e.target.files[0])} /> <br />
                    ProductId :   <input type="text" value={productId} onChange={(e) => setProductId(e.target.value)} />
                    ProductName:    <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
                    ProductPrice:  <input type="number" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />

                    <button type="submit" class="btn btn-gradient-primary mr-2">Submit</button>

                </form>
            </div>

            <hr />

            <div style={{ marginTop: '2vw' }}>
                <table >
                    <thead>
                        <tr>
                            <th> Prouct Image </th>
                            <th> Prouct Id </th>
                            <th> Product Name </th>
                            <th> Product Price </th>
                            <th> Delete</th>
                            <th> Edit</th>

                        </tr>
                    </thead>
                    <tbody>
                        {allproduct.map((product) => (
                            <tr key={product._id}> {/* Use a unique key for each product */}
                                <td>
                                    <img src={`/uploads/${product.productImg}`} alt="product" height={100} width={100} /> {/* Replace with product image if available */}
                                    {product.productName}
                                </td>
                                <td>{product.productId}</td>
                                <td>
                                    {product.productName}
                                </td>
                                <td>{product.productPrice}</td>
                                <td><button

                                    onClick={() => handleDelete(product._id)}
                                >Delete</button></td>
                                <td><button id={product.productId} onClick={(e) => {
                                    const pid = e.target.id;
                                    localStorage.setItem('productId', pid)
                                    navigate('/adminedit')
                                }}>Edit</button></td>

                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

        </div>
    )
}

export default Admin