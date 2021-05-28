import React from "react";

export const ShoppingItem = ({ recipes }) => {
  if (recipes.length) {
    return recipes.map((recipe) => {
      return (
        <div key={recipe.id} className="card lime lighten-5 col s12 m8">
          <div className="card-content">
            <h4>{recipe.title}</h4>
            <ul>
              {recipe.ingredients.map((item) => {
                return (
                  <li key={item.id}>
                    <label>
                      <input type="checkbox" />
                      <span>{item.name}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      );
    });
  }
  return (
    <div className="section">
      <h5>
        nothing to show here <i className="far fa-sad-tear"></i>
      </h5>
      <h5>add ingredients to shop from the recipe details page</h5>
    </div>
  );
};
