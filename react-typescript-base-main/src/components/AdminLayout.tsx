import { Link, Outlet } from "react-router-dom";

const AdminLayout = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  if (!user || user.role !== "admin") {
    return (
      <>
        <div className="container">
          <h1 className="text-danger">You don't have permission!</h1>
          <Link to="/" className="btn btn-primary">
            Return Home
          </Link>
        </div>
      </>
    );
  }
  return (
    <div className="admin-layout">
      <header>
        <h1>Hello, {user.email}</h1>
      </header>
      <div className="d-flex" id="wrapper">
        <div className="border-end bg-white " id="sidebar-wrapper">
          <div className="list-group list-group-flush">
            <a
              className="list-group-item list-group-item-action list-group-item-light p-3"
              href="/admin"
            >
              Dashboard
            </a>
            <a
              className="list-group-item list-group-item-action list-group-item-light p-3"
              href="/admin/category"
            >
              Category
            </a>
            <a
              className="list-group-item list-group-item-action list-group-item-light p-3"
              href="/admin/product"
            >
              Product
            </a>
            <a
              className="list-group-item list-group-item-action list-group-item-light p-3"
              href="/admin/user"
            >
              User
            </a>
            <a
              className="list-group-item list-group-item-action list-group-item-light p-3"
              href="/admin/order"
            >
              Cart
            </a>
            {/* <a
              className="list-group-item list-group-item-action list-group-item-light p-3"
              href="#!"
            >
              Profile
            </a>
            <a
              className="list-group-item list-group-item-action list-group-item-light p-3"
              href="#!"
            >
              Status
            </a> */}
          </div>
        </div>
        {/* Page content wrapper*/}
        <div id="page-content-wrapper">
          {/* Top navigation*/}
          <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
            <div className="container-fluid">
              {/* <button className="btn btn-primary" id="sidebarToggle">
                Toggle Menu
              </button> */}
              {/* <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button> */}
              <div className="" id="">
                <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
                  <li className="nav-item active">
                    <a className="nav-link" href="/">
                      Home
                    </a>
                  </li>
                  {/* <li className="nav-item">
                    <a className="nav-link" href="#!">
                      Link
                    </a>
                  </li>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      id="navbarDropdown"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Dropdown
                    </a>
                    <div
                      className="dropdown-menu dropdown-menu-end"
                      aria-labelledby="navbarDropdown"
                    >
                      <a className="dropdown-item" href="#!">
                        Action
                      </a>
                      <a className="dropdown-item" href="#!">
                        Another action
                      </a>
                      <div className="dropdown-divider" />
                      <a className="dropdown-item" href="#!">
                        Something else here
                      </a>
                    </div>
                  </li> */}
                </ul>
              </div>
            </div>
          </nav>
          <div className="ontainer-fluid">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
