import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../reducer and context/context";
const LogOut = () => {
  const navigate = useNavigate();
  const { logOut } = useGlobalContext();

  return (
    <div>
      <h1>Log out</h1>
      <button onClick={logOut}>Log out</button>
    </div>
  );
};

export default LogOut;
