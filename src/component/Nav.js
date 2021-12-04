import React from "react";
import { useGlobalContext } from "../reducer and context/context";
import { Link } from "react-router-dom";
const Nav = () => {
  const { openSidebar, toggleSidebar } = useGlobalContext();

  return (
    <div className="nav">
      <Link to="/">Book-holic</Link>
      <button onClick={toggleSidebar}>menu</button>
    </div>
  );
};

export default Nav;
