import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../reducer and context/context";
const CommentPage = ({ data }) => {
  // const [bookId, setbookId] = useState(initialState)
  const { userInfo } = useGlobalContext();
  const { review } = userInfo;
  const [bookId, setBookId] = useState([]);
  useEffect(() => {
    if (review) {
      const temp = review.map((s) => {
        return s.bookId;
      });
      setBookId(temp);
    }
  }, [JSON.stringify(review)]);
  return <div></div>;
};

export default CommentPage;
