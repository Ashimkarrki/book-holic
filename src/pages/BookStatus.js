import React from "react";
import LibraryList from "../component/LibraryList";
import { useGlobalContext } from "../reducer and context/context";

const BookStatus = () => {
  const { userInfo } = useGlobalContext();
  const { bookStatus } = userInfo;
  const rating = bookStatus.map((s) => {
    return s.bookId;
  });
  return (
    <div>
      <LibraryList
        library={rating}
        reqData={bookStatus}
        whatIsInThere={"BookStatus"}
      />
    </div>
  );
};

export default BookStatus;
