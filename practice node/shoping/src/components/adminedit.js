import { useState, useEffect } from 'react'
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Adminedit = () => {
    const [productImg, setProductImg] = useState(null);
    const [productId, setProductId] = useState('');
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();


        const data={"img":productImg , "pid":productId,"pname":productName,"pprice":productPrice};

        try {
            
            const response = await Axios.post('http://localhost:4000/admin/updateproduct', data, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
                
              });

            alert("prodect updated succesfully..");
            console.log(data);
            navigate('/admin')

        } catch (error) {
            console.error("Error adding product:", error.message);
        }
        
    };

   

    const fetchprodcut = ()=>{
        let pid = localStorage.getItem('productId')
        Axios.get(`http://localhost:4000/admin/editproduct/${pid}`)
        .then(res => {
            setProductImg(res.data[0].productImg)
            setProductId(res.data[0].productId)
            setProductName(res.data[0].productName)
            setProductPrice(res.data[0].productPrice)

        })
    }

    useEffect(() => {
        fetchprodcut()
    }, [])
    

    return (
        <div >
            <form onSubmit={handleSubmit} encType="multipart/form-data" >
                    ProductImg: <input type="file" onChange={(e) => setProductImg(e.target.files[0])} required /> <br />
                    ProductId :   <input type="text" value={productId} onChange={(e) => setProductId(e.target.value)} />
                    ProductName:    <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
                    ProductPrice:  <input type="number" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />

                    <button type="submit" class="btn btn-gradient-primary mr-2">Submit</button>

                </form>
        </div>
    )
}

export default Adminedit