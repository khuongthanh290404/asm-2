import { Category } from "../interfaces/Category";

type State = {
  category: Category[];
};
type Action =
  | { type: "SET_CATEGORY"; payload: Category[] }
  | { type: "ADD_CATEGORY"; payload: Category }
  | { type: "REMOVE_CATEGORY"; payload: number | string }
  | { type: "UPDATE_CATEGORY"; payload: Category }
  | { type: "SET_SELECTED_CATEGORY"; payload: Category | undefined };

const CategoryReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_CATEGORY":
      return {
        ...state,
        category: action.payload,
      };
    case "ADD_CATEGORY":
      return {
        ...state,
        category: [...state.category, action.payload],
      };
    case "UPDATE_CATEGORY":
      return {
        ...state,
        category: state.category.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case "REMOVE_CATEGORY":
      return {
        ...state,
        category: state.category.filter((item) => item.id !== action.payload),
      };
    case "SET_SELECTED_CATEGORY":
      return {
        ...state,
        selectedCategory: action.payload,
      };
    default:
      return state;
  }
};
export default CategoryReducer;
