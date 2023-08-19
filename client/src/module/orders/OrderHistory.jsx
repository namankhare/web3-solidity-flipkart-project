import React, { useState } from "react";
import ladoo from "../../assets/img/laddoo.jpg";

const previousOrdersData = [
  // Previous orders data...
  {
    id: 1,
    productName: "Product A",
    imageSrc: "path-to-image-A.jpg",
    price: 25.99,
    deliveryDate: "2023-08-15",
  },
  {
    id: 2,
    productName: "Product B",
    imageSrc: "path-to-image-B.jpg",
    price: 19.99,
    deliveryDate: "2023-08-12",
  },
  {
    id: 3,
    productName: "Product C",
    imageSrc: "path-to-image-B.jpg",
    price: 19.99,
    deliveryDate: "2023-08-12",
  },
];

const OrderHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredOrders = previousOrdersData.filter((order) =>
    order.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4">
          <div className="form-group">
            <h6>
              <label>Search by Product Name</label>
            </h6>
            <input
              type="text"
              className="form-control"
              placeholder="Enter product name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-8">
          <h6>Previous Orders</h6>
          <table className="table table-striped table-bordered table-hover">
            <thead>
              <tr>
                <th scope="col">Image</th>
                <th scope="col">Product Name</th>
                <th scope="col">Price</th>
                <th scope="col">Delivery Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} scope="row">
                  <td colspan="1">
                    <img
                      src={ladoo}
                      alt={order.productName}
                      width={"90px"}
                      height={"90px"}
                    />
                  </td>
                  <td colspan="1">{order.productName}</td>
                  <td colspan="1">Rs{order.price.toFixed(2)}</td>
                  <td colspan="1">{order.deliveryDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
