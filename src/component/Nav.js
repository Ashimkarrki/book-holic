import React from "react";
import { useGlobalContext } from "../reducer and context/context";
import { Link, useLocation } from "react-router-dom";
const Nav = () => {
  const { openSidebar, toggleSidebar, user } = useGlobalContext();
  const x = useLocation();
  // console.log(x);
  return (
    <div className="nav">
      <Link className="book-holic" to="/">
        Book-holic
      </Link>
      <div className="left">
        {user && (
          <button className="jhur" onClick={toggleSidebar}>
            menu
          </button>
        )}
        {!user && (
          <button>
            <Link className="jhur" to="/login">
              Login
            </Link>
          </button>
        )}

        {!user && (
          <button>
            <Link className="jhur" to="/signin">
              signin
            </Link>
          </button>
        )}
        <button>
          {user && (
            <Link className="jhur" to="/logout">
              log out
            </Link>
          )}
        </button>
      </div>
    </div>
  );
};

export default Nav;
