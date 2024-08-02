import { Children, createContext, useReducer } from "react";
import { Category } from "../interfaces/Category";
import CategoryReducer from "../reducers/CategoryReduce";
import instace from "./../service/instace";
import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
type CategoryContextType = {
  state: {
    category: Category[];
    seletedCategory?: Category;
  };
  handleRemoveCategory: (id: number | string) => void;
  //   onSubmit: (category: Category) => void;
  //   getDetail: (id: number | string) => void;
};
export const CategoryContext = createContext<CategoryContextType>(
  {} as CategoryContextType
);
type Children = {
  children: React.ReactNode;
};

export const CategoryProvider = ({ children }: Children) => {
  const [state, dispatch] = useReducer(CategoryReducer, { category: [] });

  useEffect(() => {
    (async () => {
      const { data } = await instace.get(`/category`);
      dispatch({ type: "SET_CATEGORY", payload: data });
    })();
  }, []);
  const handleRemoveCategory = async (id: number | string) => {
    if (window.confirm("Are you sure you want to remove")) {
      await instace.delete(`/category/` + id);
      setTimeout(() => {
        window.location.href = "/admin/category";
      }, 300);
    }
  };
  return (
    <CategoryContext.Provider value={{ state, handleRemoveCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};
