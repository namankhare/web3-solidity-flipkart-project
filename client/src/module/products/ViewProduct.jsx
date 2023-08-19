/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import apiClient from '../../helper/apiClient'
import ProductCard from '../card/productCard'

export const ViewProduct = ({ products, setProducts }) => {

  const getAllProducts = async () => {
    const res = await apiClient.get(`/seller/getAllItems`);
    setProducts(res.data.products);
    console.log(products);
  }
  useEffect(() => {
    getAllProducts();
  }, [setProducts])

  return (
    <div className="container" >
      <h1>Create or View Products</h1>
      <div className="row g-3">
        {
          products.map((product) => {
            return (
              <ProductCard key={product._id} product={product} />
            )
          })
        }
      </div>
    </div>
  )
}

