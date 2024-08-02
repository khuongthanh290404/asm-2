import { Link } from "react-router-dom";
import LogOut from "./LogOut";
import { useEffect, useState } from "react";
const Header = () => {
  // const user = JSON.parse(localStorage.getItem("user") || "{}");
  // const logOut = useContext(ProductContext);
  const [user, setUser] = useState();

  useEffect(() => {
    getUserToken();
  }, []);
  const getUserToken = () => {
    const getUser = localStorage.getItem("user") || null;
    const user = JSON.parse(getUser!);
    setUser(user);
  };
  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-body">
        <div className="container-fluid">
          <button
            data-mdb-collapse-init
            className="navbar-toggler"
            type="button"
            data-mdb-target="#navbarExample01"
            aria-controls="navbarExample01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarExample01">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item active">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  {user ? "" : "Login"}
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/order-history" className="nav-link">
                  OrderHistory
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/cart" className="nav-link">
                  Cart
                </Link>
              </li>
              <li className="nav-item">
                <div className="nav-link">{user ? user.email : ""}</div>
              </li>
              <li className="nav-item">{user ? <LogOut /> : ""}</li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
{
  /* <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/cart">Xem giỏ hàng</Link> */
}
