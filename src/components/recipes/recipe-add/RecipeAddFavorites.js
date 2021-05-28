import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { addFavoriteRecipe } from "../../../store/actions/recipeActions";
import "./recipe-favorites.css";

export const RecipeAddFavorites = ({
  addFavoriteRecipe,
  auth,
  recipeId,
  recipeIsAddedToFavByUser,
  handleSnackbarPopup,
}) => {
  const [addToFav, setAddToFav] = useState(recipeIsAddedToFavByUser);

  const handleAddToFavoritesClick = (e) => {
    if (auth && Object.keys(auth).length > 0 && recipeId) {
      e.stopPropagation();
      addFavoriteRecipe(auth.uid, recipeId);
      setAddToFav(!addToFav);
      handleSnackbarPopup("favorites");
    }
  };

  return (
    <Fragment>
      {auth && Object.keys(auth).length > 0 && recipeId && (
        <button
          className="add-to-favorites-btn"
          onClick={handleAddToFavoritesClick}
        >
          <i className={`${addToFav ? "fas" : "far"} fa-heart`}></i>
        </button>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addFavoriteRecipe: (auth, recipeId) =>
      dispatch(addFavoriteRecipe(auth, recipeId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeAddFavorites);
