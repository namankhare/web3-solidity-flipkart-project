import React from "react";
import { AddProduct } from "../../module/products/AddProduct";
import { DeleteProduct } from "../../module/products/DeleteProduct";
import { ViewProduct } from "../../module/products/ViewProduct";

const Product = () => {
  return (
    <>
      <div>Product</div>
      <AddProduct/>
      <DeleteProduct/>
      <ViewProduct/>
    </>
  );
};

export default Product;
