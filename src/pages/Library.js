import React from "react";
import LibraryList from "../component/LibraryList";
import { useGlobalContext } from "../reducer and context/context";

const Library = () => {
  const { userInfo } = useGlobalContext();
  const { library } = userInfo;
  return (
    <div>
      <LibraryList library={library} whatIsInThere={"library"} />
    </div>
  );
};

export default Library;
