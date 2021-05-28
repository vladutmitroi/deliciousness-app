const initState = {
  authError: null,
  loading: false,
};

export const authReducer = (state = initState, action) => {
  let newState;
  switch (action.type) {
    case "SHOW_SPINNER":
      newState = {
        ...state,
        loading: true,
      };
      break;
    case "LOGIN_SUCCESS":
      newState = {
        ...state,
        authError: null,
        loading: false,
      };
      break;
    case "LOGIN_ERROR":
      newState = {
        ...state,
        authError: action.payload,
        loading: false,
      };
      break;
    case "SIGNOUT_SUCCESS":
      newState = state;
      break;
    case "SIGNOUT_ERROR":
      newState = state;
      break;
    case "SIGNUP_SUCCESS":
      newState = {
        ...state,
        authError: null,
        loading: false,
      };
      break;
    case "SIGNUP_ERROR":
      newState = {
        ...state,
        authError: action.payload,
        loading: false,
      };
      break;
    default:
      newState = state;
  }

  return newState;
};
