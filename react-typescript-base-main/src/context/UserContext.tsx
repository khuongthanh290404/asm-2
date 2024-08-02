import { Children, createContext, useReducer, useEffect } from "react";
import { Users } from "../interfaces/User";
import instace from "./../service/instace";
import userReducer from "../reducers/UserReduce";

type UserContextType = {
  state: {
    user: Users[];
  };
  handleRemoveUser: (id: number | string) => void;
};
export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);
type Children = {
  children: React.ReactNode;
};
export const UserProvider = ({ children }: Children) => {
  const [state, dispatch] = useReducer(userReducer, { user: [] });
  useEffect(() => {
    (async () => {
      const { data } = await instace.get(`/users`);
      dispatch({ type: "SET_USER", payload: data });
    })();
  }, []);
  const handleRemoveUser = async (id: number | string) => {
    if (window.confirm("Are you sure you want to remove")) {
      await instace.delete(`/users/` + id);
      dispatch({ type: "REMOVE_USER", payload: id });
    }
  };
  return (
    <UserContext.Provider value={{ state, handleRemoveUser }}>
      {children}
    </UserContext.Provider>
  );
};
