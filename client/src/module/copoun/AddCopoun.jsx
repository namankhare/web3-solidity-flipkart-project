import { useState } from 'react'
import { PopUp } from './PopUp';

// eslint-disable-next-line react/prop-types
export const AddCopoun = ({ copouns, setCopouns }) => {

  const [isVisiblePop, setVisiblePop] = useState(false);
  return (
    <>
      <div className="container my-3 d-flex justify-content-end">
        <button className='btn btn-primary' onClick={() => { setVisiblePop(true) }}> Add</button>

      </div>
      {
        isVisiblePop && (
          <PopUp isVisiblePop={isVisiblePop} setVisiblePop={setVisiblePop} copouns={copouns} setCopouns={setCopouns} type={"add"} />
        )
      }
    </>
  )
}