import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import laddoo from '../../assets/img/laddoo.jpg'
import { GlobalContext } from '../../context/GlobalContext'

const ProductCard = ({product}) => {
  const { authUser } = useContext(GlobalContext)
  console.log(authUser);
  return (
    <>
      <div className="card col-md-3 mb-3 mx-1" style={{minWidth:"250px"}}>
            <img src={laddoo} className="card-img-top mt-3" alt="..."/>
            <div className="card-body">
              <h5 className="card-title">{authUser.name}</h5>
              <p className="card-text">{product.name}</p>
              <p className="card-text">{product.description}</p>
              <p className="card-text">{product.MRP}</p>
              <p className="card-text">{product.discount}</p>
              <p className="card-text">{product.points}</p>
              <p className="card-text">{product.SKU}</p>
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
