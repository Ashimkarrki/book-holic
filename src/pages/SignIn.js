import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { collection, getFirestore, doc, setDoc } from "firebase/firestore";
import { useGlobalContext } from "../reducer and context/context";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
const SignIn = () => {
  const location = useLocation();
  const db = getFirestore();
  var isInvalid;
  const navigate = useNavigate();
  const { createUser, userInfo } = useGlobalContext();
  const [data, setData] = useState({
    email: "",
    password: "",
    userName: "",
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
          createUser(data.email, data.password)
            .then((user) => {
              console.log(user.user.uid);
              const colRef = collection(db, "user");
              setDoc(doc(colRef, user.user.uid), {
                ...userInfo,
                userName: data.userName,
              });
            })
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
                userName: "",
              });
              if (isInvalid) {
                navigate({
                  pathname: "/signin",
                });
              } else {
                toast.success("welcome", {
                  position: toast.POSITION.BOTTOM_LEFT,
                  theme: "dark",
                });
                navigate({
                  pathname: location.state?.from?.pathname
                    ? location.state.from.pathname
                    : "/",
                });
              }
            });
        }}
      >
        <h3> SIGN IN</h3>{" "}
        <input
          value={data.email}
          required
          placeholder="Email"
          type="email"
          name="email"
          onChange={(e) => {
            changing(e);
          }}
        />
        <input
          value={data.password}
          required
          placeholder="Password"
          type="password"
          name="password"
          onChange={(e) => {
            changing(e);
          }}
        />
        <input
          value={data.userName}
          required
          type="text"
          name="userName"
          placeholder="User-Name"
          onChange={(e) => {
            changing(e);
          }}
        />
        <button value="submit">SUBMIT</button>
      </form>
    </div>
  );
};

export default SignIn;
