/* eslint-disable react/prop-types */
import { useContext, useState } from 'react'
import { GlobalContext } from '../../context/GlobalContext'
import apiClient from '../../helper/apiClient'
import { PopUp } from '../copoun/PopUp'
import copoun from "../../assets/img/redeemRewardPlaceholder.png"

const CopounCard = ({ item, setCopouns, copouns }) => {
  const { authUser } = useContext(GlobalContext);

  const handleDelete = async () => {
    const res = await apiClient.delete(`/partner/deleteItem/${item._id}`);
    let filtered = copouns.filter((p) => {
      return p._id !== item._id;
    })
    setCopouns(filtered);
    // console.log(res);
  }

  const [updatePopup, setUpdatePopup] = useState(false);
  // const [updatePopupClose, setUpdatePopupClose] = useState(false);

  const handleUpdate = async () => {
    setUpdatePopup(true)
  }

  return (
    <>
      <div className="card col-12 col-md-6 col-lg-3 ">
        <img src={copoun} className="card-img-top mt-3 ratio ratio-1x1" alt="Copoun" style={{ "aspectRatio": "1/1" }} />
        <div className="card-body">
          <h5 className="card-title">{item.reward_name}</h5>
          <p className="card-text">Get {item.discount_percentage}% off</p>
          <p className="card-text">{item.description}</p>
          <p className="card-text"><s><b>FLT required: </b>${item.loyalty_coins_required}</s></p>
          <p className="card-text"><b>Valid Till: </b>{new Date(item.details.valid_until).toDateString()}</p>
          <p className="card-text"><b>Disclaimer: </b>{item.details.applicable_on}</p>
          <div className="d-flex justify-content-between">
            <button className='btn btn-primary' onClick={handleDelete}>Delete</button>
            <button className='btn btn-primary' onClick={handleUpdate}>Update</button>
          </div>
        </div>
      </div>
      {
        updatePopup && (<PopUp isVisiblePop={updatePopup} setVisiblePop={setUpdatePopup} copouns={copouns} setCopouns={setCopouns} type={item._id} />)
      }
    </>
  )
}

export default CopounCard
