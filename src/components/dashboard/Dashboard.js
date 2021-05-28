import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";

import RecipesList from "../recipes/RecipesList";
import { Notifications } from "./Notifications";
import { SearchBar } from "./SearchBar";
import { searchRecipe } from "../../store/actions/recipeActions";
import Pagination from "./Pagination";

const Dashboard = ({ recipes, auth, notifications, searchFor, search }) => {
  if (!auth.uid) return <Redirect to="/login" />;
  const handleChange = (e) => {
    searchFor(e.target.value.toLowerCase());
  };

  let currentRecipes = [];
  if (recipes) {
    // Get current recipes
    const indexOfLastPost = search.currentPage * search.recipesPerPage;
    const indexOfFirstPost = indexOfLastPost - search.recipesPerPage;
    currentRecipes = recipes.slice(indexOfFirstPost, indexOfLastPost);
  }

  return (
    <div className="dashboard container">
      <div className="row">
        <div className="section">
          <div className="col s12 m6">
            <SearchBar keyword={search.keyword} handleChange={handleChange} />
            {recipes && recipes.length && (
              <Pagination
                recipesPerPage={search.recipesPerPage}
                totalRecipes={recipes.length}
              />
            )}
            <RecipesList
              keyword={search.keyword}
              recipesToSearch={recipes}
              recipes={currentRecipes}
            />
          </div>
          <div className="col s12 m5 offset-m1 right">
            <Notifications notifications={notifications} />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { recipes, notifications } = state.firestore.ordered;
  return {
    recipes,
    auth: state.firebase.auth,
    notifications,
    search: state.recipes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchFor: (keyword) => dispatch(searchRecipe(keyword)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: "recipes", orderBy: ["date", "desc"] },
    { collection: "notifications", limit: 7, orderBy: ["time", "desc"] },
  ])
)(Dashboard);
