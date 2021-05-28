import React from "react";
import { connect } from "react-redux";
import { setCurrentPage } from "../../store/actions/recipeActions";
import "./pagination.css";

const Pagination = ({
  recipesPerPage,
  totalRecipes,
  setCurrentPage,
  currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalRecipes / recipesPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePagination = (e) => {
    setCurrentPage(e.target.value);
    const links = document.querySelectorAll(".page-link");
    links.forEach((link) => {
      if (link.classList.contains("active")) {
        link.classList.remove("active");
      }
    });
    const parent = e.target.parentNode;
    parent.classList.add("active");
  };

  return (
    <ul className="pagination">
      {pageNumbers.map((number) => (
        <li
          key={number}
          onClick={handlePagination}
          className={
            number === parseFloat(currentPage)
              ? "active waves-effect page-link"
              : "waves-effect page-link"
          }
        >
          <button onClick={handlePagination} value={number}>
            {number}
          </button>
        </li>
      ))}
    </ul>
  );
};

const mapStateToProps = (state) => {
  const {
    recipes: { currentPage },
  } = state;
  return {
    currentPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentPage: (number) => dispatch(setCurrentPage(number)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
