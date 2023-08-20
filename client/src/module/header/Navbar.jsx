import { useContext, useEffect } from "react";
import defaultImage from "/vite.svg";
import "../../../src/style.css";
import { GlobalContext } from "../../context/GlobalContext";
import apiClient from "../../helper/apiClient";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { hideMiddleWalletAddress } from "../../helper/helpFunc";

const Navbar = () => {
  let navigate = useNavigate()
  const { isLoggedIn, authUser, setAuthUser, setIsLoggedIn, isWalletConnected, walletAddress, setWalletAddress, setIsWalletConnected, setIsCartActive, isCartActive } = useContext(GlobalContext);
  const signOut = () => {
    apiClient.get(`/auth/signout`)
      .then(({ data }) => {
        if (data.status === "success") {
          localStorage.removeItem("token")
          localStorage.removeItem("refreshtoken")
          setIsLoggedIn(false)
          setIsWalletConnected(false);
          setWalletAddress('')
          disconnectMetamask()
          setAuthUser({
            userid: '',
            username: '',
            name: '',
            role: '',
            email: '',
            phone: 0,
            referredUsers: [],
            OrderHistory: []
          })
          toast.success(data.message)
          navigate('/')
        }
      })
      .catch((err) => {
        localStorage.removeItem("token")
        localStorage.removeItem("refreshtoken")
        setWalletAddress('')
        setIsLoggedIn(false)
        setIsWalletConnected(false);
        setAuthUser({
          userid: '',
          username: '',
          name: '',
          role: '',
          email: '',
          phone: 0,
          referredUsers: [],
          OrderHistory: []
        })
        toast.success("Successfully Logged Out")
        console.log(err);
      })
  }
  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum && isLoggedIn) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
            setIsWalletConnected(true);
          }
        } catch (error) {
          console.error('Error checking Metamask connection:', error);
        }
      }
    };
    checkConnection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);
  const connectToMetamask = async () => {
    try {
      if (window.ethereum && isLoggedIn) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        apiClient.post(`/user/addandgetwalletaddress`, { walletAddress: accounts[0] })
          .then(({ data }) => {
            setWalletAddress(data.data);
            setIsWalletConnected(true);
            toast.success(data.message)
          })
          .catch((err) => {
            toast.success("oops! error")
            console.log(err)
          })
      } else {
        console.log(); ('Metamask not found');
      }
    } catch (error) {
      setWalletAddress('');
      setIsWalletConnected(false);
      console.log(); (`Error connecting to Metamask: ${error.message}`);
    }
  };

  const disconnectMetamask = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: "eth_requestAccounts",
          params: [
            {
              eth_accounts: {}
            }
          ]
        });
        console.log('Metamask disconnected');
        setWalletAddress('');
        setIsWalletConnected(false);
      } catch (error) {
        console.error('Error disconnecting Metamask:', error);
      }
    } else {
      console.error('Metamask not found');
    }
  };



  const Wallet = () => {
    if (isWalletConnected) {
      return (
        <div className="d-flex">
          <button className="dropdown-item text-dark pb-3"><p className="text-nowrap">Connected Wallet:</p> <span className="p-2 text-white bg-primary rounded-pill">{hideMiddleWalletAddress(walletAddress)}</span></button>
        </div>
      )
    } else {
      return (
        <button className="dropdown-item" onClick={connectToMetamask}>Connect Wallet</button>
      )
    }

  }

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-light px-5 py-2"
        style={{ background: "#2874f0" }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to={'/'}>
            <img
              src={defaultImage}
              alt=""
              width="30"
              height="24"
              className="d-inline-block align-text-top"
            />
            FlipShop
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse "
            id="navbarSupportedContent "
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ml-auto">
              <li className="nav-item dropdown px-3">
                <a
                  className="nav-link active dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  My Account
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link className="dropdown-item" to="/dashboard">
                      View Profie
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/rewards">
                      Manage Loyalty Coins
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/flpzone">
                      Flipshop Loyalty Zone
                    </Link>
                  </li>
                </ul>
              </li>
              {
                authUser && authUser?.role > 0 &&
                <>
                  <li className="nav-item px-3">
                    <Link className="nav-link " aria-current="page" to="/product">
                      Seller Dashboard
                    </Link>
                  </li>
                  <li className="nav-item px-3">
                    <Link className="nav-link " aria-current="page" to="/partner">
                      Partner Dashboard
                    </Link>
                  </li>
                </>
              }
              <li className="nav-item px-3">
                <a className="btn nav-link" onClick={() => { setIsCartActive(!isCartActive) }}>
                  Cart
                </a>
              </li>
              <li className="nav-item px-3">
                <Link className="btn nav-link" to="/guidelines">
                  Guidelines
                </Link>
              </li>
            </ul>
            {
              (isLoggedIn) ?
                <div className="dropdown">
                  <a className="btn btn-outline-primary dropdown-toggle text-white" data-bs-toggle="dropdown" aria-expanded="false">
                    {authUser.name}
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end text-center border">
                    <li><p className="dropdown-item disabled">{authUser.username}</p></li>
                    <hr />
                    <li><Wallet /></li>
                    <li><button className="dropdown-item" onClick={signOut}>Signout</button></li>
                  </ul>
                </div>
                :
                <form className="d-flex" role="login">
                  <Link className="text-white text-decoration-none" to="/login">Login</Link>
                </form>
            }
          </div>
        </div>
      </nav>
    </div>
  );
};
export default Navbar;
