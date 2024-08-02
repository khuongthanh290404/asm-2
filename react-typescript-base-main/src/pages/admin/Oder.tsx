import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Cart } from "./../../interfaces/Cart";

interface Order {
  id: number;
  items: Cart[];
  date: string;
  customerInfo: {
    name: string;
    address: string;
    phone: string;
    email: string;
  };
  status: string; // Trạng thái đơn hàng
}

const AdminOrderPage = () => {
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);

  useEffect(() => {
    const updateOrderHistory = () => {
      const savedOrderHistory = localStorage.getItem("orderHistory");
      if (savedOrderHistory) {
        setOrderHistory(JSON.parse(savedOrderHistory));
      }
    };

    window.addEventListener("storage", updateOrderHistory);
    updateOrderHistory();

    return () => {
      window.removeEventListener("storage", updateOrderHistory);
    };
  }, []);

  const updateOrderStatus = (orderId: number, newStatus: string) => {
    const updatedOrderHistory = orderHistory.map((order) => {
      if (order.id === orderId) {
        return { ...order, status: newStatus };
      }
      return order;
    });

    setOrderHistory(updatedOrderHistory);
    localStorage.setItem("orderHistory", JSON.stringify(updatedOrderHistory));
    toast.success("Order status updated successfully");

    // Gửi thông báo cho các tab khác về sự thay đổi
    window.dispatchEvent(new Event("storage"));
  };

  const deleteOrder = (orderId: number) => {
    const updatedOrderHistory = orderHistory.filter(
      (order) => order.id !== orderId
    );

    setOrderHistory(updatedOrderHistory);
    localStorage.setItem("orderHistory", JSON.stringify(updatedOrderHistory));
    toast.success("Order deleted successfully");

    // Gửi thông báo cho các tab khác về sự thay đổi
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="container">
      <h2>Admin Order Management</h2>
      {orderHistory.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div>
          {orderHistory.map((order) => (
            <div key={order.id} className="order mb-4">
              <h3>Order ID: {order.id}</h3>
              <p>Date: {order.date}</p>
              <h4>Customer Information</h4>
              <p>Name: {order.customerInfo.name}</p>
              <p>Address: {order.customerInfo.address}</p>
              <p>Phone: {order.customerInfo.phone}</p>
              <p>Email: {order.customerInfo.email}</p>
              <p>Status: {order.status}</p>
              <select
                value={order.status}
                onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                className="form-control mb-2"
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <button
                className="btn btn-danger mb-2"
                onClick={() => deleteOrder(order.id)}
              >
                Delete Order
              </button>
              <table className="table mt-2 mb-2 table-bordered">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Image</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item) => (
                    <tr key={item.id}>
                      <td>{item.title}</td>
                      <td>
                        <img
                          width={100}
                          src={item.thumbnail}
                          alt={item.title}
                        />
                      </td>
                      <td>{item.quantity}</td>
                      <td>{item.price}</td>
                      <td>{item.price * item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrderPage;
