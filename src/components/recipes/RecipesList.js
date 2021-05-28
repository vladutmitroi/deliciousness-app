import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { menuActions } from "../../store/actions/menuActions";

import { RecipeSummary } from "./RecipeSummary";

const RecipesList = ({ recipes, keyword, showMenu, recipesToSearch, auth }) => {
  if (recipes && recipes.length) {
    let filteredRecipes = [...recipes];
    if (keyword && keyword.length > 2) {
      filteredRecipes = recipesToSearch.filter((recipe) => {
        return (
          recipe.title.includes(keyword) || recipe.author.includes(keyword)
        );
      });
    }

    const removeMobileMenu = () => {
      showMenu(false);
    };

    const { uid } = auth || {};

    return (
      <div className="recipes-list">
        {filteredRecipes &&
          filteredRecipes.map((recipe) => {
            return (
              <Link
                onClick={removeMobileMenu}
                to={"/recipe/" + recipe.id}
                key={recipe.id}
                id={recipe.id}
              >
                <RecipeSummary uid={uid} recipe={recipe} />
              </Link>
            );
          })}
      </div>
    );
  }
  return (
    <div className="section">
      <h4>
        no recipes yet <i className="far fa-sad-cry"></i>
      </h4>
    </div>
  );
};

const mapStateToProps = (state) => ({ auth: state.firebase.auth });
const mapDispatchToProps = (dispatch) => {
  return {
    showMenu: (toggleClass) => dispatch(menuActions(toggleClass)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipesList);
