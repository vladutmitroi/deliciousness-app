import React from "react";
import "./recipe-details.css";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import moment from "moment";
import { Link, Redirect } from "react-router-dom";
import {
  deleteRecipe,
  storeRecipeDetails,
} from "../../../store/actions/recipeActions";
import { menuActions } from "../../../store/actions/menuActions";
import { addToShoppingList } from "../../../store/actions/shoppingListActions";
import RecipeAddFavorites from "../recipe-add/RecipeAddFavorites";
import Spinner from "../../spinner/Spinner";

const RecipeDetails = (props) => {
  const {
    recipe = [],
    auth,
    history,
    showMenu,
    shoppingList = [],
    storeRecipeDetails,
    recipeAddedToFav,
  } = props;

  const recipeIsAddedToFavByUser =
    recipe &&
    recipe[0].favoritedBy &&
    recipe[0].favoritedBy.find((r) => r === auth.uid);

  const removeRecipe = (id) => {
    if (auth.uid === recipe[0].authorId) {
      props.deleteRecipe(id);
      history.push("/");
    }
  };

  const removeMobileMenu = () => {
    showMenu(false);
  };

  const handleSnackbarPopup = (snackbarClass) => {
    const snackbar = document.querySelector(`.snackbar-${snackbarClass}`);
    snackbar.classList.add("active");
    setTimeout(() => {
      snackbar.classList.remove("active");
    }, 3000);
  };

  const handleShoppingList = (recipe) => {
    const recipesInCart = shoppingList.recipes;
    const notDuplicate = recipesInCart.every((elem) => elem.id !== recipe.id);
    if (notDuplicate) {
      props.addToShoppingList(recipe);
      handleSnackbarPopup("ingredients");
    }
  };

  const handleRecipeDetails = (recipe) => {
    storeRecipeDetails(recipe);
  };

  if (!auth.uid) return <Redirect to="/login" />;

  if (recipe) {
    const authorId = recipe[0].authorId;
    const recipeId = recipe[0].id;
    const recipeAddedToShoppingList =
      shoppingList.recipes && shoppingList.recipes.length
        ? shoppingList.recipes.filter((r) => r.id === recipe[0].id)
        : null;

    return (
      <div className="container section recipe-details">
        <div className="snackbar snackbar-ingredients">ingredients added</div>
        <div className="snackbar snackbar-favorites">{`${
          recipeAddedToFav
            ? "recipe added to favorites"
            : "recipe removed from favorites"
        }`}</div>
        <div className="back-btn">
          <Link onClick={removeMobileMenu} className="bolder" to="/">
            <i className="fas fa-long-arrow-alt-left"></i> home
          </Link>
        </div>
        <div className="card lime lighten-5 z-depth-0">
          <div className="card-content">
            <span className="card-title recipe-details-title">
              {recipe[0].title}{" "}
              <span className="add-to-fav-container">
                <RecipeAddFavorites
                  recipeIsAddedToFavByUser={!!recipeIsAddedToFavByUser}
                  recipeId={recipe[0].id}
                  handleSnackbarPopup={handleSnackbarPopup}
                />
              </span>
            </span>
            <div>
              {recipe[0].ingredients ? (
                <button
                  onClick={() => handleShoppingList(recipe[0])}
                  className="btn waves-effect waves-light"
                  disabled={
                    recipeAddedToShoppingList &&
                    recipeAddedToShoppingList.length > 0
                  }
                >
                  <i className="fas fa-cart-plus"></i>add to shopping list
                </button>
              ) : null}
            </div>
            <ul>
              {recipe[0].ingredients ? (
                recipe[0].ingredients.map((ingredient) => {
                  return (
                    <li key={ingredient.id}>
                      <label>
                        <input type="checkbox" />
                        <span>{ingredient.name}</span>
                      </label>
                    </li>
                  );
                })
              ) : (
                <p className="red-text"> no ingredients ?!</p>
              )}
            </ul>

            <p>
              <i className="far fa-clock"></i> timp de preparare:
              {" " + recipe[0].duration}
            </p>
            <div className="recipe-content">
              <p>
                <i className="fas fa-utensils"></i> mod de preparare:
              </p>
              <div className="recipe-instructions m-y-10">
                {recipe[0].content.split("\n").map((element, index) => {
                  if (element.length > 0) {
                    return (
                      <p key={index}>
                        <i className=" fas fa-caret-right"></i>
                        {element}
                      </p>
                    );
                  } else {
                    return null;
                  }
                })}
              </div>
            </div>
            <div className="actions-btn-container mt-20">
              <button
                disabled={auth.uid !== authorId}
                onClick={() => {
                  removeRecipe(recipeId);
                  removeMobileMenu();
                }}
                className="btn delete-btn waves-effect waves-light red lighten-3"
              >
                <i className="fas white-text fa-trash-alt"></i>delete
              </button>

              <Link
                to={
                  auth.uid === recipe[0].authorId
                    ? "/edit-recipe/" + recipeId
                    : "/recipe/" + recipeId
                }
                disabled={auth.uid === authorId ? false : true}
                onClick={() => handleRecipeDetails(recipe[0])}
                className="btn edit-btn waves-effect waves-light"
              >
                <i className="fas fa-edit"></i>edit
              </Link>
            </div>
            {auth.uid !== recipe[0].authorId ? (
              <div className="tooltip m-y-10 red-text lighten-4">
                <i className="fas fa-exclamation-circle"></i> can only delete or
                edit your recipes
              </div>
            ) : null}
          </div>
          <div className="card-action lighten-4">
            <div>by {recipe[0].author}</div>
            <div>
              {moment(recipe[0].date.toDate().toString()).format(
                "dddd, MMMM Do YYYY, h:mm:ss a"
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <Spinner />;
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const recipe = state.firestore.ordered.recipes
    ? state.firestore.ordered.recipes.filter((recipe) => {
        return recipe.id === id;
      })
    : null;

  return {
    recipe,
    auth: state.firebase.auth,
    shoppingList: state.shoppingList,
    recipeAddedToFav: state.recipes.recipeAddedToFav,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    deleteRecipe: (recipe) => dispatch(deleteRecipe(recipe)),
    showMenu: (toggleClass) => dispatch(menuActions(toggleClass)),
    addToShoppingList: (recipe) => dispatch(addToShoppingList(recipe)),
    storeRecipeDetails: (recipe) => dispatch(storeRecipeDetails(recipe)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "recipes", orderBy: ["date", "desc"] }])
)(RecipeDetails);
