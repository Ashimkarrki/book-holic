import React from "react";
import { useGlobalContext } from "../reducer and context/context";
const BookList = () => {
  const { searchLoading } = useGlobalContext();
  const { searchBookInfo } = useGlobalContext();
  if (searchLoading) {
    return <div className="booklist">nothing</div>;
  } else {
    return (
      <div className="booklist">
        {/* {console.log(searchBookInfo)} */}
        hy
        <h4>{searchBookInfo.totalItem}</h4>
        {searchBookInfo.items.map((s) => {
          return (
            <div>
              {s.title}
              {s.author}
              {s.published}
              {s.published}
            </div>
          );
        })}
      </div>
    );
  }
};

export default BookList;
