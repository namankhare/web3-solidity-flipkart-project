/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import apiClient from '../../helper/apiClient'
import CopounCard from '../card/CopounCard'

export const ViewCopoun = ({ copouns, setCopouns }) => {

  const getAllProducts = async () => {
    const res = await apiClient.get(`/partner/getItem`);
    setCopouns(res.data.data);
    console.log(res.data.data);
  }
  useEffect(() => {
    getAllProducts();
  }, [])

  return (
    <div className="container" >
      <h1>Create or View Copoun</h1>
      <div className="row g-3">
        {
          copouns.map((item) => {
            return (
              <CopounCard key={item._id} item={item} copouns={copouns} setCopouns={setCopouns} />
            )
          })
        }
      </div>
    </div>
  )
}

