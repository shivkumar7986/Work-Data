import {createStore} from 'redux'


const reducer = (state = 10 , action)=>{
    switch(action.type){
        case 'INCREMENT' : return state + 5;
        case 'DECREMENT' : return state - 5;
        default: return state;
    }
}


 const store = createStore(reducer);

 export default store