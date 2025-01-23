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
        <div className='d-flex justify-content-center p-5 '>
            <form class="forms-sample  p-4 rounded-3" onSubmit={handleSubmit} encType="multipart/form-data" >
                <h1 className='mb-4'>Edit Product</h1>
                <div class="form-group">
                    <label for="exampleInputName1">ProductImg</label>
                    <br />
                    <input type="file" onChange={(e) => setProductImg(e.target.files[0])} required />
                </div>
                <div class="form-group">
                {/* <label for="exampleInputName1">ProductId</label>   */}
                      <input hidden type="text" class="form-control" id="exampleInputName1" value={productId}
                        onChange={(e) => setProductId(e.target.value)} />
                    </div>

                <div class="form-group">
                    <label for="exampleInputEmail3">ProductName</label>
                    <input type="text" class="form-control" id="exampleInputEmail3" value={productName}
                        onChange={(e) => setProductName(e.target.value)} />
                </div>

                <div class="form-group">
                    <label for="exampleSelectGender">ProductPrice</label>
                    <input type="number" class="form-control" id="exampleInputEmail3" value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)} />
                </div>



                <button type="submit" class="btn btn-gradient-primary mr-2">Submit</button>

            </form>
        </div>
    )
}

export default Adminedit