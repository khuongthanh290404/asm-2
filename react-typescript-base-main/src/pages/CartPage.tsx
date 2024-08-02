import React, { useState, useEffect } from "react";
import { Cart } from "../interfaces/Cart";
import { toast } from "react-toastify";
import QRCode from "qrcode.react";

const CartPage = () => {
  const [cart, setCart] = useState<Cart[]>(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [showQRCode, setShowQRCode] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    address: "",
    phone: "",
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const removeFromCart = (id: string | number) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    toast.success("Cart removed successfully");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo({ ...customerInfo, [name]: value });
  };

  const handleOrder = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty. Add items to the cart before ordering.");
      return;
    }

    if (!customerInfo.name || !customerInfo.address || !customerInfo.phone) {
      toast.error("Please fill in all customer information before ordering.");
      return;
    }

    const orderHistory = JSON.parse(
      localStorage.getItem("orderHistory") || "[]"
    );
    const newOrder = {
      id: Date.now(),
      items: cart,
      date: new Date().toLocaleString(),
      customerInfo,
    };

    orderHistory.push(newOrder);
    localStorage.setItem("orderHistory", JSON.stringify(orderHistory));
    setCart([]);
    localStorage.removeItem("cart");
    setCustomerInfo({ name: "", address: "", phone: "" });
    toast.success("Order placed successfully!");
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty. Add items to the cart before ordering.");
      return;
    }
    setShowQRCode(true);
  };

  const handlePaymentSuccess = () => {
    handleOrder();
    setShowQRCode(false);
    toast.success("Payment successful!");
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="container">
      <table className="table mt-5 mb-5 table-bordered">
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
          {cart.map((item: Cart) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>
                <img width={100} src={item.thumbnail} alt={item.title} />
              </td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              <td>{item.price * item.quantity}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => removeFromCart(item.id!)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-3">
        <h4>Total: ${calculateTotal()}</h4>
        <div className="mb-3">
          <h4>Customer Information</h4>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={customerInfo.name}
            onChange={handleInputChange}
            className="form-control mb-2"
          />
          <input
            type="text"
            placeholder="Address"
            name="address"
            value={customerInfo.address}
            onChange={handleInputChange}
            className="form-control mb-2"
          />
          <input
            type="text"
            placeholder="Phone"
            name="phone"
            value={customerInfo.phone}
            onChange={handleInputChange}
            className="form-control mb-2"
          />
        </div>
        <button className="btn btn-primary" onClick={handleCheckout}>
          Checkout
        </button>
        {showQRCode && (
          <div className="mt-3">
            <h4>Scan QR Code to Pay</h4>
            <QRCode value={`Total: ${calculateTotal()} USD`} size={256} />
            <button
              className="btn btn-success mt-3"
              onClick={handlePaymentSuccess}
            >
              Payment Successful
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
