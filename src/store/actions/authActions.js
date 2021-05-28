export const signIn = (credentials) => {
  return (dispatch, getState, { getFirebase }) => {
    /* getFirebase() won`t work without getState !!! */
    const firebase = getFirebase();

    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(dispatch({ type: "SHOW_SPINNER" }))
      .then((resp) => {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: resp,
        });
      })
      .catch((err) => {
        dispatch({
          type: "LOGIN_ERROR",
          payload: err.message,
        });
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({
          type: "SIGNOUT_SUCCESS",
        });
      })
      .catch((err) => {
        dispatch({ type: "SIGNOUT_ERROR", err });
      });
    firebase.logout(); // fix for (FirebaseError): Missing or insufficient permission
  };
};

export const signUp = (newUser) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      //calling create user method ( takes email and pwd as args) on firebase using credentials from SignUp Component
      .then((resp) => {
        firestore
          .collection("users")
          /* storing in firestore the newly created user with doc() method and then set() ( not add() because it will autogenerate user id and user.uid already exists from firebase) */
          .doc(resp.user.uid)
          .set({
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            initials: newUser.firstName[0] + newUser.lastName[0],
          });
      })
      .then(dispatch({ type: "SHOW_SPINNER" }))
      .then(() => {
        dispatch({
          type: "SIGNUP_SUCCESS",
        });
      })
      .catch((err) => {
        dispatch({
          type: "SIGNUP_ERROR",
          payload: err.message,
        });
      });
  };
};
