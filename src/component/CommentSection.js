import React, { useEffect, useState } from "react";
import {
  collection,
  getDoc,
  doc,
  getFirestore,
} from "@firebase/firestore";
const CommentSection = ({ id }) => {
  const [data, setData] = useState([]);
  const db = getFirestore();
  const colRef = collection(db, "comments");
  const fetch = async () => {
    const document = await getDoc(doc(colRef, id));
    if (document.exists()) {
      setData(document.data().commentField);
    }
  };
  useEffect(() => {
    if (id) {
      fetch(id);
    }
  }, [id]);
  return (
    <div>
      {data.map((s) => {
        const { userName, comment } = s;
        return (
          <div className="sub">
            <h2>{comment}</h2>
            <h4>-by {userName}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default CommentSection;
