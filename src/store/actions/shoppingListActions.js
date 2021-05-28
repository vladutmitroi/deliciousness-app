export const addToShoppingList = (recipe) => {
  return (dispatch) => {
    dispatch({
      type: "ADD_SHOPPING_LIST",
      payload: recipe,
    });
  };
};

export const resetNotificationIcon = () => {
  return (dispatch) => {
    dispatch({
      type: "RESET_NOTIFICATION",
    });
  };
};
