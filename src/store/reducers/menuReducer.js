const initState = {
  showMenu: false,
};
export const menuReducer = (state = initState, action) => {
  let newState;
  switch (action.type) {
    case "SHOW_MOBILE_MENU":
      newState = {
        ...state,
        showMenu: action.payload,
      };
      break;
    default:
      newState = state;
  }

  return newState;
};
