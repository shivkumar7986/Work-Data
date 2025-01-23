import {createContext, useState} from 'react';

const StoreContext = createContext();

export default StoreContext;

const NavContext = ({children})=>{
    const [nav, setNav] = useState(0);
    
    return (
        <StoreContext.Provider value={{nav, setNav}}>
            {children}
        </StoreContext.Provider>
    )
}

export {NavContext}
