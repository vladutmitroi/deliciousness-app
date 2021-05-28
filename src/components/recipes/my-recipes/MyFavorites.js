import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import moment from "moment";
import { Redirect, Link } from "react-router-dom";
import { menuActions } from "../../../store/actions/menuActions";

import "./my-recipes.css";

const MyFavorites = ({ recipes, auth, showMenu }) => {
  if (!auth.uid) return <Redirect to="/login" />;

  const removeMobileMenu = () => {
    showMenu(false);
  };

  if (recipes && recipes.length) {
    return (
      <div className="container my-recipes">
        <div className="row section mb-0">
          <div className="col s12 back-btn">
            <Link onClick={removeMobileMenu} className="bolder" to="/">
              <i className="fas fa-long-arrow-alt-left"></i> home
            </Link>
          </div>
          <div className="col s12 m8 l6 page-title">
            <p className="lime lighten-5">
              my fav{""}
              <span
                style={{ color: "#EF9A9A", fontSize: "1.5rem" }}
                className="far fa-heart"
              ></span>
              {""}rite recipes
            </p>
          </div>
        </div>
        <div className="row">
          {recipes.map((recipe) => {
            return (
              <Link
                onClick={removeMobileMenu}
                key={recipe.id}
                to={"recipe/" + recipe.id}
              >
                <div className="col s12 m8 l6">
                  <div className="card z-depth-0 clickable-card recipe-summary">
                    <div className="card-content white-text red lighten-3 mb-10">
                      <h4 className="mt-0">{recipe.title}</h4>

                      <p>
                        {moment(recipe.date.toDate().toString()).format(
                          "MMMM Do, YYYY"
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
  return (
    <div className="container section">
      <div className="col s12 back-btn">
        <Link className="bolder" to="/">
          <i className="fas fa-long-arrow-alt-left"></i> home
        </Link>
      </div>
      <h4>
        no favorited recipes <i className="far fa-sad-cry"></i>
      </h4>
      <p>add some from their details page</p>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { uid } = state.firebase.auth;
  let myRecipes = state.firestore.ordered.recipes
    ? state.firestore.ordered.recipes.filter((recipe) => {
        const { favoritedBy = [] } = recipe;
        return favoritedBy.length ? favoritedBy.find((f) => f === uid) : null;
      })
    : null;

  return {
    recipes: myRecipes,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showMenu: (toggleClass) => dispatch(menuActions(toggleClass)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    {
      collection: "recipes",
      orderBy: ["date", "desc"],
    },
  ])
)(MyFavorites);
