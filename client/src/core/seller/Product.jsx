import React from "react";
import { AddProduct } from "../../module/products/AddProduct";
import { DeleteProduct } from "../../module/products/DeleteProduct";
import { ViewProduct } from "../../module/products/ViewProduct";
import Navbar from "../../module/header/Navbar";
import Header from "../../module/header/Header";

const Product = () => {
  return (
    <>
    <Header/>
      <Navbar/>
      <AddProduct/>
      {/* <DeleteProduct/> */}
      <ViewProduct/>
    </>
  );
};

export default Product;
