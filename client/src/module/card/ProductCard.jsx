import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import laddoo from '../../assets/img/laddoo.jpg'
import { GlobalContext } from '../../context/GlobalContext'

const ProductCard = ({product}) => {
  const { authUser } = useContext(GlobalContext)
  return (
    <>
      <div className="card col-12 col-md-6 col-lg-3 ">
            <img src={laddoo} className="card-img-top mt-3" alt="..."/>
            <div className="card-body">
              <h5 className="card-title">{authUser.name}</h5>
              <p className="card-text">{product.name}</p>
              <p className="card-text">{product.description}</p>
              <p className="card-text"><s><b>MRP: </b>Rs.{product.MRP}</s></p>
              <p className="card-text"><b>Current Price: </b>{product.MRP - product.discount}</p>
              <p className="card-text"><b>FLT can be used to further lower the price: </b>{product.MRP - product.discount}-{product.points} = {product.MRP - product.discount- product.points}</p>
              <p className="card-text"><b>In Stock: </b>{product.SKU}</p>
              <div className="d-flex justify-content-between">
              <button className='btn btn-primary'>Delete</button>
              <button className='btn btn-primary'>Update</button>
              </div>
            </div>
        </div>
    
    </>
  )
}

export default ProductCard
