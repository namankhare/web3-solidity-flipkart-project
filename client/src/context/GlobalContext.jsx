import { useState, createContext } from 'react'

const userDetail = {
  userid: '',
  username: '',
  email: '',
  name: '',
  address: '',
  city: '',
  pincode: 0,
  state: '',
  phone: 0,
  points: 0,
  OrderHistory: [],
  SoldItemsHistory: [],
  referredBy: '',
  createdAt: '',
  role: null,
}

export const GlobalContext = createContext(null);

// eslint-disable-next-line react/prop-types
const ContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(userDetail);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);


  return (
    <GlobalContext.Provider value={{
      authUser,
      setAuthUser,
      isLoggedIn,
      setIsLoggedIn,
      cart,
      setCart
    }}>
      {children}
    </GlobalContext.Provider>
  )
}

export default ContextProvider