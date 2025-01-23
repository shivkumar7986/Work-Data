import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RemoveProduct  , IncrementQty , DecrementQty} from '../store/action'
import { useNavigate } from 'react-router-dom'

const CartPage = () => {
  const productData = useSelector(state => state)
  const [data, setData] = useState([])
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const grossPrice = data.reduce((total, product) => total + product.productPrice * product.productQty , 0)




  useEffect(() => {
    setData(productData.products)
    console.log(productData.products);

  }, [productData.products])

  return (
    <div>
      <div>
        <h1 className='text-2xl font-bold  mb-10 p-2'>Welcome to cart page.</h1>
        <button className='px-3 py-2 bg-green-300 rounded-full'
          onClick={() => {
            navigate('/')
          }}>HomePage</button>
      </div>

      <div className='flex justify-start gap-10 items-center p-8'>
        {Array.isArray(data) && data.length > 0 ? (
          data.map((product, index) => {
            return (
              <div key={index} className="bg-green-300 h-[25vw] w-[15vw] rounded-md overflow-hidden">
                <img
                  src={`/uploads/${product.productImg}`}
                  alt={`${product.productName} image`}
                  className="h-[75%] object-cover w-full"
                  height={100}
                  width={100}
                />
                <div className="flex flex-col items-center justify-center p-2 ">
                  <h3 className="text-md font-medium"> {product.productName}</h3>
                  <p> ₹{product.productPrice}</p>
                  <button
                    className="border px-3 py-1 bg-red-200 rounded-full text-sm border-red-500"
                    onClick={() => {
                      dispatch(
                        RemoveProduct(product.id)
                      )
                      setData((prevData) => prevData.filter((item) => item.productId !== product.productId));
                    }
                    }
                  >
                    Remove Product
                  </button>
                  <div className='flex items-center justify-evenly w-full'>
                    <button className='text-2xl font-medium text-green-800' 
                    onClick={()=> {
                      dispatch(DecrementQty(product.id))
                    }}>-</button>
                    {product.productQty}
                    <button className=' text-2xl font-medium text-green-800'
                    onClick={()=> {
                      dispatch(IncrementQty(product.id))
                    }}>+</button>
                  </div>

                </div>


              </div>

            );
          })
        ) : (
          <div className="text-center text-red-500">No products available.</div>
        )}
      </div>

      <div>
        <h1> Gross Price: {grossPrice}</h1>
      </div>


    </div>
  )
}

export default CartPage