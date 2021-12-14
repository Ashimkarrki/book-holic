import React, { useEffect, useState } from "react";
import { initializeFirestore, collection } from "@firebase/firestore";
const CommentSection = ({ id }) => {
  const db = initializeFirestore();
  const colRef = collection(db, "users");
  

  useEffect(() => {}, []);
  return <div></div>;
};

export default CommentSection;
