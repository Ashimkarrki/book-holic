import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useGlobalContext } from "../reducer and context/context";
const OneBook = () => {
  // console.log("daata fetch vayo");
  const {
    bookName,
    setBookName,
    addToLibrary,
    userInfo,
    addRating,
    addBookStatus,
    addComment,
  } = useGlobalContext();

  const { id, bookname } = useParams();
  const [comment, setComment] = React.useState("");
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

  const [loading, setLoading] = React.useState(true);
  const [biggerData, setBiggerData] = React.useState({});
  const { searchBookInfo, searchLoading, pushToFirebase } = useGlobalContext();
  var smallData = React.useRef();
  var url = React.useRef();
  smallData.current = searchBookInfo.books?.filter((s) => {
    return s.id === id;
  });
  url.current = smallData.current?.map((s) => {
    return s.selfLink;
  })[0];
  const fetchOne = async () => {
    console.log("vitra xa");
    const response = await fetch(url.current);

    console.log(typeof response);
    const convert = await response.json();
    setBiggerData({
      ...smallData.current[0],
      totalPage: convert.volumeInfo.pageCount,
      rating: convert.volumeInfo.averageRating,

      language: convert.volumeInfo.language,
      publisher: convert.volumeInfo.publisher,
    });

    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    setBookName(bookname);
    fetchOne();
    console.log("effect");
  }, [url.current]);
  if (loading || searchLoading) {
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
        <form
          onSubmit={() => {
            addComment(biggerData.id, comment);
            setComment("");
          }}
        >
          <textarea
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            rows="4"
            cols="50"
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};
export default OneBook;
