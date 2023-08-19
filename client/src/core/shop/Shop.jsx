import React, { useState } from "react";
import Navbar from "../../module/header/Navbar";
import laddoo from "../../assets/img/laddoo.jpg";
import "../../assets/css/dashboard.css";
import Header from "../../module/header/Header";

// build this first using demo JSON data
const ProductList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Product 1",
      description: "Sweet,made with besan",
      price: 100,
      discount: 10,
      imageUrl: "product1.jpg",
    },
    {
      id: 2,
      name: "Product 2",
      description: "Sweet,made with besan",
      price: 150,
      discount: 20,
      imageUrl: "product2.jpg",
    },
    {
      id: 3,
      name: "Product 3",
      description: "Sweet,made with besan",
      price: 200,
      discount: 15,
      imageUrl: "product3.jpg",
    },
    {
      id: 4,
      name: "Product 4",
      description: "Sweet,made with besan",
      price: 400,
      discount: 25,
      imageUrl: "product4.jpg",
    },
    {
      id: 5,
      name: "Product 5",
      description: "Sweet,made with besan",
      price: 400,
      discount: 25,
      imageUrl: "product5.jpg",
    },
    {
      id: 6,
      name: "Product 6",
      description: "Sweet,made with besan",
      price: 400,
      discount: 25,
      imageUrl: "product6.jpg",
    },
    // ... more products
  ]);
  const [cart, setCart] = useState([]);

  const handleSearch = () => {
    // Implement search functionality
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setProducts(filteredProducts);
  };

  // const handleAddToCart = (productId) => {
  //   // Find the selected product
  //   const selectedProduct = products.find(
  //     (product) => product.id === productId
  //   );

  //   // Check if the product is already in the cart
  //   if (cart.some((item) => item.id === selectedProduct.id)) {
  //     return; // Product is already in the cart
  //   }

  //   setCart([...cart, selectedProduct]);
  // };

  const renderProducts = () => {
    const productsRows = [];
    for (let i = 0; i < products.length; i += 4) {
      const productsInRow = products.slice(i, i + 4);
      productsRows.push(
        <div key={i} className="row mt-4">
          {productsInRow.map((product) => (
            <div key={product.id} className="col-md-3">
              <div className="card mb-3">
                <img
                  src={laddoo}
                  className="card-img-top "
                  alt={product.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">
                    {product.description} <br />
                    Price: ${product.price} <br />
                    Discount: {product.discount}% off
                  </p>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleAddToCart(product.id)}
                  >
                    Add to Cart
                  </button>
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
            {renderProducts()}
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
    </div>
  );
};

export default ProductList;
