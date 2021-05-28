export const addRecipe = (recipe) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;

    firestore
      .collection("recipes")
      .add({
        title: recipe.title.toLowerCase(),
        author:
          profile.firstName.toLowerCase() +
          " " +
          profile.lastName.toLowerCase(),
        authorId: authorId,
        date: new Date(),
        ingredients: recipe.ingredients,
        duration: recipe.duration,
        content: recipe.content,
      })
      .then((response) => {
        dispatch({
          type: "ADD_RECIPE_SUCCESS",
          payload: response,
        });
      })
      .catch((err) => {
        dispatch({
          type: "ADD_RECIPE_ERROR",
          payload: err,
        });
      });
  };
};

export const deleteRecipe = (recipe) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("recipes")
      .doc(recipe)
      .delete()
      .then((resp) => {
        dispatch({
          type: "DELETE_SUCCESS",
          payload: resp,
        });
      })
      .catch((err) => {
        dispatch({
          type: "DELETE_ERROR",
          payload: err,
        });
      });
  };
};

export const editRecipe = (recipe) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;

    const recipeRef = firestore.collection("recipes").doc(recipe.id);
    recipeRef
      .update({
        title: recipe.title.toLowerCase(),
        author:
          profile.firstName.toLowerCase() +
          " " +
          profile.lastName.toLowerCase(),
        authorId: authorId,
        date: new Date(),
        ingredients: recipe.ingredients,
        duration: recipe.duration,
        content: recipe.content,
      })
      .then(dispatch({ type: "EDIT_RECIPE_SUCCESS" }))
      .catch((err) => dispatch({ type: "EDIT_RECIPE_ERROR" }));
  };
};

export const storeRecipeDetails = (recipeDetails) => {
  return (dispatch) => {
    dispatch({
      type: "STORE_RECIPE_DETAILS",
      payload: recipeDetails,
    });
  };
};

export const searchRecipe = (keyword) => {
  return (dispatch) => {
    if (keyword) {
      dispatch({
        type: "RECIPE_SEARCH",
        payload: keyword,
      });
    }
  };
};

export const setCurrentPage = (number) => {
  return (dispatch) => {
    dispatch({
      type: "SET_CURRENT_PAGE",
      payload: number,
    });
  };
};

export const addFavoriteRecipe = (user, recipeId) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const recipe = getState().firestore.data.recipes[recipeId];
    let favAction = "";
    const isFav = () => {
      if (recipe && recipe.favoritedBy && !recipe.favoritedBy.includes(user)) {
        favAction = "add";
        return [...recipe.favoritedBy, user];
      } else if (recipe && !recipe.favoritedBy) {
        favAction = "add";
        return [user];
      }

      const favs = recipe.favoritedBy.filter((u) => u !== user);
      return favs;
    };
    const favs = isFav();
    if (favs) {
      firestore
        .collection("recipes")
        .doc(recipeId)
        .update({
          favoritedBy: favs,
        })
        .then(() =>
          dispatch({
            type: favAction ? "RECIPE_ADDED_TO_FAV" : "RECIPE_REMOVED_FROM_FAV",
          })
        );
    }
  };
};
