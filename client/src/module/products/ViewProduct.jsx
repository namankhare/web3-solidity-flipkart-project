import React, { useEffect, useState } from 'react'
import apiClient from '../../helper/apiClient'
import ProductCard from '../card/productCard'

export const ViewProduct = () => {

  const [products, setProducts] = useState([]);
  const getAllProducts = async() =>{
    const res = await apiClient.get(`/seller/getAllItems`);
    setProducts(res.data.products);
    console.log(products);
  }
  useEffect(() => {
    getAllProducts();
  },[])

  return (
    <div className="container " >
      <div className="row " >
        {
          products.map((product) => {
            return(
              <ProductCard key={product.id} product={product}/>
            )
          })
        }
      </div>
    </div>
  )
}

