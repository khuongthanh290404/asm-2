import { Users } from "./../interfaces/User";
type State = {
  user: Users[];
};
type Action =
  | { type: "SET_USER"; payload: Users[] }
  | { type: "REMOVE_USER"; payload: number | string };
const userReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "REMOVE_USER":
      return {
        ...state,
        user: state.user.filter((item) => item.id !== action.payload),
      };
  }
};
export default userReducer;
