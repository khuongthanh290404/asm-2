import { useContext } from "react";
import { CategoryContext } from "../../context/CategoryContext";

const Category = () => {
  const { state, handleRemoveCategory } = useContext(CategoryContext);
  return (
    <div>
      <table className="table table-striped table-bordered container w-100">
        <thead className="table-dark">
          <tr>
            <th>id</th>
            <th>title</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {state.category.map((item) => (
            <tr>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleRemoveCategory(item.id!)}
                >
                  Xóa
                </button>
                <button className="btn btn-warning">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Category;
