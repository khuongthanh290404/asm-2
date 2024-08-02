import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import { ProductProvider } from "./context/ProductContext.tsx";
import { UserProvider } from "./context/UserContext.tsx";
import { CategoryProvider } from "./context/CategoryContext.tsx";
// import { CartProvider } from "./context/CartContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ProductProvider>
        <UserProvider>
          <CategoryProvider>
            {/* <CartProvider>  */}
            <App />
            {/* </CartProvider> */}
          </CategoryProvider>
        </UserProvider>
      </ProductProvider>
      <ToastContainer />
    </BrowserRouter>
  </React.StrictMode>
);
