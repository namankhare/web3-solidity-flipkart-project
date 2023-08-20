/* eslint-disable react/prop-types */
import styled from "styled-components";
import apiClient from '../../helper/apiClient';

const Container = styled.div`
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  background-color: #000000c4;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  position: fixed;
`;
const Wrapper = styled.div`
  width: 40%;
  background-color: white;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  position: relative;
  z-index: 4;
  border-radius: 0.5rem;
  min-width: 355px;
`;

const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

export const PopUp = ({ isVisiblePop, setVisiblePop, copouns, setCopouns, type }) => {
  let item;
  if (type !== "add") {
    item = copouns.find((p) => {

      return p._id === type
    })
  }
  // console.log(item);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      let formRawData = {
        reward_name: e.target[0].value,
        discount_percentage: e.target[1].value,
        details: {
          "valid_until": e.target[2].value,
          "applicable_on": e.target[3].value,
        },
        description: e.target[4].value,
        loyalty_coins_required: e.target[5].value,
      }

      const { data } = await apiClient.post(`${import.meta.env.VITE_BACKEND_URL}/partner/createProducts`, formRawData)
      console.log(data);
      setCopouns([...copouns, data.product])


    } catch (error) {
      console.log(error);
    }
    setVisiblePop(false);
  }
  const addOrUpdate = async (e) => {
    if (type === "add") { submitHandler(e) }
    else {
      e.preventDefault();
      try {

        let formRawData = {
          reward_name: e.target[0].value,
          discount_percentage: e.target[1].value,
          details: {
            "valid_until": e.target[2].value,
            "applicable_on": e.target[3].value,
          },
          description: e.target[4].value,
          loyalty_coins_required: e.target[5].value,
        }


        const { data } = await apiClient.put(`/partner/updateItem/${type}`, formRawData)
        let filteredProducts = copouns.filter((p) => {
          return p._id !== type
        })
        filteredProducts.push(data.product)
        setCopouns(filteredProducts)
        console.log(filteredProducts);

      } catch (error) {
        console.log(error.response.data);
      }
      setVisiblePop(false)
    }
  }
  return (
    <Container>
      <Wrapper>
        <form onSubmit={addOrUpdate}>
          <div className="mb-1">
            <label className="form-label">Copoun Name</label>
            <input type="text" className="form-control" defaultValue={item?.reward_name} />
          </div>
          <div className="mb-1">
            <label className="form-label">Copoun discount</label>
            <input type="number" className="form-control" defaultValue={item?.discount_percentage} />
          </div>
          <div className="mb-1">
            <label className="form-label">Valid Till</label>
            <input type="date" className="form-control" defaultValue={type !== "add" && new Date(item?.details?.valid_until)?.toISOString().substring(0, 10)} />
          </div>
          <div className="mb-1">
            <label className="form-label">Applicable On</label>
            <input type="text" className="form-control" defaultValue={item?.details.applicable_on} />
          </div>
          <div className="mb-1">
            <label className="form-label">Product Description</label>
            <input type="text" className="form-control" defaultValue={item?.description} />
          </div>
          <div className="mb-1">
            <label className="form-label">FLT needed</label>
            <input type="number" className="form-control" defaultValue={item?.loyalty_coins_required} />
          </div>


          <button type="submit" className="btn btn-primary mt-2">Submit</button>
        </form>
        <Close onClick={() => { setVisiblePop(false) }}>
          X
        </Close>
      </Wrapper>
    </Container>


  )
}
