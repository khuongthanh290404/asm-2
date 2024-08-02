import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
// import { Cart } from "../interfaces/Cart";
import { toast } from "react-toastify";
import { Products } from "../interfaces/Products";
import { Cart } from "./../interfaces/Cart";

const ProductDetail = () => {
  const { state, getDetail } = useContext(ProductContext);
  const { id } = useParams();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || "{}")
  );
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      getDetail(id);
      setUser(user);
    }
  }, []);

  const addToCart = (product: Products) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const index = cart.findIndex((item: Cart) => item.id === product.id);
    toast.success("Thêm thành công");
    if (index === -1) {
      cart.push({ ...product, quantity: quantity });
    } else {
      cart[index].quantity += quantity;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div>
      <h1>Chi tiết sản phẩm</h1>
      <div className="row">
        <div className="col-6">
          {state.selectedProduct && (
            <img
              src={state.selectedProduct.thumbnail}
              alt={state.selectedProduct.title}
            />
          )}
        </div>
        <div className="col-6">
          {state.selectedProduct && <h2>{state.selectedProduct.title}</h2>}
          {state.selectedProduct && <p>${state.selectedProduct.price}</p>}
          {state.selectedProduct && <p>{state.selectedProduct.description}</p>}
          {state.selectedProduct && (
            <>
              <div className="d-flex align-items-center mb-3">
                <button
                  className="btn btn-secondary me-2"
                  onClick={decreaseQuantity}
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  className="btn btn-secondary ms-2"
                  onClick={increaseQuantity}
                >
                  +
                </button>
              </div>
              <button
                className="btn btn-success"
                onClick={() => addToCart(state.selectedProduct!)}
              >
                Add to Cart
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
