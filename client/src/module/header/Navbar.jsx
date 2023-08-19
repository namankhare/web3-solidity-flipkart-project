import { useContext, useEffect } from "react";
import defaultImage from "/vite.svg";
import "../../../src/style.css";
import { GlobalContext } from "../../context/GlobalContext";
import apiClient from "../../helper/apiClient";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const Navbar = () => {
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
            phone: 0
          })
          toast.success(data.message)
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
          phone: 0
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
        setWalletAddress(accounts[0]);
        setIsWalletConnected(true);
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

  function hideMiddleWalletAddress(address) {
    const visibleChars = 4; // Number of characters to keep visible at the beginning and end
    const ellipsis = '...';

    if (address.length <= visibleChars * 2) {
      return address; // Address is too short to hide the middle
    }

    const start = address.slice(0, visibleChars);
    const end = address.slice(-visibleChars);

    return `${start}${ellipsis}${end}`;
  }

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
          <a className="navbar-brand" href="#">
            <img
              src={defaultImage}
              alt=""
              width="30"
              height="24"
              className="d-inline-block align-text-top"
            />
            FlipShop
          </a>
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
                    <a className="dropdown-item" href="#">
                      Profie
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Loyalty Coins
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item px-3">
                <a className="nav-link " aria-current="page" href="#">
                  Become A Seller
                </a>
              </li>
              <li className="nav-item px-3">
                <a className="btn nav-link" onClick={() => { setIsCartActive(!isCartActive) }}>
                  Cart
                </a>
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
