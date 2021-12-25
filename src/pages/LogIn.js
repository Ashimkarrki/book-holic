import React, { useState } from "react";
import { useNavigate, Navigate, useLocation } from "react-router-dom";
import { useGlobalContext } from "../reducer and context/context";
import { ToastContainer, toast } from "react-toastify";

const LogIn = () => {
  const navigate = useNavigate();
  var isInvalid;

  const { logIn, user } = useGlobalContext();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const changing = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({
      ...data,
      [name]: value,
    });
  };
  return (
    <div className="form">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          logIn(data.email, data.password)
            .then((response) => console.log(response))
            .catch((err) => {
              isInvalid = true;
              console.log(err);
              toast.warn("invalid password or email", {
                position: toast.POSITION.BOTTOM_LEFT,
                theme: "dark",
              });
            })
            .finally(() => {
              setData({
                email: "",
                password: "",
              });
              if (isInvalid) {
                navigate({
                  pathname: "/login",
                });
              } else {
                toast.success("welcome", {
                  position: toast.POSITION.BOTTOM_LEFT,
                  theme: "dark",
                });
                navigate({ pathname: "/" });
              }
            });
        }}
      >
        <h3>LOG IN</h3>
        <input
          value={data.email}
          placeholder="Email"
          type="text"
          name="email"
          onChange={(e) => {
            changing(e);
          }}
        />
        <input
          value={data.password}
          placeholder="Password"
          type="password"
          name="password"
          onChange={(e) => {
            changing(e);
          }}
        />
        <button value="submit">SUBMIT</button>
      </form>
    </div>
  );
};

export default LogIn;
