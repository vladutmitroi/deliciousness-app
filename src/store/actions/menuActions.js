export const menuActions = (toggleClass) => {
  return (dispatch, getState) => {
    dispatch({
      type: "SHOW_MOBILE_MENU",
      payload: toggleClass,
    });
  };
};
