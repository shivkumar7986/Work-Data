const initialState={
    userName:"Nitin Chamoli"
}

function Reducer(state=initialState,action){
    switch(action.type){
        case 'REGISTER':
            return{
                ...state,
                userName: action.payload.userName
            };
            
         default:
         return state   
    }
}

export default Reducer;