/* eslint-disable react/prop-types */
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
  referredUsers: []
}

export const GlobalContext = createContext(null);

const ContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(userDetail);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);
  const [isCartActive, setIsCartActive] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  return (
    <GlobalContext.Provider value={{
      authUser,
      setAuthUser,
      isLoggedIn,
      setIsLoggedIn,
      cart,
      setCart,
      isWalletConnected,
      setIsWalletConnected,
      walletAddress,
      setWalletAddress,
      isCartActive,
      setIsCartActive
    }}>
      {children}
    </GlobalContext.Provider>
  )
}

export default ContextProvider