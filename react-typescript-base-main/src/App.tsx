import "./App.css";
import Admin from "./pages/admin/Admin";
import { Routes, Route } from "react-router-dom";
import AuthForm from "./pages/AuthForm";
import Home from "./pages/Home";
import AdminLayout from "./components/AdminLayout";
import ClientLayout from "./components/ClientLayout";
import ProductDetail from "./pages/ProductDetail";
import ProductForm from "./pages/ProductForm";
import Dasnhboard from "./pages/admin/Dasnhboard";
import CartPage from "./pages/CartPage";
import User from "./pages/admin/User";
import Category from "./pages/admin/Category";
// import CategoryForm from "./pages/CategoryForm";
import OrderHistoryPage from "./components/Orderhistory";
import AdminOrdersPage from "./pages/admin/Oder";

function App() {
  return (
    <>
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dasnhboard />} />
          <Route path="/admin/product" element={<Admin />} />
          <Route path="/admin/add" element={<ProductForm />} />
          <Route path="/admin/update/:id" element={<ProductForm />} />
          <Route path="/admin/user" element={<User />} />
          <Route path="/admin/category" element={<Category />} />
          <Route path="/admin/order" element={<AdminOrdersPage />} />

          {/* <Route path="/admin/category/add" element={<CategoryForm />} /> */}
        </Route>
        <Route path="/" element={<ClientLayout />}>
          <Route index element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order-history" element={<OrderHistoryPage />} />
        </Route>
        <Route path="/login" element={<AuthForm isLogin />} />
        <Route path="/register" element={<AuthForm />} />
      </Routes>
    </>
  );
}

export default App;
