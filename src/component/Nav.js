import React from "react";
import { useGlobalContext } from "../reducer and context/context";
import { Link } from "react-router-dom";
const Nav = () => {
  const { openSidebar, toggleSidebar } = useGlobalContext();

  return (
    <div className="nav">
      <Link to="/">Book-holic</Link>
      <button onClick={toggleSidebar}>menu</button>
      <Link to="/login">
        <button>Login</button>
      </Link>
      <Link to="/signin">
        <button>signin</button>
      </Link>
      <Link to="/logout">
        <button>log out</button>
      </Link>
    </div>
  );
};

export default Nav;
