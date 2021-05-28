import React from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import "./recipe-new.css";

import AddIngredient from "../../ingredients/AddIngredient";
import { addRecipe } from "../../../store/actions/recipeActions";
import { menuActions } from "../../../store/actions/menuActions";
import { btnSpinner } from "../../utils/btnSpinner";

class RecipeAdd extends React.Component {
  state = {
    title: "",
    author: "",
    date: "",
    ingredients: [],
    duration: "",
    content: "",
    required: true,
  };

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  addIngredient = (ingredient) => {
    ingredient.id =
      this.state.ingredients.length > 0
        ? this.state.ingredients[this.state.ingredients.length - 1].id + 1
        : this.state.ingredients.length + 1;

    let ingredients = [...this.state.ingredients, ingredient];
    this.setState({ ingredients, required: false });
  };

  deleteIngredient = (e) => {
    let id = parseInt(e.target.id);
    let required = false;
    let ingredients = this.state.ingredients.filter((ingredient) => {
      return ingredient.id !== id;
    });
    if (ingredients.length < 1) {
      required = true;
    }
    this.setState({ ingredients, required });
  };

  handleKeyDown(e) {
    if (e.keyCode === 13) {
      e.target.value += "\n";
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addRecipe(this.state);
    btnSpinner(".btn-spinner");
    setTimeout(() => {
      this.props.history.push("/");
    }, 1100);
  };

  removeMobileMenu = () => {
    this.props.showMenu(false);
  };

  render() {
    let ingredients = this.state.ingredients.map((ingredient) => {
      return (
        <li
          key={ingredient.id}
          onClick={this.deleteIngredient}
          id={ingredient.id}
          className="ingredient pos-rel"
        >
          {ingredient.name}
        </li>
      );
    });

    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/login" />;

    return (
      <div className="container section recipe-new">
        <div className="back-btn">
          <Link onClick={this.removeMobileMenu} className="bolder" to="/">
            <i className="fas fa-long-arrow-alt-left"></i> home
          </Link>
        </div>
        <div className="row card lime lighten-5 z-depth-0">
          <form
            onSubmit={this.handleSubmit}
            className="col s12 m7 card-content"
          >
            <h4>add a new recipe:</h4>
            <div className="recipe-title mt-20">
              <span className="recipe-headline">recipe title:</span>
              <div className="input-field inline">
                <input
                  onChange={this.handleChange}
                  id="title"
                  type="text"
                  required
                />
              </div>
            </div>
            <div className="recipe-ingredients mt-20">
              <div className="recipe-headline">ingredients:</div>
              <ul>{ingredients}</ul>
              <AddIngredient
                isRequired={this.state.required}
                addIngredient={this.addIngredient}
              />
            </div>
            <div className="recipe-duration mt-20">
              <span className="recipe-headline">time to prepare:</span>
              <div className="input-field inline">
                <input
                  onChange={this.handleChange}
                  id="duration"
                  type="text"
                  required
                />
              </div>
            </div>
            <div className="recipe-content mt-20">
              <span className="recipe-headline">how to prepare:</span>
              <div className="input-field">
                <textarea
                  onChange={this.handleChange}
                  onKeyDown={this.handleKeyDown}
                  id="content"
                  type="text"
                  placeholder="hit enter after each step"
                  required
                  className="materialize-textarea"
                />
              </div>
            </div>
            <button
              className="btn waves-effect waves-light"
              onSubmit={this.handleSubmit}
            >
              Submit
              <i className="fa fa-spinner fa-spin btn-spinner"></i>
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addRecipe: (recipe) => dispatch(addRecipe(recipe)),
    showMenu: (toggleClass) => dispatch(menuActions(toggleClass)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeAdd);
