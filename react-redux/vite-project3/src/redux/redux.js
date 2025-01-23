import {createStore} from 'redux'    

const initialState = {
    count: 10,
    
}

export const reducer = (state = initialState , action)=>{
    switch(action.type){
        case 'INCREMENT' :
            return{
                ...state ,
                count : state.count + action.payload
            };
        case 'DECREMENT' :
            return{
                ...state,
                count : state.count - action.payload
            };
            
        default: return state  
    };
};


const store = createStore(reducer);

export default store