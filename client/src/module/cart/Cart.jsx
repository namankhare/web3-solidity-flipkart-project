import { useContext, useEffect, useRef, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import apiClient from "../../helper/apiClient";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const Cart = () => {
  const { cart, setCart, setIsCartActive, isCartActive, walletAddress } = useContext(GlobalContext);
  const [loyaltyCoins, setLoyaltyCoins] = useState(0); // Initial loyalty coins balance
  const usePointsRef = useRef(null);
  const navigate = useNavigate();


  const cartStyle = {
    width: '50%',
    position: 'fixed',
    top: 0,
    right: isCartActive ? 0 : '-50%',
    height: '100%',
    backgroundColor: '#fff',
    transition: 'right 0.3s ease-in-out',
    boxShadow: '-2px 0px 10px rgba(0, 0, 0, 0.2)',
    zIndex: 1000,
  };
  const backdropStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: isCartActive ? 'block' : 'none',
    zIndex: 999,
  };

  useEffect(() => {
    if (walletAddress === '') {
      return;
    }
    apiClient.get(`/web3/getuserpoints`, { params: { wallet: walletAddress } })
      .then(({ data }) => {
        setLoyaltyCoins(data.data)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [walletAddress, isCartActive])

  const increaseQuantity = (productId) => {
    const updatedProducts = cart.map((product) =>
      product._id === productId
        ? { ...product, qnt: product.qnt + 1 }
        : product
    );
    setCart(updatedProducts);
  };
  const decreaseQuantity = (productId) => {
    const updatedProducts = cart.map((product) =>
      product._id === productId
        ? { ...product, qnt: product.qnt - 1 }
        : product
    ).filter((product) => product.qnt > 0); // Remove products with quantity <= 0

    setCart(updatedProducts);
  };



  // Calculate the total price and loyalty points
  // const { totalPrice, totalPoints } = cart.reduce(
  //   (acc, product) => {
  //     const productTotal = (product.MRP - product.discount) * product.qnt;
  //     const earnedPoints = (productTotal / 100) * 2;
  //     return {
  //       totalPrice: acc.totalPrice + productTotal,
  //       totalPoints: acc.totalPoints + earnedPoints, // Cap points at 50
  //     };
  //   },
  //   { totalPrice: 0, totalPoints: 0 }
  // );
  const { totalPrice, redeemTotal } = cart.reduce(
    (acc, product) => {
      const productTotal = (product.MRP - product.discount) * product.qnt;
      const redeemTotal = (product.points / 100) * productTotal;
      return {
        totalPrice: acc.totalPrice + productTotal,
        redeemTotal: acc.redeemTotal + redeemTotal
      };
    },
    { totalPrice: 0, redeemTotal: 0 }
  );

  const handleClickOutside = (event) => {
    if (isCartActive && event.target.classList.contains("cart-backdrop")) {
      setIsCartActive(false);
    }
  };

  const handleBuyNow = () => {
    let data = {
      products: cart,
      usePoints: usePointsRef.current.checked,
      wallet: walletAddress
    }
    apiClient.post(`/user/checkout`, data)
      .then(({ data }) => {
        toast.success(data.message);
        navigate('/dashboard');
        setCart([])
        setIsCartActive(false);
      })
      .catch((err) => {
        toast.error("Error")
        setIsCartActive(false);
        console.log(err)
      })
  }


  return (
    <>
      {
        (isCartActive) ?
          <div style={backdropStyle} className="cart-backdrop" onClick={handleClickOutside}>
            <div style={cartStyle}>
              <div className="d-flex justify-content-between align-items-center p-3">
                <h2>Cart</h2>
                <button className="btn btn-outline-danger" onClick={() => { setIsCartActive(false) }}>
                  Close
                </button>
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((product) => {
                    let discountPrice = product.MRP - product.discount;
                    return (
                      <tr key={product._id}>
                        <td>  <img width={"50px"} height={"50px"} src={`${import.meta.env.VITE_BACKEND_IMAGE_URL}/uploads/products/${product.productImage}`} alt="product image" /> {product.name}</td>
                        <td>
                          <button className="btn btn-link" onClick={() => decreaseQuantity(product._id)}>
                            <i className="fas fa-minus"></i>
                          </button>
                          <span className="mx-2">{product.qnt}</span>
                          <button className="btn btn-link" onClick={() => increaseQuantity(product._id)}>
                            <i className="fas fa-plus"></i>
                          </button>
                        </td>
                        <td><span className="text-decoration-line-through text-secondary">${product.MRP * product.qnt}</span> <span className="text-success">${discountPrice * product.qnt}</span></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {/* Display the total */}
              <div className="p-3">
                <strong>Total Price: ${totalPrice.toFixed(2)}</strong>
                <p className="fst-italic">You will get <span className="fw-bold">{Math.min((Math.floor(totalPrice / 100) * 2).toFixed(0), 50)}</span> FlipShop Loyalty points for this order</p>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="" id="usePoints" disabled={(loyaltyCoins > 0) ? false : true} ref={usePointsRef} />
                  <label className="form-check-label" htmlFor="usePoints" >
                    Use <span className="text-success fw-bold">{redeemTotal}</span> out of total {loyaltyCoins} Available Points?
                  </label>
                </div>
                <button className="btn btn-outline-success" onClick={handleBuyNow}>
                  Buy Now
                </button>
              </div>

            </div>
          </div >

          : ''
      }
    </>
  )
};

export default Cart;
