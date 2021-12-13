import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useGlobalContext } from "../reducer and context/context";
const OneBook2 = () => {
  // console.log("daata fetch vayo");
  const {
    bookName,
    setBookName,
    addToLibrary,
    userInfo,
    addRating,
    addBookStatus,
  } = useGlobalContext();
  const navigate = useNavigate();
  const { isbn } = useParams();

  const [loading, setLoading] = React.useState(true);
  const [biggerData, setBiggerData] = React.useState({});
  const { searchBookInfo, searchLoading, pushToFirebase } = useGlobalContext();

  const { id, bookname } = useParams();
  const options = {
    rating: ["none", 1, 2, 3, 4, 5],
    status: ["none", "read", "currently reading", "want to read"],
  };
  const isPresent = (any) => {
    var temp = [];
    if (any === "bookStatus") {
      temp = userInfo.bookStatus.map((s) => {
        return s.bookId;
      });
    } else if (any === "rated") {
      temp = userInfo.rated.map((s) => {
        return s.bookId;
      });
    }

    if (temp.includes(biggerData.id)) {
      const position = temp.indexOf(biggerData.id);
      return { bo: true, position };
    }
    return { bo: false };
  };

  const fetchOne = async () => {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=AIzaSyBGiwbvE0SI4x9H2X2DJMGL2sjQMn4M9NU`
    );

    const convert = await response.json();
    const s = convert.items[0];

    if (!s.volumeInfo.imageLinks) {
      var img =
        "https://img.whaleshares.io/wls-img/einstei1/d765e65f432e7e6f0d062616d19364ecdc5631da.png";
    } else {
      img = s.volumeInfo.imageLinks.thumbnail;
    }
    setBiggerData({
      id: s.id,
      title: s.volumeInfo.title,
      author: s.volumeInfo.authors,
      published: s.volumeInfo.publishedDate,
      img,
      totalPage: s.volumeInfo.pageCount,
      rating: s.volumeInfo.averageRating,

      language: s.volumeInfo.language,
      publisher: s.volumeInfo.publisher,
      // isbn: convert.industryIdentifiers.
    });

    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchOne();
  }, []);
  if (loading) {
    return <h1>Loading</h1>;
  }

  return (
    <div className="onebook">
      <img src={biggerData?.img} />
      <h3>{biggerData.title}!</h3>
      <h3>
        Description: <p>{biggerData.desc}</p>{" "}
      </h3>
      <h4> Total page:{biggerData.totalPage}</h4>
      {/* {biggerData.id && console.log(biggerData)} */}
      {/* {console.log(biggerData.id : "happy")} */}
      <h4> Rating:{biggerData?.rating}</h4>
      <h4>Language:{biggerData.language}</h4>
      <h4>Publisher:{biggerData.publisher}</h4>
      <h4>Author:{biggerData.author}</h4>
      <h4>Published Date:{biggerData.published}</h4>
      <select
        name="status"
        onClick={(e) => {
          addBookStatus(biggerData.id, e.target.value).then((response) =>
            console.log("added hai")
          );
        }}
      >
        {(!userInfo.bookStatus || !isPresent("bookStatus").bo) && (
          <>
            {console.log("before")}

            {options.status.map((s, index) => {
              if (s === "none") {
                return (
                  <option key={index} selected value={s}>
                    select one
                  </option>
                );
              }
              return (
                <option key={index} value={s}>
                  {s}
                </option>
              );
            })}
          </>
        )}
        {userInfo.bookStatus && isPresent("bookStatus").bo && (
          <>
            {options.status.map((s, index) => {
              const where = isPresent("bookStatus").position;
              console.log(where);
              if (s === userInfo.bookStatus[where].status)
                return (
                  <option key={index} selected value={s}>
                    {s}
                  </option>
                );

              return (
                <option key={index} value={s}>
                  {s}
                </option>
              );
            })}
          </>
        )}
      </select>
      <button
        onClick={() => {
          addToLibrary(biggerData.id)
            .catch((err) => console.log(err))
            .finally(console.log("Library data updated"));
        }}
      >
        Add to library +
      </button>
      <select
        name="rating"
        onClick={(e) => {
          addRating(biggerData.id, e.target.value);
        }}
      >
        {(!userInfo.rated || !isPresent("rated").bo) && (
          <>
            {options.rating.map((s, index) => {
              if (s === "none") {
                return (
                  <option key={index} selected value={s}>
                    select one
                  </option>
                );
              }
              return (
                <option key={index} value={s}>
                  {s}
                </option>
              );
            })}
          </>
        )}
        {userInfo.rated && isPresent("rated").bo && (
          <>
            {options.rating.map((s, index) => {
              const where = isPresent("rated").position;
              if (s == userInfo.rated[where].rating)
                return (
                  <option key={index} selected value={s}>
                    {s}
                  </option>
                );

              return (
                <option key={index} value={s}>
                  {s}
                </option>
              );
            })}
          </>
        )}
      </select>
      <div className="reviewsection">
        <h2>Review</h2>
        <textarea rows="4" cols="50" />
        <button>Submit</button>
      </div>
    </div>
  );
};
export default OneBook2;
