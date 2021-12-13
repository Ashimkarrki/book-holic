import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getFirestore, doc, setDoc } from "firebase/firestore";
import { useGlobalContext } from "../reducer and context/context";
const SignIn = () => {
  const db = getFirestore();
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
    <div>
      <h1>Sign In</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          createUser(data.email, data.password)
            .then((user) => {
              console.log(user.user.uid);
              const colRef = collection(db, "user");
              console.log(userInfo);
              setDoc(doc(colRef, user.user.uid), {
                ...userInfo,
                userName: data.userName,
              });
            })
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
        userName:
        <input
          type="text"
          name="userName"
          onChange={(e) => {
            changing(e);
          }}
        />
        <button value="submit">submit</button>
      </form>
    </div>
  );
};

export default SignIn;
