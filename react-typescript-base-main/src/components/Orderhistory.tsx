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
  };
}

const OrderHistoryPage = () => {
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);

  useEffect(() => {
    const savedOrderHistory = localStorage.getItem("orderHistory");
    if (savedOrderHistory) {
      setOrderHistory(JSON.parse(savedOrderHistory));
    }
  }, []);

  const removeItemFromOrder = (orderId: number, itemId: number | string) => {
    const updatedOrderHistory = orderHistory.map((order) => {
      if (order.id === orderId) {
        const updatedItems = order.items.filter((item) => item.id !== itemId);
        return { ...order, items: updatedItems };
      }
      return order;
    });

    const filteredOrderHistory = updatedOrderHistory.filter(
      (order) => order.items.length > 0
    );

    setOrderHistory(filteredOrderHistory);
    localStorage.setItem("orderHistory", JSON.stringify(filteredOrderHistory));
    toast.success("Item removed from order successfully");
  };

  return (
    <div className="container">
      <h2>Order History</h2>
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
              <table className="table mt-2 mb-2 table-bordered">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Image</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                    <th>Action</th>
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
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() =>
                            removeItemFromOrder(order.id, item.id!)
                          }
                        >
                          Xóa
                        </button>
                      </td>
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
