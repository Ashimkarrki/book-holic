import React from "react";
import LibraryList from "../component/LibraryList";
import { useGlobalContext } from "../reducer and context/context";

const Rated = () => {
  const { userInfo } = useGlobalContext();
  const { rated } = userInfo;
  const rating = rated.map((s) => {
    return s.bookId;
  });
  return (
    <div>
      <LibraryList library={rating} reqData={rated} whatIsInThere={"rating"} />
    </div>
  );
};

export default Rated;
