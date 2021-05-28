import React from "react";
import { connect } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { signOut } from "../../store/actions/authActions";
import { menuActions } from "../../store/actions/menuActions";
import { resetNotificationIcon } from "../../store/actions/shoppingListActions";

const SignedInLinks = (props) => {
  const {
    signOut,
    menu: { showMenu },
    shoppingList: { notifIcon, recipes },
    resetIcon,
  } = props;

  const toggleActive = (toggleClass) => {
    props.showMenu(toggleClass);
  };

  const resetNotification = () => {
    resetIcon();
  };

  const toggleActiveMobile = () => {
    toggleActive(!showMenu);
    resetIcon();
  };

  return (
    <React.Fragment>
      <ul className="right hide-on-med-and-down">
        <li>
          <NavLink to="/new-recipe">New recipe</NavLink>
        </li>
        <li>
          <NavLink to="/my-recipes">My recipes</NavLink>
        </li>
        <li>
          <NavLink onClick={signOut} to="/login">
            Logout
          </NavLink>
        </li>
        <li className="pos-rel">
          <NavLink
            className="btn btn-floating waves-effect waves-light shop-btn "
            to="/shopping-list"
            onClick={resetNotification}
          >
            <i className="fas fa-shopping-basket"></i>
          </NavLink>
          {notifIcon ? (
            <i className="fas notif-icon fa-circle">
              <span className="list-count">{recipes.length}</span>
            </i>
          ) : null}
        </li>
        <li className="pos-rel">
          <Link className="p-x-0 no-bg" to="/my-favorites">
            <span className="btn btn-floating waves-effect waves-light">
              {props.profile.initials}
            </span>
          </Link>
          <i className="favorites-menu-btn fas fa-heart"></i>
        </li>
      </ul>
      <button
        onClick={() => toggleActive(!showMenu)}
        className="right menu-trigger hide-on-large-only"
      >
        <i className={!showMenu ? "fas fa-bars" : "fas fa-times"}></i>
      </button>
      <ul
        className={
          showMenu
            ? "show-menu mobile-menu hide-on-large-only"
            : "mobile-menu hide-on-large-only"
        }
      >
        <li>
          <NavLink onClick={() => toggleActive(!showMenu)} to="/new-recipe">
            New recipe
          </NavLink>
        </li>
        <li>
          <NavLink onClick={() => toggleActive(!showMenu)} to="/my-recipes">
            My recipes
          </NavLink>
        </li>
        <li>
          <NavLink onClick={signOut} to="/login">
            Logout
          </NavLink>
        </li>
        <li className="shop-btn-container pos-rel">
          <NavLink
            onClick={toggleActiveMobile}
            className="btn btn-floating waves-effect waves-light shop-btn"
            to="/shopping-list"
          >
            <i className="fas fa-shopping-basket"></i>
          </NavLink>
          {notifIcon ? (
            <i className="fas notif-icon fa-circle">
              <span className="list-count">{recipes.length}</span>
            </i>
          ) : null}
        </li>
        <li className="pos-rel shop-btn-container">
          <Link
            onClick={() => toggleActive(!showMenu)}
            className="p-x-0 no-bg"
            to="/my-favorites"
          >
            <span className="btn btn-floating waves-effect waves-light">
              {props.profile.initials}
            </span>
          </Link>
          <i className="favorites-menu-btn fas fa-heart"></i>
        </li>
      </ul>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    menu: state.menu,
    shoppingList: state.shoppingList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
    showMenu: (toggleClass) => dispatch(menuActions(toggleClass)),
    resetIcon: () => dispatch(resetNotificationIcon()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignedInLinks);
