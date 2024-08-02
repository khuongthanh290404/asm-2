import { useNavigate } from "react-router-dom";

const LogOut = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <button className="btn btn-primary" onClick={handleLogOut}>
      LogOut
    </button>
  );
};

export default LogOut;
