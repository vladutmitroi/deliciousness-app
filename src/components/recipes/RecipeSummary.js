import React from "react";
import moment from "moment";

export const RecipeSummary = ({ recipe, uid }) => {
  const { favoritedBy = [] } = recipe;
  const showFavIcon = favoritedBy.find((f) => f === uid);

  return (
    <div className="card z-depth-0 clickable-card recipe-summary">
      <div className="card-content white-text red lighten-3">
        <h4 className="mt-0">
          {recipe.title}{" "}
          {showFavIcon && (
            <span className="right">
              <i style={{ fontSize: "2rem" }} className="fas fa-heart"></i>
            </span>
          )}
        </h4>

        <p>by {recipe.author}</p>
        <p>
          posted{" "}
          {moment(recipe.date.toDate().toString()).format("MMMM Do, YYYY")}
        </p>
      </div>
    </div>
  );
};
