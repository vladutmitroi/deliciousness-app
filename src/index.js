import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { createStore, applyMiddleware, compose } from "redux";
import { Provider, useSelector } from "react-redux";
import thunk from "redux-thunk";
import {
  createFirestoreInstance,
  getFirestore,
  reduxFirestore,
} from "redux-firestore";
import {
  ReactReduxFirebaseProvider,
  getFirebase,
  isLoaded,
} from "react-redux-firebase";
import fbConfig from "./config/fbConfig";
import firebase from "firebase/app";

import { rootReducer } from "./store/reducers/rootReducer";
import Spinner from "./components/spinner/Spinner";

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirestore, getFirebase })),
    reduxFirestore(firebase, fbConfig),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  )
);

const profileSpecificProps = {
  // will be stored in Component`s props.profile property
  useFirestoreForProfile: true, //set firestore profile props to firebase profile property
  userProfile: "users", // which collection to set profile props from
};

const rrfProps = {
  firebase,
  dispatch: store.dispatch,
  createFirestoreInstance,
  config: profileSpecificProps,
};

/* render app after auth is loaded*/
function AuthIsLoaded({ children }) {
  // used to render Spinner or App based on auth status
  const auth = useSelector((state) => state.firebase.auth);
  if (!isLoaded(auth)) return <Spinner />;
  return children;
}

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <AuthIsLoaded>
        <App />
      </AuthIsLoaded>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
