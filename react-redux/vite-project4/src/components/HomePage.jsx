import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch  , useSelector} from 'react-redux'
import { AddToCart } from '../store/action'


const HomePage = () => {
  const cartData = useSelector(state => state)
  const [cartCount , setCartCount] = useState(0)
 

  const [productData, setProductData] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()



  const fetchProduct = async () => {
    const response = await axios.get("http://localhost:4000/")
    setProductData(response.data)
    console.log(response.data);
  }

  useEffect(() => {
    fetchProduct()
    setCartCount(cartData.products.length)
  }, [cartData.products.length])

  return (
    <div className='p-2  bg-green-100' >
      <div className='flex justify-between p-4 items-center'>
        <h2 className='text-2xl font-bold uppercase italic'>fashion store 😎.</h2>

        <div className='relative'>
        <button className='text-md font-medium bg-green-300 px-5 py-2 rounded-full'
          onClick={(e) => {
            navigate('/cart')
          }}>See Cart</button>
          <p className='absolute top-[-10px] right-[5%] text-white font-medium text-base bg-red-600  rounded-full w-6 h-6 mt-[-4px] flex items-center justify-center' >{cartCount}</p>
        </div>
      </div>

      <div className='flex gap-10 items-center justify-center p-8 flex-wrap'>
        {productData.map((product, index) => {
          return (
            <div key={index} className='bg-green-300 h-[25vw] w-[15vw] rounded-md overflow-hidden'>
              <img
                src={`/uploads/${product.productImg}`}
                alt={`${product.productName} image`}
                className='h-[75%] object-cover w-full'
                height={100}
                width={100}
              />
              <div className='flex flex-col items-center justify-center p-2'>
                <h3 className='text-md font-medium'> {product.productName}</h3>
                <p> ₹{product.productPrice}</p>
                <button className=' border px-3 py-1 bg-green-200 rounded-full text-sm border-green-500'
                   onClick={() => {
                    dispatch(
                      AddToCart({
                        id: product.productId,
                        productName: product.productName,
                        productPrice: product.productPrice,
                        productImg: product.productImg,
                        productQty: 1
                      })
                    );
                    alert(`${product.productName} has been added to the cart!`);
                  }} >Add To Cart</button>
              </div>

            </div>
          )
        })}
      </div>
    </div>
  )
}

export default HomePage