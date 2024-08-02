import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const User = () => {
  const { state, handleRemoveUser } = useContext(UserContext);
  return (
    <div>
      <table className="table mt-5 mb-5 table-bordered container">
        <thead>
          <tr>
            <th>id</th>
            <th>email</th>
            <th>password</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {state.user.map((item) => (
            <tr>
              <td>{item.id}</td>
              <td>{item.email}</td>
              <td>{item.password}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleRemoveUser(item.id!)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default User;
