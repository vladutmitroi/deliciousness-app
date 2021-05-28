import React from "react";
import { NavLink } from "react-router-dom";

export const SignedOutLinks = () => {
  return (
    <ul className="right signed-out">
      <li>
        <NavLink to="/login">Login</NavLink>
      </li>
      <li>
        <NavLink to="/sign-up">Sign Up</NavLink>
      </li>
    </ul>
  );
};
