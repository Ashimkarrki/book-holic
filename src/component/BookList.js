import React from "react";
// import {ln}
import { Link } from "react-router-dom";
import { useGlobalContext } from "../reducer and context/context";
const BookList = () => {
  const { searchLoading } = useGlobalContext();
  const { searchBookInfo, bookName } = useGlobalContext();
  if (searchLoading) {
    return <div className="booklist">nothing</div>;
  } else {
    return (
      <div className="booklist">
        <h4>{searchBookInfo.totalItem}</h4>
        <div className="map">
          {searchBookInfo.books.map((s) => {
            return (
              <Link key={s.id} to={`/oneBook/${bookName}/${s.id}`}>
                <div className="individual">
                  <img src={s.img} />
                  <div className="something">
                    <h4>{s.title}</h4>
                    <h5>By {s.author}</h5>
                    <h6>{s.published}</h6>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
};

export default BookList;
