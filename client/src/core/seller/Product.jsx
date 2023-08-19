import { useState } from "react";
import { AddProduct } from "../../module/products/AddProduct";
import { ViewProduct } from "../../module/products/ViewProduct";
import Navbar from "../../module/header/Navbar";
import Header from "../../module/header/Header";

const Product = () => {
  const [products, setProducts] = useState([]);

  return (
    <>
      <Header />
      <Navbar />
      <AddProduct products={products} setProducts={setProducts} />
      <ViewProduct products={products} setProducts={setProducts} />

    </>
  );
};

export default Product;
