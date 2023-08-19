import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";


const Cart = () => {
  const { cart, setCart, setIsCartActive, isCartActive } = useContext(GlobalContext);
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

  const increaseQuantity = (productId) => {
    const updatedProducts = cart.map((product) =>
      product._id === productId
        ? { ...product, quantity: product.quantity + 1 }
        : product
    );
    setCart(updatedProducts);
  };
  const decreaseQuantity = (productId) => {
    const updatedProducts = cart.map((product) =>
      product._id === productId
        ? { ...product, quantity: product.quantity - 1 }
        : product
    ).filter((product) => product.quantity > 0); // Remove products with quantity <= 0

    setCart(updatedProducts);
  };



  // Calculate the total price and loyalty points
  // const { totalPrice, totalPoints } = cart.reduce(
  //   (acc, product) => {
  //     const productTotal = (product.MRP - product.discount) * product.quantity;
  //     const earnedPoints = (productTotal / 100) * 2;
  //     return {
  //       totalPrice: acc.totalPrice + productTotal,
  //       totalPoints: acc.totalPoints + earnedPoints, // Cap points at 50
  //     };
  //   },
  //   { totalPrice: 0, totalPoints: 0 }
  // );
  const { totalPrice } = cart.reduce(
    (acc, product) => {
      const productTotal = (product.MRP - product.discount) * product.quantity;
      return {
        totalPrice: acc.totalPrice + productTotal,
      };
    },
    { totalPrice: 0 }
  );



  return (
    <>
      {
        (isCartActive) ?
          <div style={backdropStyle}>
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
                        <div>
                          <td>  <img width={"20px"} height={"20px"} src={product.productImage} alt="product image" /> {product.name}</td>
                        </div>
                        <td>
                          <button className="btn btn-link" onClick={() => decreaseQuantity(product._id)}>
                            <i className="fas fa-minus"></i>
                          </button>
                          <span className="mx-2">{product.quantity}</span>
                          <button className="btn btn-link" onClick={() => increaseQuantity(product._id)}>
                            <i className="fas fa-plus"></i>
                          </button>
                        </td>
                        <td><span className="text-decoration-line-through text-secondary">${product.MRP * product.quantity}</span> <span className="text-success">${discountPrice * product.quantity}</span></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {/* Display the total */}
              <div className="p-3">
                <strong>Total Price: ${totalPrice.toFixed(2)}</strong>
                <p className="fst-italic">You will get <span className="fw-bold">{Math.min((Math.floor(totalPrice / 100) * 2).toFixed(0), 50)}</span> Flipkart Loyalty points for this order</p>
                <button className="btn btn-outline-success" onClick={() => { setIsCartActive(false) }}>
                  Buy Now
                </button>
              </div>

            </div>
          </div>

          : ''
      }
    </>
  )
};

export default Cart;
