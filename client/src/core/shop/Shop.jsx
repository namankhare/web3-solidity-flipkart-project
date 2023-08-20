import { useContext, useEffect, useState } from "react";
import Navbar from "../../module/header/Navbar";
import Footer from "../../module/footer/Footer";
import "../../assets/css/dashboard.css";
import Header from "../../module/header/Header";
import apiClient from "../../helper/apiClient";
import { GlobalContext } from "../../context/GlobalContext";

// build this first using demo JSON data
const ProductList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  // const [products, setProducts] = useState([
  //   {
  //     id: 1,
  //     name: "Product 1",
  //     description: "Sweet,made with besan",
  //     price: 100,
  //     discount: 10,
  //     imageUrl: "product1.jpg",
  //   },
  //   {
  //     id: 2,
  //     name: "Product 2",
  //     description: "Sweet,made with besan",
  //     price: 150,
  //     discount: 20,
  //     imageUrl: "product2.jpg",
  //   },
  //   {
  //     id: 3,
  //     name: "Product 3",
  //     description: "Sweet,made with besan",
  //     price: 200,
  //     discount: 15,
  //     imageUrl: "product3.jpg",
  //   },
  //   {
  //     id: 4,
  //     name: "Product 4",
  //     description: "Sweet,made with besan",
  //     price: 400,
  //     discount: 25,
  //     imageUrl: "product4.jpg",
  //   },
  //   {
  //     id: 5,
  //     name: "Product 5",
  //     description: "Sweet,made with besan",
  //     price: 400,
  //     discount: 25,
  //     imageUrl: "product5.jpg",
  //   },
  //   {
  //     id: 6,
  //     name: "Product 6",
  //     description: "Sweet,made with besan",
  //     price: 400,
  //     discount: 25,
  //     imageUrl: "product6.jpg",
  //   },
  //   // ... more products
  // ]);
  const [products, setProducts] = useState([]);
  const [searchProducts, setSearchProducts] = useState([])
  const { cart, setCart } = useContext(GlobalContext);


  useEffect(() => {
    apiClient.get(`/user/viewProducts`)
      .then(({ data }) => {
        setProducts(data.data);
        setSearchProducts(data.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])


  const handleSearch = () => {
    // Implement search functionality
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchProducts(filteredProducts);
  };

  const handleAddToCart = (productId) => {

    // Find the selected product
    const selectedProduct = products.find(
      (product) => product._id === productId
    );

    // Check if the product is already in the cart
    if (cart.some((item) => item._id === selectedProduct._id)) {
      return; // Product is already in the cart
    }
    selectedProduct.qnt = 1
    setCart([...cart, selectedProduct]);

  };
  const handleRemoveFromCart = (productId) => {

    const updatedCart = cart.filter((item) => item._id !== productId);
    setCart(updatedCart);

  };

  const RenderProducts = () => {
    const productsRows = [];
    for (let i = 0; i < searchProducts.length; i += 4) {
      const productsInRow = searchProducts.slice(i, i + 4);
      productsRows.push(
        <div key={i} className="row mt-4">
          {productsInRow.map((product) => (
            <div key={product._id} className="col-md-3">
              <div className="card mb-3">
                <img
                  src={`${import.meta.env.VITE_BACKEND_IMAGE_URL}/uploads/products/${product.productImage}`}
                  className="card-img-top ratio ratio-1x1"
                  style={{ "aspectRatio": "1/1" }}
                  alt={product.name}
                />
                <div className="card-body">
                  <h4 className="card-title fw-bolder">{product.name}</h4>
                  <p className="card-text">
                    {product.description} <br />
                    Price: <s>${product.MRP}</s> <b>${product.MRP - product.discount}</b><br />
                    Discount: FLAT ${product.discount} off
                  </p>

                  {
                    // Check if the product is already in the cart
                    (cart.some((item) => item._id === product._id)) ?
                      <button
                        className="btn btn-danger"
                        onClick={() => handleRemoveFromCart(product._id)}
                      >
                        Remove from Cart
                      </button>
                      : <button
                        className="btn btn-primary"
                        onClick={() => handleAddToCart(product._id)}
                      >
                        Add to Cart
                      </button>
                  }

                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
    return productsRows;
  };

  return (
    <div>
      <Header />
      <Navbar />
      <div className="container mt-5 ">
        <div className="row mt-4">
          <div className="col-lg-12 col-md-12 col-12">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search by product name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyUp={handleSearch}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-warning"
                  type="button"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            </div>
            <RenderProducts />
          </div>
          {/* <div className="col-lg-12  mt-3">
            <h4>Cart</h4>
            <ul className="list-group">
              {cart.map((item) => (
                <li key={item.id} className="list-group-item">
                  {item.name} - ${item.price}
                </li>
              ))}
            </ul>
          </div> */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductList;
