import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../reducer and context/context";
const LogIn = () => {
  const navigate = useNavigate();
  const { logIn } = useGlobalContext();
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
    <div>
      <h1>Log In</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          logIn(data.email, data.password)
            .then((response) => console.log(response))
            .catch((err) => console.log(err))
            .finally(() => {
              navigate({ pathname: "/" });
            });
        }}
      >
        Email:
        <input
          type="text"
          name="email"
          onChange={(e) => {
            changing(e);
          }}
        />
        Password:
        <input
          type="password"
          name="password"
          onChange={(e) => {
            changing(e);
          }}
        />
        <button value="submit">submit</button>
      </form>
    </div>
  );
};

export default LogIn;
