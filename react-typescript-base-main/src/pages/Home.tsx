import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import { Users } from "./../interfaces/User";
import { Products } from "../interfaces/Products";
import { Cart } from "./../interfaces/Cart";
import { toast } from "react-toastify";
import Slideshow from "./../components/Slideshow";

const Home = () => {
  const { state } = useContext(ProductContext);
  const [user, setUser] = useState({} as Users);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Products[]>(
    state.products
  );

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(user);
  }, []);

  useEffect(() => {
    setFilteredProducts(
      state.products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, state.products]);

  // const handleSearch = () => {
  //   setFilteredProducts(
  //     state.products.filter((product) =>
  //       product.title.toLowerCase().includes(searchTerm.toLowerCase())
  //     )
  //   );
  // };

  const addToCart = (product: Products) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const index = cart.findIndex((item: Cart) => item.id === product.id);
    toast.success("Thêm thành công");
    if (index === -1) {
      cart.push({ ...product, quantity: 1 });
    } else {
      cart[index].quantity += 1;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  };
  //phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const currentProduct = 8;
  const firstIndexProduct = currentPage * currentProduct;
  const lastIndexProduct = firstIndexProduct - currentProduct;

  const totalProduct = filteredProducts.slice(
    lastIndexProduct,
    firstIndexProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / currentProduct);
  const numberPages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <div>
        <Slideshow />
        <div className="row mb-4">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-[40px]">New Products</h2>
            <div className="d-flex container">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control m-5"
              />
              {/* <button className="btn btn-primary ms-2" onClick={handleSearch}>
                Search
              </button> */}
            </div>
          </div>
        </div>
        <div className="row">
          {totalProduct.map((item) => (
            <div className="col-sm-6 my-3 col-md-4 col-lg-3" key={item.id}>
              <div className="box">
                <div className="card">
                  <img src={item.thumbnail} alt={item.title} />
                  <div className="content">
                    <Link to={`/product/${item.id}`}>{item.title}</Link>
                    <h6 className="text-red-500">
                      Price <span>${item.price}</span>
                    </h6>
                  </div>
                  <button
                    className="btn btn-success w-100"
                    onClick={
                      user?.email
                        ? () => addToCart(item)
                        : () => alert("Please login to add to cart")
                    }
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <button
            className="btn btn-light"
            onClick={handlePrevious}
            disabled={currentPage <= 1}
          >
            Previous
          </button>
          {numberPages.map((page) => (
            <button
              key={page}
              className={`btn ${
                currentPage === page ? "btn-primary" : "btn-light"
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
          <button
            className="btn btn-light"
            onClick={handleNext}
            disabled={currentPage >= totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
