import React from 'react'
import {Link} from 'react-router-dom'
import laddoo from '../../assets/img/laddoo.jpg'

const ProductCard = () => {

  return (
    <>
      <div className="card col-md-3 mb-3 mx-1" style={{minWidth:"250px"}}>
            <img src={laddoo} className="card-img-top" alt="..."/>
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
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
