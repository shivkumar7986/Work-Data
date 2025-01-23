import React from 'react'
import {useSelector} from 'react-redux'

const page1 = () => {
    const storeData = useSelector(state => state)
  return (
    <div>
        <h1>Welcome to First page , "Mr.{storeData.userName}" </h1>
    </div>
  )
}

export default page1