import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import RegisterAction from '../action/action'


const chageState = () => {
    const [myState, setmyState] = useState({
        userName:'kal'
    })
    const navigate = useNavigate();

    const storeData = useSelector(state => state);

    const dispatch = useDispatch();
    return (
        <div>
            <h1>Welcome "{storeData.userName}" </h1>

            <div style={{ display: 'flex', gap: '3vw' }}>

                <button 
                onClick={(e)=>{
                setmyState({userName:'Mandeep Tyagi'})
                // console.log({userName:'Mandeep Tyagi'});
                }}>changeState</button>

                <button 
                onClick={(e)=>{
                dispatch(RegisterAction(myState))    
                }}>changeStateOfStore</button>

                <button
                onClick={() => {
                navigate('/')
                }}>FirstPage
                </button>
                <button
                onClick={() => {
                navigate('/second')
                }}>secondpage
                </button>
            </div>

        </div>
    )
}

export default chageState