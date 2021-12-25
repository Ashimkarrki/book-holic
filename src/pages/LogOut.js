import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useGlobalContext } from "../reducer and context/context";
import { ToastContainer, toast } from "react-toastify";

const LogOut = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logOut } = useGlobalContext();

  return (
    <div className="logout">
      <button
        className="okies"
        onClick={() => {
          logOut();
          toast.success("bye", {
            position: toast.POSITION.BOTTOM_LEFT,
            theme: "dark",
          });
          navigate({
            pathname: location.state?.from?.pathname
              ? location.state.from.pathname
              : "/",
          });
        }}
      >
        Log out
      </button>
    </div>
  );
};

export default LogOut;
