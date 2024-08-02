import { useState, useEffect } from "react";
import { Cart } from "../interfaces/Cart";
import { toast } from "react-toastify";

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

const OrderHistoryPage = () => {
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);
  const [customerEmail, setCustomerEmail] = useState<string>("");

  useEffect(() => {
    const savedOrderHistory = localStorage.getItem("orderHistory");
    if (savedOrderHistory) {
      setOrderHistory(JSON.parse(savedOrderHistory));
    }

    const handleStorageChange = () => {
      const updatedOrderHistory = localStorage.getItem("orderHistory");
      if (updatedOrderHistory) {
        setOrderHistory(JSON.parse(updatedOrderHistory));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerEmail(e.target.value);
  };

  const filteredOrderHistory = orderHistory.filter(
    (order) => order.customerInfo.email === customerEmail
  );

  const confirmReceipt = (orderId: number) => {
    const updatedOrderHistory = orderHistory.map((order) => {
      if (order.id === orderId) {
        return { ...order, status: "Delivered" }; // Cập nhật trạng thái đơn hàng
      }
      return order;
    });

    setOrderHistory(updatedOrderHistory);
    localStorage.setItem("orderHistory", JSON.stringify(updatedOrderHistory));
    toast.success("Order marked as received");

    // Gửi thông báo cho các tab khác về sự thay đổi
    window.dispatchEvent(new Event("storage"));
  };

  const cancelOrder = (orderId: number) => {
    const updatedOrderHistory = orderHistory.filter(
      (order) => order.id !== orderId
    );
    setOrderHistory(updatedOrderHistory);
    localStorage.setItem("orderHistory", JSON.stringify(updatedOrderHistory));
    toast.success("Order cancelled successfully");
  };

  return (
    <div className="container">
      <h2>Order History</h2>
      <div className="mb-4">
        <label htmlFor="email">
          Enter your email to view your order history:
        </label>
        <input
          type="email"
          id="email"
          value={customerEmail}
          onChange={handleEmailChange}
          className="form-control"
        />
      </div>
      {filteredOrderHistory.length === 0 ? (
        <p>No orders found for this email.</p>
      ) : (
        <div>
          {filteredOrderHistory.map((order) => (
            <div key={order.id} className="order mb-4">
              <h3>Order ID: {order.id}</h3>
              <p>Date: {order.date}</p>
              <h4>Customer Information</h4>
              <p>Name: {order.customerInfo.name}</p>
              <p>Address: {order.customerInfo.address}</p>
              <p>Phone: {order.customerInfo.phone}</p>
              <p>Email: {order.customerInfo.email}</p>
              <p>Status: {order.status}</p>
              {order.status !== "Delivered" && (
                <button
                  className="btn btn-success mb-2"
                  onClick={() => confirmReceipt(order.id)}
                >
                  Confirm Receipt
                </button>
              )}
              <button
                className="btn btn-danger mb-2"
                onClick={() => cancelOrder(order.id)}
              >
                Cancel Order
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

export default OrderHistoryPage;
