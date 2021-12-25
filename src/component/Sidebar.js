import React from "react";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <h4>
        <Link to="/library">Library</Link>
      </h4>
      <h4>
        <Link to="/bookstatus">Book Status</Link>
      </h4>

      <h4>
        <Link to="/rated">Rated</Link>
      </h4>
    </div>
  );
};

export default Sidebar;
