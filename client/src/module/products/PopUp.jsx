/* eslint-disable react/prop-types */
import styled from "styled-components";
import apiClient from '../../helper/apiClient';

const Container = styled.div`
  width: 100%;
  height: 100%;
  top: 0px;
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

export const PopUp = ({ isVisiblePop, setVisiblePop, products, setProducts }) => {
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await apiClient.post(`${import.meta.env.VITE_BACKEND_URL}/seller/createProducts`, {
        name: e.target[0].value,
        MRP: e.target[1].value,
        discount: e.target[2].value,
        SKU: e.target[3].value,
        points: e.target[4].value,
        description: e.target[5].value,
      })
      console.log(data.product);
      setProducts([...products, data.product])


    } catch (error) {
      console.log(error.response.data);
    }
    setVisiblePop(false);
  }
  return (
    <Container>
      <Wrapper>
        <form onSubmit={submitHandler}>
          <div className="mb-1">
            <label className="form-label">Product Name</label>
            <input type="text" className="form-control" required />
          </div>
          <div className="mb-1">
            <label className="form-label">Product MRP</label>
            <input type="number" className="form-control" required />
          </div>
          <div className="mb-1">
            <label className="form-label">Discount provided</label>
            <input type="number" className="form-control" required />
          </div>
          <div className="mb-1">
            <label className="form-label">Product SKU</label>
            <input type="number" className="form-control" required />
          </div>
          <div className="mb-1">
            <label className="form-label">FLT discount</label>
            <input type="number" className="form-control" required />
          </div>
          <div className="mb-1">
            <label className="form-label">Product Description</label>
            <input type="text" className="form-control" required />
          </div>
          <div className="mb-1">
            <label className="form-label">Product Image</label>
            <input type="file" accept="image/*" className="form-control" />
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
