import React from "react";

class AddIngredient extends React.Component {
  state = {
    name: "",
  };

  handleChange = (e) => {
    this.setState({ name: e.target.value });
  };

  handleClick = (e) => {
    e.preventDefault();
    this.props.addIngredient(this.state);
    this.setState({ name: "" });
  };

  render() {
    let required = this.props.isRequired;
    return (
      <div>
        <button
          onClick={this.handleClick}
          className="add-recipe m-y-10 waves-effect waves-light btn"
          disabled={!this.state.name ? true : false}
        >
          add ingredient
          <i className="fas fa-plus"></i>
        </button>
        <input
          type="text"
          name="ingredient"
          onChange={this.handleChange}
          value={this.state.name}
          onSubmit={this.handleClick}
          required={required}
        />
      </div>
    );
  }
}
export default AddIngredient;
