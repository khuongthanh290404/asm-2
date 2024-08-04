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
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);

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

  const toggleOrderDetails = (orderId: number) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  return (
    <div className="container">
      <h2>Admin Order Management</h2>
      {orderHistory.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Customer Name</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {orderHistory.map((order) => (
              <React.Fragment key={order.id}>
                <tr>
                  <td>{order.id}</td>
                  <td>{order.date}</td>
                  <td>{order.customerInfo.name}</td>
                  <td>{order.customerInfo.address}</td>
                  <td>{order.customerInfo.phone}</td>
                  <td>{order.customerInfo.email}</td>
                  <td>
                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateOrderStatus(order.id, e.target.value)
                      }
                      className="form-control"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteOrder(order.id)}
                    >
                      Delete Order
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-info"
                      onClick={() => toggleOrderDetails(order.id)}
                    >
                      {expandedOrderId === order.id
                        ? "Hide Details"
                        : "Show Details"}
                    </button>
                  </td>
                </tr>
                {expandedOrderId === order.id && (
                  <tr>
                    <td colSpan={9}>
                      <table className="table table-bordered">
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
                                  width={50}
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
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminOrderPage;
