import { combineReducers } from "redux";
import { recipeReducer } from "./recipeReducer";
import { authReducer } from "./authReducer";
import { firestoreReducer } from "redux-firestore";
/* listens to changes on firestore and updates the app */
import { menuReducer } from "./menuReducer";
import { shoppingListReducer } from "./shoppingListReducer";
import { firebaseReducer } from "react-redux-firebase";
/* connects to firebase, and gives access to auth props */

export const rootReducer = combineReducers({
  recipes: recipeReducer,
  auth: authReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  menu: menuReducer,
  shoppingList: shoppingListReducer,
});
