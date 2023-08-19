import React, { useState } from 'react'
import { PopUp } from './PopUp';

export const AddProduct = () => {

  const [isVisiblePop, setVisiblePop] = useState(false);
  

  return (
    <>
      <div className="container my-3 d-flex justify-content-end">
      <button className='btn btn-primary' onClick={()=>{setVisiblePop(true)}}> Add</button>
      
      </div>
    {
      isVisiblePop && (
        <PopUp isVisiblePop = {isVisiblePop} setVisiblePop = {setVisiblePop}/>
      )
    }
    </>
  )
}
