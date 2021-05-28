import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { menuActions } from "../../store/actions/menuActions";
import { ShoppingItem } from "./ShoppingItem";

const ShoppingList = (props) => {
  const { showMenu, shoppingList, auth } = props;
  const removeMobileMenu = () => {
    showMenu(false);
  };

  const { recipes } = shoppingList;

  if (!auth.uid) return <Redirect to="/login" />;
  return (
    <div className="container section shopping-list">
      <div className="row">
        <div className="back-btn">
          <Link onClick={removeMobileMenu} className="bolder" to="/">
            <i className="fas fa-long-arrow-alt-left"></i> home
          </Link>
        </div>
        <div>
          {recipes && <h4>shopping list</h4>}
          <ShoppingItem recipes={recipes} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    shoppingList: state.shoppingList,
    auth: state.firebase.auth,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    showMenu: (toggleClass) => dispatch(menuActions(toggleClass)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingList);
