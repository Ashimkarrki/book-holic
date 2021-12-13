import React from "react";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <button>
        <h4>Log on</h4>
      </button>
      <button>
        <h4>Sign up</h4>
      </button>
      <button>
        <h4>Log out</h4>
      </button>

      <h4>
        <Link to="/library">Library</Link>
      </h4>
      <h4>
        <Link to="/bookstatus">Book Status</Link>
      </h4>
      <h4>Commented</h4>
      <h4>
        <Link to="/rated">Rated</Link>
      </h4>
    </div>
  );
};

export default Sidebar;
