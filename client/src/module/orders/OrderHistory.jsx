/* eslint-disable react/prop-types */
import React, { useState } from "react";
import ladoo from "../../assets/img/laddoo.jpg";
import { useEffect } from "react";
import apiClient from "../../helper/apiClient";

const OrderHistory = ({ authUser }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOrder, setFilterOrder] = useState([])
  useEffect(() => {
    const filteredOrders = authUser.OrderHistory.map((orderHistory) => {
      return orderHistory.filter((order) =>
        order?.productName?.toLowerCase().includes(searchTerm?.toLowerCase())
      );
    });

    setFilterOrder(filteredOrders);
  }, [authUser, searchTerm]);
  useEffect(() => {
    apiClient.get(`/user/getUser`)
      .then(({ data }) => {
        const filteredOrders = data.data.OrderHistory.map((orderHistory) => {
          return orderHistory.filter((order) =>
            order?.productName?.toLowerCase().includes(searchTerm?.toLowerCase())
          );
        });
        setFilterOrder(filteredOrders);
      })
  }, []);


  return (
    <div className="container mt-4">
      <div className="row">
        {
          (filterOrder?.length > 0) ? <div className="col-lg-12">
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
            <div className="">
              <h6 className="pt-3 fw-bold">Previous Orders</h6>
              <table className="table table-striped table-bordered table-hover">
                <thead>
                  <tr>
                    <th scope="col">Product Name</th>
                    <th scope="col">Order ID</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Price</th>
                    <th scope="col">Delivered On</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    filterOrder?.map((orderArray) => {
                      return orderArray?.map((order) => {
                        return (
                          <tr key={order?._id} scope="row">
                            <td colSpan="1"> {order?.productName}</td>
                            <td colSpan="1"> {order?._id}</td>
                            <td colSpan="1">{order?.quantity}</td>
                            <td colSpan="1">${parseFloat(order?.price).toFixed(2)}</td>
                            <td colSpan="1">{new Date(order?.dateOfOrder).toDateString()}</td>
                          </tr>
                        )
                      })
                    })
                  }
                </tbody>
              </table>
            </div>
          </div> : "Nothing to display! Shop today"
        }
      </div>
    </div>
  );
};

export default OrderHistory;
