import React from "react";

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

      <h4> Library</h4>
      <h4>Book Status</h4>
      <h4>Commented</h4>
      <h4>Rated</h4>
    </div>
  );
};

export default Sidebar;
