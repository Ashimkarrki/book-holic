import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const LibraryList = ({ library, whatIsInThere, reqData }) => {
  const [data, setData] = useState([]);
  var temp1 = reqData;
  const doFilter = (id) => {
    var needed;
    var some;
    if (whatIsInThere === "BookStatus") {
      const temp = reqData.map((s) => {
        if (s.bookId === id) {
          needed = s.status;
        }
        return;
      });
    } else if (whatIsInThere === "rating") {
      const temp = reqData.map((s) => {
        if (s.bookId === id) {
          needed = s.rating;
        }
        return;
      });
    }
    return needed;
  };
  const fetchById = async (ids) => {
    const responses = await Promise.all(
      ids.map((s) => {
        return fetch(
          `https://www.googleapis.com/books/v1/volumes/${s}?key=${process.env.REACT_APP_BOOK_API}`
        );
      })
    );

    const convert = await Promise.all(
      responses.map((s) => {
        return s.json();
      })
    );
    const newHai = convert.map((s) => {
      if (!s.volumeInfo.imageLinks) {
        var img =
          "https://img.whaleshares.io/wls-img/einstei1/d765e65f432e7e6f0d062616d19364ecdc5631da.png";
      } else {
        img = s.volumeInfo.imageLinks.thumbnail;
      }
      var isbn;
      if (s.volumeInfo.industryIdentifiers[1]?.identifier)
        isbn = s.volumeInfo.industryIdentifiers[1].identifier;
      else isbn = null;
      return {
        id: s.id,
        selfLink: s.selfLink,
        title: s.volumeInfo.title,
        author: s.volumeInfo.authors,
        published: s.volumeInfo.publishedDate,
        isbn,
        img: img,
      };
    });
    setData(newHai);
  };
  useEffect(() => {
    fetchById(library);
  }, [JSON.stringify(library)]);
  return (
    <div className="booklist">
      <div className="map">
        {data.map((s, index) => {
          return (
            <Link key={index} to={`/onebook2/${s.isbn}`}>
              <div className="individual">
                <img src={s.img} />
                <div className="something">
                  <h4>{s.title}</h4>
                  <h5>By {s.author}</h5>
                  <h6>{s.published}</h6>
                  {whatIsInThere === "rating" && (
                    <h5>Rated : {doFilter(s.id)}</h5>
                  )}
                  {whatIsInThere === "BookStatus" && (
                    <h5>Status : {doFilter(s.id)}</h5>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default LibraryList;
