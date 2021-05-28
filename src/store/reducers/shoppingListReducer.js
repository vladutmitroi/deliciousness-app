const initState = {
  recipes: [],
  notifIcon: false,
  isAlreadyAdded: false,
};

export const shoppingListReducer = (state = initState, action) => {
  let newState;
  switch (action.type) {
    case "ADD_SHOPPING_LIST":
      const { payload } = action;
      const recipes = [...state.recipes, payload];
      newState = {
        ...state,
        recipes,
        notifIcon: true,
      };
      break;
    case "RESET_NOTIFICATION":
      newState = {
        ...state,
        notifIcon: false,
      };
      break;
    default:
      newState = state;
  }
  return newState;
};
