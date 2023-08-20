/* eslint-disable react/prop-types */
import { useContext, useState } from 'react'
import { GlobalContext } from '../../context/GlobalContext'
import apiClient from '../../helper/apiClient'
import { PopUp } from '../products/PopUp'

const ProductCard = ({ item, setProducts, products }) => {
  const { authUser } = useContext(GlobalContext);

  const handleDelete = async () => {
    const res = await apiClient.delete(`/seller/deleteItem/${item._id}`);
    let filtered = products.filter((p) => {
      return p._id !== item._id;
    })
    setProducts(filtered);
    // console.log(res);
  }

  const [updatePopup, setUpdatePopup] = useState(false);
  // const [updatePopupClose, setUpdatePopupClose] = useState(false);

  const handleUpdate = async () => {
    setUpdatePopup(true)
  }

  let currentPrice = item.MRP - item.discount;
  let discountFinal = currentPrice - ((item.points / 100) * currentPrice);
  return (
    <>
      <div className="card col-12 col-md-6 col-lg-3 ">
        <img src={`${import.meta.env.VITE_BACKEND_IMAGE_URL}/uploads/products/${item.productImage}`} className="card-img-top mt-3 ratio ratio-1x1" alt={item.productImage} style={{ "aspectRatio": "1/1" }} />
        <div className="card-body">
          <h5 className="card-title">{authUser.name}</h5>
          <p className="card-text">{item.name}</p>
          <p className="card-text">{item.description}</p>
          <p className="card-text"><s><b>MRP: </b>${item.MRP}</s></p>
          <p className="card-text"><b>Current Price: </b>{currentPrice}</p>
          <p className="card-text"><b>FLT can be used to further lower the price: </b>{currentPrice}-{item.points}% = {discountFinal}</p>
          <p className="card-text"><b>In Stock: </b>{item.SKU}</p>
          <div className="d-flex justify-content-between">
            <button className='btn btn-primary' onClick={handleDelete}>Delete</button>
            <button className='btn btn-primary' onClick={handleUpdate}>Update</button>
          </div>
        </div>
      </div>
      {
        updatePopup && (<PopUp isVisiblePop={updatePopup} setVisiblePop={setUpdatePopup} products={products} setProducts={setProducts} type={item._id} />)
      }
    </>
  )
}

export default ProductCard
