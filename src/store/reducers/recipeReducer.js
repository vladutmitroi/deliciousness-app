const initState = {
  list: [],
  currentPage: 1,
  recipesPerPage: 5,
};

export const recipeReducer = (state = initState, action) => {
  let newState;
  switch (action.type) {
    case "ADD_RECIPE_SUCCESS":
      newState = {
        ...state,
      };
      break;
    case "ADD_RECIPE_ERROR":
      newState = state;
      break;
    case "DELETE_SUCCESS":
      newState = {
        ...state,
      };
      break;
    case "DELETE_ERROR":
      newState = {
        ...state,
        error: action.payload,
      };
      break;
    case "EDIT_RECIPE_SUCCESS":
      newState = {
        ...state,
      };
      break;
    case "EDIT_RECIPE_ERROR":
      newState = state;
      break;
    case "STORE_RECIPE_DETAILS":
      newState = {
        ...state,
        recipeDetails: action.payload,
      };
      break;
    case "RECIPE_SEARCH":
      newState = {
        ...state,
        keyword: action.payload,
      };
      break;
    case "SET_CURRENT_PAGE":
      newState = {
        ...state,
        currentPage: action.payload,
      };
      break;
    case "RECIPE_ADDED_TO_FAV":
      newState = {
        ...state,
        recipeAddedToFav: true,
      };
      break;
    case "RECIPE_REMOVED_FROM_FAV":
      newState = {
        ...state,
        recipeAddedToFav: false,
      };
      break;
    default:
      newState = state;
  }

  return newState;
};
