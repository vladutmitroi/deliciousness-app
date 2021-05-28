import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { menuActions } from "../../store/actions/menuActions";
import SignedInLinks from "../navbar-links/SignedInLinks";
import { SignedOutLinks } from "../navbar-links/SignedOutLinks";

const Navbar = (props) => {
  const { auth, profile } = props;

  const toggleActive = () => {
    props.showMenu(false);
  };

  return (
    <nav className="nav-wrapper">
      <div className="container pos-rel">
        <Link onClick={toggleActive} to="/" className="logo">
          delici<span className="far fa-lemon"></span>usness
        </Link>
        {auth.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks />}
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showMenu: (toggleClass) => dispatch(menuActions(toggleClass)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
